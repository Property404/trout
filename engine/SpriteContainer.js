/* Abstract class representing anything that has a list of sprites*/
export class SpriteContainer
{
	_sprites = [];

	constructor()
	{}

	addSprite(sprite)
	{
		sprite.mother = this;
		this._sprites.unshift(sprite);
		return sprite;
	}

	clearSprites(sprite)
	{
		this._sprites.length = 0;
	}

	getAbsoluteX()
	{
		throw new Error("Unimplemented virtual function");
	}

	getAbsoluteY()
	{
		throw new Error("Unimplemented virtual function");
	}

	getSubsprites()
	{
		return this._sprites;
	}
}
