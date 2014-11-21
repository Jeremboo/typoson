var content = require('js/content');
var Letter = require('js/letter');
var Sound = require('js/sound');
var Spring = require('js/spring');

var origin, base, posLetter, sound;
var letters = [];
var springs = [];

/* modifiable params */
var aSound = content.sounds[0]; /* 0 à 7 */
var soundMultiple = false;


/* INIT */

var sound = new Sound(aSound);
init();


/* EVENTS */

window.onresize = function(){
	if (base)
		base.remove();
	init();
};

view.onFrame = function(event){
	loop();
};

document.addEventListener("keydown",onKeyDown);


/* FCT */

function init(){

	origin = (view.size.height/5)*4;
	posLetter = {
		x : 50,
		y : origin + 10
	};
	base = createPath(15, 0.1);
}


function onKeyDown(e){
	//TODO : faire une récupération du caractère dans une balise invisible ?
	var letter = String.fromCharCode(e.keyCode);
	var minLetter = letter.toLowerCase();
	var params = {
		keycode : e.keyCode,
		posX : 0,
		size : 0,
		unfrec : 0
	};
	
	if(params.keycode === 32){
		posLetter.x = getNewPosX(posLetter.x + 5);
	} else {
		//define params
		params.posX = getNewPosX(posLetter.x);
		params.size = getRandomSize();
		params.unfrec = getModifiedFrec(params.size);

		posLetter.x = params.posX;
		posLetter.y = origin + params.size/2;

		//Create LetterSound
		createLetterNote(params, new Letter(posLetter, minLetter), soundMultiple);
		
		//create choc
		var location = base.getNearestLocation(new Point(posLetter.x, posLetter.y));
		var segment = location.segment;
		var point = segment.point;

		if (!point.fixed && location.distance < view.size.height) {
			var y = origin;
			var choc = params.size/15 - (Math.abs(origin - point.y)/2);
			if(choc < 0)
				choc = 0;
			point.y += choc;
			/*Pour les segments entourant le choc, on abaisse leur 'y'
			aussi pour réduire l'impultion.*/
			if (segment.previous && !segment.previous.fixed) {
				var previous = segment.previous.point;
				previous.y += (y - previous.y) / 30;
			}
			if (segment.next && !segment.next.fixed) {
				var next = segment.next.point;
				next.y += (y - next.y) / 30;
			}
		}
	}
}


function loop(){
	//update letters
	for(var i=0 ; i<letters.length ; i++){
		if(letters[i].dist < 5){
			letters[i].letter.remove();
			letters.splice(i,1);
		} else {
			letters[i].update();
		}
	}

	updateWave(base);
}

function updateWave(path) {

	//Permet de mieux répercuter le choc sur un point unique par rapport à sa position precedente.
	//Vitesse du point en déceletation
	for (var i = 2, l = path.segments.length-2; i < l; i++) {
		var point = path.segments[i].point;
		var dy = (point.y - point.py) * content.waveValues.vel; //distance entre le point précédent et suivant
		point.py = point.y;
		point.y = Math.max(point.y + dy, 0);
	}

	//permet de faire des rebonds fluides entre les points.
	for (var j = 0, sl = springs.length; j < sl; j++) {
		springs[j].update();
	}

	path.smooth(); //permet d'avoir des courbes de béziers
}


function createPath(nbrPoints, strength) {

	var path = new Path();
	path.fillColor = content.color.black;
	//path.fullySelected = true;

	path.add(new Point(0,view.size.height));

	for (var i = 0; i <= nbrPoints; i++) {
		var segment = path.add(new Point((view.size.width/nbrPoints)*i, origin));
		var point = segment.point;
			
		//sauverage des position initiales des points. 
		point.px = point.x;
		point.py = point.y;

		//Si c'est le premier point ou le dernire point, 
		point.fixed = i === 0 || i === nbrPoints;
		//on ajouter la propriétée ressort
		if (i > 0) {
			var spring = new Spring(segment.previous.point, point, strength);
			springs.push(spring);
		}
	}

	path.add(new Point(view.size.width,view.size.height));

	return path;
}

function createLetterNote(params, letter, multiSound){

	if(multiSound){
		var k = params.keycode;
		if(k < 70){
			sound.load(content.sounds[1]);
		} else if(k < 75) {
			sound.load(content.sounds[2]);
		} else if(k < 80) {
			sound.load(content.sounds[3]);
		} else if(k < 85) {
			sound.load(content.sounds[4]);
		} else if(k < 91) {
			sound.load(content.sounds[5]);
		} else {
			sound.load(content.sounds[0]);
			sound.modifVolume(0.2);
		}
	}

	//start
	letter.modifStyle({size : params.size, color : content.color.black});
	letters.push(letter);
	sound.modifPlaybackRate(params.unfrec);
	sound.play();
}

function getNewPosX(posX) {
	var n = (Math.random() * 50) - 10;
	var newPosX = posX + n;
	if(newPosX > view.size.width ){
		newPosX = 50;
	} else if( newPosX < 0 ){
		newPosX = getNewPosX(posX);
	}
	return newPosX;
}

function getRandomSize(){
	var s = Math.random()*40 + 3;
	if(s > 39){
		s *= Math.random()*5;
	} else if(s < 10){
		s = 10;
	}
	return s;
}

function getModifiedFrec(param){
	var f = param/2;
	if(f > 40){
		f = 40 + f/10;
	}
	f = 5/f;
	return f;
}