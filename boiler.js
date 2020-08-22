"use strict";
const _config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade:{
			debug:true
		}
	},
	scene: FirstScene
};
const game = new Phaser.Game(_config);
