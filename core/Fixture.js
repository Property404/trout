"use strict";
/* Trout Core Wrapper around sprites/images */
class Fixture
{
	static _DEFAULT_FRICTION = 500;

	constructor(first_arg, second_arg)
	{
		if(second_arg)
			this._createGameObject(first_arg, second_arg)
		else
			this._obj = first_arg;
	}

	_createGameObject(data, adder)
	{
		const obj = adder(data.x, data.y, data.src);
		this._obj = obj;

		if(data.movable)
			obj.body.setDrag(Fixture._DEFAULT_FRICTION);

		if(data.scale)
			obj.setScale(data.scale);

		/* TODO: figure out rotation */

		if(obj.body)
			obj.refreshBody();
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
	}
}
