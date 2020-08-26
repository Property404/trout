"use strict";
const FRICTION = 1000;
class TroutScene extends Phaser.Scene
{
	fixtures = [];
	_player=null;
	_cursors=null;
	_sources = new Set();
	_stuck_movables = new Set();
	_interactions = [];
	_sprite_dict = {};

	constructor()
	{
		super();
		if(this.setup)this.setup();
	}

	_preloadFixtures()
	{
		for(const fixture of this.fixtures)
		{
			if(this._sources.has(fixture.src))
				continue;
			this._sources.add(fixture.src);
			this.load.image(fixture.src, fixture.src);
		}
	}

	_createFixtures()
	{
		const fixture_group = this.physics.add.staticGroup();
		const movables_group = this.physics.add.group();

		for(let i=0;i<this.fixtures.length;i++)
		{
			const fixture_data = this.fixtures[i];
			let sprite;

			// Collidables
			if(!fixture_data.passable)
			{
				const group = fixture_data.movable?movables_group:fixture_group;

				sprite = group.create(
					fixture_data.x,
					fixture_data.y,
					fixture_data.src);
			}
			else
			{
				// Passables
				sprite = this.add.image(
					fixture_data.x,
					fixture_data.y,
					fixture_data.src);
			}

			if(fixture_data.label)
			{
				this._sprite_dict[fixture_data.label] = sprite;
			}

			if(fixture_data.movable)
			{
				sprite.body.setDrag(FRICTION);
				sprite.body.immovable = true;
			}

			if(fixture_data.scale)
				sprite.setScale(fixture_data.scale);

			/* TODO: figure out rotation */
			//sprite.setOrigin(0,0);
			//updateFromGameObject
			
			if(!fixture_data.passable && !fixture_data.movable)
			{
				sprite.refreshBody();
			}
		}
		this.physics.add.collider(this._player, fixture_group);
		this.physics.add.collider(movables_group, undefined,
		(a,b)=>{
			for(const obj of [a,b])
			{
			obj.body.velocity.x=0;
			obj.body.velocity.y=0;
			obj.body.immovable=true;
			}
		})
		this.physics.add.collider(fixture_group, movables_group);
		this.physics.add.collider(this._player, movables_group,
			(player,obj)=>{
				obj.body.immovable = false;
				this._stuck_movables.add(obj);
			}
		);

	}

	addInteraction(label, action)
	{
		this._interactions.push({
			label:label,
			action:action});
	}

	preload()
	{
		this.load.setBaseURL('media');
		this.load.image('player', 'megaman.gif');
		this._cursors = this.input.keyboard.createCursorKeys();
		this._preloadFixtures();
	}

	create()
	{
		this._player = this.physics.add.sprite(0, 0, 'player');
		this.cameras.main.startFollow(this._player);
		this._createFixtures();

		// Set off interactions
		this.input.keyboard.on('keyup', e=>{
			if(e.keyCode === 13 || e.keyCode === 32)
			{
				for(const interaction of this._interactions)
				{
					const sprite = this._sprite_dict[interaction.label];
					const gap = 25;
					const xgap = gap + sprite.width/2 + this._player.width/2;
					const ygap = gap + sprite.height/2 + this._player.height/2;
					if (
						this._player.x > sprite.x - xgap &&
						this._player.x < sprite.x + xgap &&
						this._player.y > sprite.y - ygap &&
						this._player.y < sprite.y + ygap
					)
					{
						interaction.action();
						break;
					}
				}
			}
		});

		// If this is the first scene,
		// trout has finished loading
		trout.finishLoading();
	}

	update()
	{
		const SPEED = 200;

		if(this._cursors.left.isDown)
		{
			this._player.flipX = true;
			this._player.setVelocityX(-SPEED);
			this._player.setVelocityY(0);
		}
		else if(this._cursors.right.isDown)
		{
			this._player.flipX = false;
			this._player.setVelocityX(SPEED);
			this._player.setVelocityY(0);
		}
		else
		{
			this._player.setVelocityX(0);
			if(this._cursors.up.isDown)
				this._player.setVelocityY(-160);
			else if(this._cursors.down.isDown)
				this._player.setVelocityY(160);
			else
			{
				this._player.setVelocityY(0);
				for(const obj of this._stuck_movables)
				{
					if(obj.body.velocity.x == 0 && obj.body.velocity.y==0)
					{
						obj.body.immovable=true;
						this._stuck_movables.delete(obj);
					}
				}
			}
		}
	}

}