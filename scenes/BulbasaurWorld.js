"use strict";
class BulbasaurWorld extends TroutScene
{
	constructor()
	{
		super();
		this.fixtures = [
			{
				x:-30, y:+200,
				scale:2,
				src:"bulbasaur.png",
			},
			{
				x:20, y:-50,
				src:"bulbasaur.png",
			},
			{
				x:-200, y:+90,
				scale:3,
				src:"bulbasaur.png",
			},
			{
				x:200, y:-30,
				src:"bulbasaur.png",
			},
		];
	}
}
trout.addScene(BulbasaurWorld);
