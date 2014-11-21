paper.install(window);
paper.setup('myCanvas');

var color = {
	white : "#FAFAD4",
	black : "#050304",
};


var waveValues = {
	friction: 0.7,
	timeStep: 0.01,
	mass: 2,
	count: 0,
	waveForce : 2,
	vel : 0.987654
};
waveValues.invMass = 1 / waveValues.mass;

var sounds = [
	"sound/note2.mp3",
	"sound/violon.mp3",
	"sound/note.mp3",
	"sound/wine_glass.wav",
	"sound/bass1.mp3",
	"sound/kalimba.mp3",
	"sound/harp_23.mp3",
	"sound/harp_07.mp3"
];

module.exports = {
	color : color,
	waveValues : waveValues,
	sounds : sounds
};