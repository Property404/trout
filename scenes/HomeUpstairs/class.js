"use strict";

class HomeUpstairs extends RoomScene
{
	setup()
	{
		this.addInteraction("bed", ()=>
			trout.displayDialog(["It's too early to go to bed"])
		);

		// Cycle through books on the bookshelf
		this.addInteraction("bookshelf", ()=>{
			const books = [
				"The Secret Garden",
				"Peter Pan",
				"The BFG",
				"Gulliver's Travels",
				"A Wrinkle in Time",
				"The Little Prince",
				"The Magician's Nephew",
				"Alice's Adventures in Wonderland",
				"Bridge to Terabithia",
				"The Lion, the Witch, and the Wardrobe",
				"James and the Giant Peach",
				"The Wonderful Wizard of Oz",
				"Pippi Longstocking",
				"May Bird and the Ever After",
				"May Bird Among the Stars",
				"May Bird, Warrior Princess",
				"Coraline",
				"Alice Through the Looking Glass",
				"A Treatise of Human Nature",
			];
			this.current_book_index = this.current_book_index || 0;
			const book = books[this.current_book_index%books.length];
			this.current_book_index++;
				
			trout.displayDialog([book+"..."]);
		});

		// This will lead out to the next scene
		// But seeing as it's not created yet...
		// ...let's just go to Bulbasaur World
		this.addInteraction("door", ()=>
			trout.setPrimaryScene("BulbasaurWorld")
		);
	}
}

trout.registerScene(HomeUpstairs);
