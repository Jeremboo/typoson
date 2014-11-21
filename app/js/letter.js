'use strict';

function Letter(pos, l){
	this.letter = new PointText(new Point(pos.x,pos.y));
	this.destinationY = Math.random()*20;

	this.letter.justification = 'center';
	this.letter.opacity = 0.8;
	this.letter.content = l;
}

Letter.prototype.modifStyle = function(params){
	if(params.size)
		this.letter.fontSize = params.size;
	if(params.color)
		this.letter.fillColor = params.color;

	if(Math.random() > 0.5)
		this.letter.fontWeight = 'bold';
};

Letter.prototype.update = function(){

	var vector = this.destinationY - this.letter.position.y;
	this.letter.position.y += vector/100;
	var dist = Math.abs(vector);

	if( dist < 80 )
		this.letter.opacity = dist/100;
};


module.exports = Letter;