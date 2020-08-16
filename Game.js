import {SpriteContainer} from './SpriteContainer.js'

/* Actual (big)canvas resolution
 * Should be bigger than the fake(small)
 * canvas resolution, otherwise we get blurriness
 * */
const BIG_CANVAS_WIDTH = 600;
const BIG_CANVAS_HEIGHT = 600;

class CollisionPair
{
	constructor(sprite1, sprite2, callback, halo_callback)
	{
		this.sprite1= sprite1;
		this.sprite2= sprite2;
		this.callback = callback;
		this.halo_callback = halo_callback;
	}

	check(impotent=false)
	{
		let x1 = this.sprite1.getAbsoluteX();
		let x2 = this.sprite2.getAbsoluteX();

		let y1 = this.sprite1.getAbsoluteY();
		let y2 = this.sprite2.getAbsoluteY();

		let width1 = this.sprite1.width;
		let width2 = this.sprite2.width;

		let height1 = this.sprite1.height;
		let height2 = this.sprite2.height;

		/* Collision callbacks when sprites 1 and 2 collide */
		if((x1 >= x2 && x1<=x2+width2)||
			(x2 >= x1 && x2<=x1+width1))
		{
			if((y1 >= y2 && y1<=y2+height2)||
				(y2 >= y1 && y2<=y1+height1))
			{
				if(this.callback)
					this.callback(this.sprite1, this.sprite2);
			}
		}


		/* Halo callbacks are called when sprite1 hits sprite2's halo
		 * (its 1px border) */
		x2-=1;
		width2+=2;
		y2-=1;
		height2+=2;
		if((x1 >= x2 && x1<=x2+width2)||
			(x2 >= x1 && x2<=x1+width1))
		{
			if((y1 >= y2 && y1<=y2+height2)||
				(y2 >= y1 && y2<=y1+height1))
			{
				if(this.halo_callback)
					this.halo_callback(this.sprite1, this.sprite2);
			}
		}
	}
}

/*
 * Class meant to have a single instance 
 * Root for all sprites
 * Future: controls other game aspects
 * 	Like music, sounds, savedata, saving
 */
export class Game extends SpriteContainer
{
	_collision_pairs = [];
	constructor(div_id, width, height){
		super();
		this._html_root = document.getElementById(div_id);

		this._small_canvas = document.createElement("canvas");
		this._small_canvas.width = width;
		this._small_canvas.height = height;
		this._small_canvas.hidden = true;

		this._big_canvas = document.createElement("canvas");
		this._big_canvas.width = BIG_CANVAS_WIDTH;
		this._big_canvas.height = BIG_CANVAS_HEIGHT;

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

	registerCollisionPair(sprite1, sprite2, callback, halo_callback)
	{
		this._collision_pairs.push(
			new CollisionPair(
				sprite1,
				sprite2,
				callback,
				halo_callback)
		);
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

