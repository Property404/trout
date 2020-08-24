"use strict";
const FRICTION = 1000;
class TroutScene extends Phaser.Scene
{
	player=null;
	cursors=null;
	fixtures = [];
	_sources = new Set();
	_stuck_movables = new Set();
	_interactions = [];
	_sprite_dict = {};


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
		this.physics.add.collider(this.player, fixture_group);
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
		this.physics.add.collider(this.player, movables_group,
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
		this.cursors = this.input.keyboard.createCursorKeys();
		this._preloadFixtures();
		if(this.preloadScene)this.preloadScene()
	}

	create()
	{
		this.player = this.physics.add.sprite(0, 0, 'player');
		this.cameras.main.startFollow(this.player);
		this._createFixtures();
		if(this.createScene)this.createScene()

		// Set off interactions
		this.input.keyboard.on('keyup', e=>{
			if(e.keyCode === 13 || e.keyCode === 32)
			{
				for(const interaction of this._interactions)
				{
					const sprite = this._sprite_dict[interaction.label];
					const gap = 25;
					const xgap = gap + sprite.width/2 + this.player.width/2;
					const ygap = gap + sprite.height/2 + this.player.height/2;
					if (
						this.player.x > sprite.x - xgap &&
						this.player.x < sprite.x + xgap &&
						this.player.y > sprite.y - ygap &&
						this.player.y < sprite.y + ygap
					)
					{
						interaction.action();
						break;
					}
				}
			}
		});

	}

	update()
	{
		const SPEED = 200;

		if(this.cursors.left.isDown)
		{
			this.player.flipX = true;
			this.player.setVelocityX(-SPEED);
			this.player.setVelocityY(0);
		}
		else if(this.cursors.right.isDown)
		{
			this.player.flipX = false;
			this.player.setVelocityX(SPEED);
			this.player.setVelocityY(0);
		}
		else
		{
			this.player.setVelocityX(0);
			if(this.cursors.up.isDown)
				this.player.setVelocityY(-160);
			else if(this.cursors.down.isDown)
				this.player.setVelocityY(160);
			else
			{
				this.player.setVelocityY(0);
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


		if(this.updateScene)this.updateScene();
	}

}
