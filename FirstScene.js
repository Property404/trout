"use strict";
class FirstScene extends TroutScene
{
	constructor()
	{
		super();
		this.fixtures = [
			{
				x:0, y:-200,
				src:"platform.png",
			},
			{
				x:200, y:100,
				angle:20,
				scale:2,
				src:"platform.png",
			},
			{
				x:20, y:+30,
				movable:true,
				//angle:20,
				//scale:2,
				src:"star.png",
			},
			{
				x:20, y:-30,
				movable:true,
				//angle:20,
				//scale:4,
				src:"star.png",
			},
			{
				x:200, y:-30,
				movable:true,
				//angle:20,
				//scale:4,
				src:"star.png",
			},
		];
	}
}
