"use strict";
const FRICTION = 9000000;
class TroutScene extends Phaser.Scene
{
	player=null;
	cursors=null;
	fixtures = [];
	_sources = new Set();

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
			const group = fixture_data.movable?movables_group:fixture_group;
			let sprite;

			// Collidables
			if(!fixture_data.passable)
				sprite = group.create(
					fixture_data.x,
					fixture_data.y,
					fixture_data.src);

			// Passables
			else
				sprite = this.add.image(
					fixture_data.x,
					fixture_data.y,
					fixture_data.src);

			sprite.setOrigin(0,0);

			if(fixture_data.movable)
			{
				// Movables just have very high friction
				sprite.body.setDrag(FRICTION,FRICTION);
			}

			if(fixture_data.scale)
				sprite.setScale(fixture_data.scale);

			/* TODO: figure out rotation */
			
			if(!fixture_data.passable && !fixture_data.movable)
			{
				console.log("OH YEAH");
				sprite.refreshBody();
			}
		}

		// TODO:
		// There's an issue with multiple movables might pass through
		// a non-passable fixture
		//
		// Possible work around: don't allow movables to move
		// another movable, somehow
		this.physics.add.collider(this.player, fixture_group);
		this.physics.add.collider(this.player, movables_group);
		this.physics.add.collider(movables_group, fixture_group);
		this.physics.add.collider(movables_group, movables_group);
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

		if(this.updateScene)this.updateScene();
	}

}
