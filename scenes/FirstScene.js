"use strict";
/* Trout example scene */
class FirstScene extends TroutScene
{
	// All the things that belong in the scene go here
	fixtures = [
		{
			src:"platform.png",
			x:0, y:-200,
		},
		{
			src:"platform.png",
			x:200, y:100,

			// Scale changes the size
			scale:2,
		},
		{
			src:"star.png",
			x:20, y:-30,

			//movable means it can be moved by the player
			movable:true, 
		},
		{
			src:"star.png",
			x:200, y:-30,
			movable:true,
		},
		{
			// A label allows the fixture to be referenced in code
			label:"big_star",
			src:"star.png",
			x:-50, y:+20,
			scale:2,
		},
	];

	setup()
	{
		// Big star is a portal to Bulbasaur World
		this.addInteraction("big_star", ()=>{
			trout.setPrimaryScene("BulbasaurWorld");
		});
	}
}

trout.addScene(FirstScene);
