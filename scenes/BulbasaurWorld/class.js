"use strict";
/* Bulbasaur World - another Trout example scene
 * this time with more bulbasaurs! */

class BulbasaurWorld extends PlayerScene
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
			this.fixture_definitions.push(
				{
					src:"old/bulbasaur.png",
					x:xstart+i*step,
					y:ystart
				});

			// Left wall
			this.fixture_definitions.push(
				{
					src:"old/bulbasaur.png",
					x:xstart,
					y:ystart+i*step
				});

			// Right wall
			this.fixture_definitions.push(
				{
					src:"old/bulbasaur.png",
					x:xstart+length*step,
					y:ystart+i*step
				});

			// Lower wall
			this.fixture_definitions.push(
				{
					src:"old/bulbasaur.png",
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

	loop()
	{

		// Animate the Bulbasaur
		const bulba = this.getFixture("big_bulbasaur");
		if(bulba.y > 120 && bulba.x < 200)
			bulba.x+=10;
		else if (bulba.x >= 200 && bulba.y > -200)
			bulba.y-=10;
		else if(bulba.x > -200)
			bulba.x-=10;
		else if(bulba.y < 200)
			bulba.y+=10;
	}
}
trout.registerScene(BulbasaurWorld);
