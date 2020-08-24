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
				scale:2,
				src:"platform.png",
			},
			{
				label:"big_star",
				x:-50, y:+20,
				movable:true,
				scale:2,
				src:"star.png",
			},
			{
				x:20, y:-30,
				movable:true,
				src:"star.png",
			},
			{
				x:200, y:-30,
				movable:true,
				src:"star.png",
			},
		];

		this.addInteraction("big_star", ()=>alert("Woo hey wow hey!"));
	}
}
