"use strict";

class Home extends RoomScene
{
	setup()
	{
	}

	loop()
	{
		if(!this.not_first_time)
		{
			trout.displayDialog([
				"Welcome to Trout - Press enter to start",
				"Woops...I guess you have to press it again",
				"Ah geez, try it a third time",
				"One more time!"
			]);
			this.not_first_time = true;
		}
	}
}

trout.registerScene(Home);
