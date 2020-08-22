"use strict";
const FRICTION = 900;
class TroutScene extends Phaser.Scene
{
	player=null;
	cursors=null;
	fixtures = [];
	_sources = new Set();
	_stuck_movables = new Set();


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

			if(fixture_data.movable)
			{
				sprite.body.setDrag(FRICTION);
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

		// Disallow moving of movables when it hits a static group
		const stopIt = (a,b)=>{
			for(const obj of [a,b])
			{
				if(obj.body.physicsType != Phaser.Physics.Arcade.STATIC_BODY)
				{
					obj.body.immovable = true;
					this._stuck_movables.add(obj);
					if(obj === b)
					{
						if(obj.body.touching.down)
						{
							obj.y--;
							obj.body.y--;
						}
						if(obj.body.touching.up)
						{
							obj.y++;
							obj.body.y++;
						}
						if(obj.body.touching.right)
						{
							obj.x--;
							obj.body.x--;
						}
						if(obj.body.touching.left)
						{
							obj.x++;
							obj.body.x++;
						}
					}
				}
			}
		}

		this.physics.add.collider(movables_group, movables_group, stopIt)
		this.physics.add.collider(fixture_group, movables_group, stopIt);
		this.physics.add.collider(this.player, movables_group,
			(player,obj)=>{
			}
		);

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
	}

	update()
	{
		const SPEED = 200;

		if(this.cursors.left.isDown)
		{
			this.player.setVelocityX(-SPEED);
			this.player.setVelocityY(0);
		}
		else if(this.cursors.right.isDown)
		{
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
				this.player.setVelocityY(0);
		}


		for(const obj of this._stuck_movables)
		{
			if(obj.body.touching.none)
			{
				obj.body.immovable=false;
				this._stuck_movables.delete(obj);
			}
		}



		if(this.updateScene)this.updateScene();
	}

}
