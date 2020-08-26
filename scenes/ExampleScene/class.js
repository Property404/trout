"use strict";

/* Trout example scene */
class ExampleScene extends TroutScene
{
	setup()
	{
		// Big star is a portal to Bulbasaur World
		this.addInteraction("big_star", ()=>{
			console.log("Are you ready to go to Bulbasaur World, kids?!");
			console.log("Yeah you are!");
			console.log("\n");
			trout.setPrimaryScene("BulbasaurWorld");
		});
	}
}

trout.registerScene(ExampleScene);
