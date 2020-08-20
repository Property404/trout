import {SpriteContainer} from './SpriteContainer.js'

/*
 * Class meant to have a single instance 
 * Root for all sprites
 * Future: controls other game aspects
 * 	Like music, sounds, savedata, saving
 */
export class Game extends SpriteContainer
{
	_collision_pairs = [];
	constructor(div_id, width, height, detail=2){
		super();
		this._html_root = document.getElementById(div_id);

		this._small_canvas = document.createElement("canvas");
		this._small_canvas.width = width;
		this._small_canvas.height = height;
		this._small_canvas.hidden = true;

		this._big_canvas = document.createElement("canvas");
		this._big_canvas.width = width*detail;
		this._big_canvas.height = height*detail;

		this._html_root.appendChild(this._small_canvas);
		this._html_root.appendChild(this._big_canvas);

		this._small_context = this._small_canvas.getContext('2d');
		this._small_context.strokeStyle = "rgb(255,255,255)";
		this._small_context.fillStyle = "rgb(255,255,255)";

		this._big_context = this._big_canvas.getContext('2d');
		this._big_context.imageSmoothingEnabled = false;
	}

	/*
	 * Blow up the small-resolution
	 * canvas to the big-resolution canvas */
	_blowUp()
	{
		this._big_context.drawImage(
			this._small_canvas,
			0, 0, this._small_canvas.width, this._small_canvas.height,
			0, 0, this._big_canvas.width, this._big_canvas.height
		);
	}

	/*
	 * Draw everything
	 */
	render()
	{
		this._small_context.clearRect(0,0,
			this._small_canvas.width, this._small_canvas.height);
		this._big_context.clearRect(0,0,
			this._big_canvas.width, this._big_canvas.height);
		for(const sprite of this._sprites)
		{
			sprite.draw(
				this._small_context,
				this._small_canvas.width,
				this._small_canvas.height
			);
		}
		this._blowUp();
	}

	getAbsoluteX()
	{
		return 0;
	}

	getAbsoluteY()
	{
		return 0;
	}

	registerCollisionPair(cp)
	{
		this._collision_pairs.push(cp);
	}

	checkCollisionPairs()
	{
		for(const cp of this._collision_pairs)
		{
			cp.check();
		}
	}

	clearCollisionPairs()
	{
		this._collision_pairs.length = 0;
	}
}

