'use_strict';

var content = require('js/content');

var Spring = function(a, b, strength, restLength) {
	this.a = a;
	this.b = b;
	this.restLength = restLength || 50;
	this.strength = strength ? strength : 0.55;
	this.mamb = content.waveValues.invMass * content.waveValues.invMass;
};

Spring.prototype.update = function() {

	var delta = {
		x : this.b.x - this.a.x,
		y : this.b.y - this.a.y
	};
	var dist = Math.sqrt( Math.pow(delta.x,2) + Math.pow(delta.y,2));
	var normDistStrength = (dist - this.restLength) / (dist * this.mamb) * this.strength;

	delta.y *= normDistStrength * content.waveValues.invMass * 0.2;
	if (!this.a.fixed)
		this.a.y += delta.y;
	if (!this.b.fixed)
		this.b.y -= delta.y;
};

module.exports = Spring;