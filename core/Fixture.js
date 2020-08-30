"use strict";
/* Trout Core Wrapper around sprites/images */
class Fixture
{
	static _DEFAULT_FRICTION = 500;
	static _GROUND_DEPTH = -500000;
	_static_depth = null;
	

	constructor(first_arg, context=null, groups=null)
	{
		this._context = context;
		this._obj = groups?
			// Create object out of data
			this._createGameObject(first_arg, groups):
			// Otherwise, form wrapper around existing object
			first_arg;

		this._setDepth();
	}

	_createGround(data, groups)
	{
		if(!data.width || !data.height)
		{
			throw new Error("Fixture definition of type 'ground' needs width and height properties");
		}
		const scale = data.scale || 1;
		const width = data.width/scale;
		const height = data.height/scale;
		const obj = this._context.add.tileSprite(data.x,data.y,width, height,data.src);
		this._static_depth = Fixture._GROUND_DEPTH;
		return obj;
	}

	_createPassable(data, groups)
	{
		const obj = this._context.add.image(data.x, data.y, data.src);
		return obj;
	}

	_createMovable(data, groups)
	{
		const obj = groups.movables_group.create(data.x,data.y,data.src);
		obj.body.setDrag(Fixture._DEFAULT_FRICTION);
		return obj;
	}

	_createStationary(data, groups)
	{
		const obj = groups.stationary_group.create(data.x,data.y,data.src);
		return obj;
	}

	_setDepth()
	{
		this._obj.depth = this._static_depth || this._obj.y;
	}

	_createGameObject(data, groups)
	{
		let obj;
		switch(data.type)
		{
			case "ground":
				obj=this._createGround(data, groups);break;
			case "passable":
				obj=this._createPassable(data, groups);break;
			case "movable":
				obj=this._createMovable(data, groups);break;
			case null: case undefined:
			case "stationary":
				obj=this._createStationary(data, groups);break;
			default:
				throw new Error(`No such fixture type ${data.type}`);
		}
			
		if(data.scale)
		{
			if(data.scalex || data.scaley)
				throw new Error("Fixture definition cannot have 'scale' and 'scalex'/'scaley' properties");
			obj.setScale(data.scale)
		}
		if(data.scalex || data.scaley)
		{
			obj.setScale(data.scalex||1, data.scaley||1);
		}
		if(obj.body)obj.refreshBody();

		/* TODO: figure out rotation */

		if(data.elevation)
		{
			if(!obj.body)
				throw new Error(`Property 'elevation' does not apply to Fixture of type '${data.type}`);
			if(data.elevation<0 || data.elevation>1)
			{
				throw new Error("Fixture property 'elevation' must be between 0 and 1, inclusive");
			}
			obj.body.height*=(1-data.elevation);
			obj.body.setOffset(0,obj.displayHeight-obj.body.height);
			console.log("ELEVATE");
		}

		return obj;
	}

	getPhaserObject()
	{
		return this._obj;
	}

	get x()
	{
		return this._obj.x;
	}

	set x(val)
	{
		if(this._obj.body)
			this._obj.body.x=val;
		this._obj.x=val;
	}

	get y()
	{
		return this._obj.y;
	}

	set y(val)
	{
		if(this._obj.body)
			this._obj.body.y=val;
		this._obj.y=val;
		this._setDepth();
	}
}
