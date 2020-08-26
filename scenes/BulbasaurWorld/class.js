"use strict";
/* Bulbasaur World - another Trout example scene
 * this time with more bulbasaurs! */

class BulbasaurWorld extends TroutScene
{
	setup(){

		// Create bulbasaur wall
		const step = 60;
		const length = 10;
		const xstart = -300;
		const ystart = -300;
		for(let i=0;i<length;i++)
		{
			// Upper wall
			this.fixtures.push(
				{
					src:"bulbasaur.png",
					x:xstart+i*step,
					y:ystart
				});

			// Left wall
			this.fixtures.push(
				{
					src:"bulbasaur.png",
					x:xstart,
					y:ystart+i*step
				});

			// Right wall
			this.fixtures.push(
				{
					src:"bulbasaur.png",
					x:xstart+length*step,
					y:ystart+i*step
				});

			// Lower wall
			this.fixtures.push(
				{
					src:"bulbasaur.png",
					x:xstart+i*step,
					y:ystart+(length-1)*step
				});
		}

		// Big Bulbasaur is portal out of bulbasaur world
		this.addInteraction("big_bulbasaur", ()=>{
			console.log("Leaving bulbasaur world :(");
			console.log("\n");
			trout.setPrimaryScene("ExampleScene");
		});
	}
}
trout.registerScene(BulbasaurWorld);
