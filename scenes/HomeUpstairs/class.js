"use strict";

class HomeUpstairs extends RoomScene
{
	setup()
	{
		this.addInteraction("bed", ()=>
			trout.displayDialog(["It's too early to go to bed"])
		);

		// Look at random book when interacting with the bookshelf
		this.addInteraction("bookshelf", ()=>{
			const books = [
				"Alice and Wonderland",
				"Coraline",
				"May Bird and the Ever After",
				"Through the Looking Glass",
				"The Magician's Nephew",
				"The Lion, the Witch, and the Wardrobe"
			];
			const book = books[Math.floor(Math.random()*books.length)];
				
			trout.displayDialog([book+"...", "...already read it"]);
		});

		// This will lead out to the next scene
		// But seeing as it's not created yet...
		this.addInteraction("door", ()=>
			alert("Next scene not implemented")
		);
	}
}

trout.registerScene(HomeUpstairs);
