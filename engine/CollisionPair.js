export class CollisionPair
{
	recursive = false;
	constructor(sprite1, sprite2, callback, halo_callback)
	{
		this.sprite1 = sprite1;
		this.sprite2 = sprite2;
		this.callback = callback;
		this.halo_callback = halo_callback;
	}

	_check(
		x1, y1, width1, height1,
		x2, y2, width2, height2
	)
	{
		if(x1===null || x2===null || y1 === null || y2===null
			|| width1===null||width2===null||height1===null
			||height2===null
		)
			throw "shitbucckets";
		if(x1===undefined || x2===undefined || y1 === undefined || y2===undefined
			|| width1===undefined||width2===undefined||height1===undefined
			||height2===undefined
		)
			throw "shitbucckets";

		/*
		console.log("sp1:", x1, y1, width1, height1);
		console.log("sp2:", x2, y2, width2, height2);
		*/

		if((x1 >= x2 && x1<=x2+width2)||
			(x2 >= x1 && x2<=x1+width1))
		{
			if((y1 >= y2 && y1<=y2+height2)||
				(y2 >= y1 && y2<=y1+height1))
			{
				return true;
			}
		}
		return false;
	}

	_checkAgainstSprite(x1, y1, width1, height1, sprite)
	{
		const x2 = sprite.getAbsoluteX();
		const y2 = sprite.getAbsoluteY();
		const width2 = sprite.width;
		const height2 = sprite.height;
		return this._check(x1,y1,width1,height1,
			x2,y2,width2,height2);
	}

	check()
	{
		const x1 = this.sprite1.getAbsoluteX();
		const y1 = this.sprite1.getAbsoluteY();
		const width1 = this.sprite1.width;
		const height1 = this.sprite1.height;

		// First check halo
		if(
			this.halo_callback &&
			this._checkAgainstSprite(
				x1-1,
				y1-1,
				width1+2,
				height1+2,
				this.sprite2
			)
		)
		{
			console.log("Exec halo_callback");
			this.halo_callback(this.sprite1,this.sprite2);
		}

		if(!this.callback)return;

		// Check sprite an all subsprites down the tree
		const sprite_stack = [this.sprite2];

		while(sprite_stack.length)
		{
			const sprite = sprite_stack.pop();
			if(
				this._checkAgainstSprite(
					x1, y1, width1, height1, sprite
				)
			)
			{
				console.log("Exec callback");
				this.callback(this.sprite1,sprite);
				return;
			}

			sprite_stack.push(...sprite.getSubsprites());
		}

	}

	/*
	check()
	{
		let x1 = this.sprite1.getAbsoluteX();
		let x2 = this.sprite2.getAbsoluteX();

		let y1 = this.sprite1.getAbsoluteY();
		let y2 = this.sprite2.getAbsoluteY();

		let width1 = this.sprite1.width;
		let width2 = this.sprite2.width;

		let height1 = this.sprite1.height;
		let height2 = this.sprite2.height;

		// Collision callbacks when sprites 1 and 2 collide 
		if(this.callback &&
			this._check(x1,y1,width1,height1,
				x2,y2,width2,height2)
		)
		{
			this.callback(this.sprite1, this.sprite2);
		}



	 	//Halo callbacks are called when sprite1 hits sprite2's halo
		//(its 1px border)
		x2-=1;
		width2+=2;
		y2-=1;
		height2+=2;
		if(this.halo_callback &&
			this._check(x1,y1,width1,height1,
				x2,y2,width2,height2)
		)
		{
			this.halo_callback(this.sprite1, this.sprite2);
		}
	}
	*/
}
