'use strict';


function Sound(url){
    try {
        window.AudioContet = window.AudioContext || window.webkitAudioContext;
    } catch(e) {
        alert("Web Audio API is not supported in this browser");
    }
    
    this.context = new AudioContext();
    this.convolver = this.context.createConvolver();
    this.playbackRate = 1;
    this.volume = 1;
    this.soundParam = {
        url : "",
        buffer : null
    };

    if(url){
        this.load(url);
    }
}

Sound.prototype.play = function(url){
    var that = this;
    //S'il y a une url et pas de son chargé
    if(url !== "" && this.soundParam.url !== url){
        this.load(url,function(err){
            if(err !== ""){
                that.playSound();
            }
        });
    } else if(this.soundParam.buffer !== null){
        this.playSound();
        //TODO : prévoir un callback pour la fin du son.
    } else {
        console.log("No sound Loaded");
    }
};

Sound.prototype.playWithReverbe = function(buffer){
    this.playSound(buffer);
};

Sound.prototype.load = function(url, callback) {
    var that = this;
    if(url !== ""){
        this.soundParam.url = url;
        this.bufferLoader(url,function(err){
            if(callback){
                callback(err);
            }
        });
    } else {
        console.log("No url");
    }
};

Sound.prototype.modifPlaybackRate = function(newPlaybackRate){
    this.playbackRate = newPlaybackRate;
    //this.playbackRate = 1;
};

Sound.prototype.modifVolume = function(newVolume){
    this.volume = newVolume;
};

Sound.prototype.getUrl = function(){
    return this.soundParam.url;
};

Sound.prototype.getBuffer = function(){
    return this.soundParam.buffer;
};


/* private */
Sound.prototype.playSound = function(buffer){
    var bufferSource = this.context.createBufferSource();
    var gainNode = this.context.createGain();
    var convolver = this.context.createConvolver();

    bufferSource.buffer = this.soundParam.buffer;
    bufferSource.playbackRate.value = this.playbackRate;
    gainNode.gain.value = this.volume;

    //conexion
    if(buffer){
        bufferSource.connect(convolver);
        convolver.connect(gainNode);
        convolver.buffer = buffer;
    } else {
        bufferSource.connect(gainNode);
    }
    gainNode.connect(this.context.destination);

    //bufferSource.connect(this.context.destination);

    // start
    bufferSource.start(0);
};

Sound.prototype.bufferLoader = function(url,callback){

    var request = new XMLHttpRequest();
    var that = this;

    if(callback){
        request.open("GET", url, true);
        request.responseType = "arraybuffer";
        request.send();

        request.onload = function() {
            that.context.decodeAudioData(request.response, function(bfr){
                var err = "";
                if(!bfr) {
                    err = 'error decoding file data :'+url;
                } else {
                    that.soundParam.buffer = bfr;
                }
                callback(err);
            }, function(error){
                callback('decodeAudiData erre : '+error);
            });
        };

        request.onerror = function(){
            callback('BufferLoader : XHR error');
        };
    }
};

module.exports = Sound;