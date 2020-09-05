/**
 * Abstract Trout scene from which all other
 * scenes are eventually descended
 *
 * Inherits from Phaser.Scene
 */
class TroutScene extends Phaser.Scene
{
	constructor()
	{
		super();
		if(this.constructor === TroutScene)
			throw new Error("Can't instantiate abstract class");
	}
}
