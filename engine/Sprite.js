import {SpriteContainer} from './SpriteContainer.js'

export class Sprite extends SpriteContainer
{
	mother=null;

	constructor(image_url, x, y){
		super();
		this.x = x;
		this.y = y
		this._img = new Image();
		this._img.src = image_url;
	}

	draw(context, width, height)
	{
		context.drawImage(this._img,
			this.getAbsoluteX(),
			this.getAbsoluteY());
		for(const subsprite of this._sprites)
		{
			subsprite.draw(context, width, height);
		}
	}

	get width()
	{
		return this._img.width;
	}

	get height()
	{
		return this._img.height;
	}

	getAbsoluteX()
	{
		return this.x + this.mother.getAbsoluteX();
	}

	getAbsoluteY()
	{
		return this.y + this.mother.getAbsoluteY();
	}
}

