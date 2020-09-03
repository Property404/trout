"use strict";
/**
 * Represents a regular trout scene  
 * where the player can move around and crap
 *
 * This does not include UI/game over/etc scenes
 */
class PlayerScene extends TroutScene
{
	/**
	 * Fixtures are any objects that belong to the scene  
	 *
	 * Prefixtures are the descriptive objects used
	 * to create Fixtures
	 */
	prefixtures = [];
	_fixtures = {};

	_player=null;
	_player_fixture=null;

	// List of sprites by label
	_sprite_dict = {};

	// Input cursor
	_cursors=null;
	// Keep track of what assets we load
	_sources = new Set();
	// Used to get around physics engine limitation
	_stuck_movables = new Set();
	// Bound callbacks to particular prefixtures w/label
	// To be executed when user presses space or enter
	// or something like that near the fixture
	_interactions = [];

	_timer_done = true;
	_timer_interval = 10;

	constructor()
	{
		super();
		
		// preSetup is used internally to deal with added resources
		// like prefixtures and other nonsense
		if(this.preSetup())this.preSetup();

		// Setup is used by the top-level programmer
		if(this.setup)this.setup();

		// We process prefixtures in constructor so subclasses
		// can deal with fully processed prefixtures
		this._processPrefixtures();

		// Set timer
		setInterval(()=>this._timer_done=true, this._timer_interval);
	}

	_processPrefixtures()
	{
		const prototypes = {}

		for(const fixture_data of this.prefixtures)
		{
			// Simple inheritence system
			// Inherit from parent
			if(fixture_data.inherit)
			{
				const new_fixture_data = {};
				const parent_data = prototypes[fixture_data.inherit];
				if(!parent_data)
					throw new Error(`No such fixture definition to inherit from '${fixture_data.inherit}'`);
				for(const prop in parent_data)
				{
					if(["abstract", "label"].includes(prop))
						continue;
					new_fixture_data[prop] = parent_data[prop];
				}
				for(const prop in fixture_data)
				{
					new_fixture_data[prop] = fixture_data[prop];
				}
				for(const prop in new_fixture_data)
				{
					fixture_data[prop] = new_fixture_data[prop];
				}
			}

			// Any fixture definition with a label can be a prototype
			// Does not have to be abstract
			if(fixture_data.label)
			{
				const label = fixture_data.label;
				prototypes[label] = fixture_data;
			}
		}
	}

	_preloadFixtureSources()
	{
		for(const prefixture of this.prefixtures)
		{
			if(this._sources.has(prefixture.src))
				continue;
			this._sources.add(prefixture.src);
			this.load.image(prefixture.src, prefixture.src);
		}
	}

	_createFixtures()
	{
		const stationary_group = this.physics.add.staticGroup();
		const movables_group = this.physics.add.group();
		for(const fixture_data of this.prefixtures)
		{
			console.log(fixture_data.src);
			if(fixture_data.abstract)
				continue;
			// Now we can create the concreate fixture
			const fixture = new Fixture(
				fixture_data,
				this,
				{
					stationary_group:stationary_group,
					movables_group:movables_group
				}
			);
				
			const sprite = fixture.getPhaserObject();
			

			if(fixture_data.label)
			{
				this._sprite_dict[fixture_data.label] = sprite;
				this._fixtures[fixture_data.label] = fixture;
			}

			if(fixture_data.type === "movable")
			{
				sprite.body.immovable = true;
			}

		}

		this.physics.add.collider(this._player, stationary_group);
		// Stop both movables when one hits another 
		this.physics.add.collider(movables_group, undefined,
		(a,b)=>{
			for(const obj of [a,b])
			{
			obj.body.velocity.x=0;
			obj.body.velocity.y=0;
			obj.body.immovable=true;
			}
		})
		this.physics.add.collider(stationary_group, movables_group);
		// Allow movables to be moved only on collision
		this.physics.add.collider(this._player, movables_group,
			(player,obj)=>{
				obj.body.immovable = false;
				this._stuck_movables.add(obj);
				new Fixture(obj).refreshDepth();
			}
		);

	}

	/**
	 * Set how often loop() is called
	 *
	 * @param {integer} - The interval in milliseconds
	 */
	setLoopInterval(interval)
	{
		_timer_interval = interval;
	}

	/**
	 * See often loop() is called
	 *
	 * @return {integer} - the interval in milliseconds
	 */
	getLoopInterval()
	{
		return _timer_interval;
	}

	/**
	 * Bind callbacks to particular prefixtures w/label  
	 * To be executed when user presses space or enter
	 * or something like that near the fixture
	 *
	 * @param {string} - The Fixture label
	 * @param {function} - The action to be used upon interaction
	 */
	addInteraction(label, action)
	{
		this._interactions.push({
			label:label,
			action:action});
	}

	/**
	 * Get Fixture by label
	 *
	 * @param {string} - The Fixture label
	 * @return {Fixture} - The Fixture
	 */
	getFixture(label)
	{
		return this._fixtures[label];
	}

	/**
	 * Fixture object wrapping the player
	 */
	get player_fixture()
	{
		return this._player_fixture;
	}

	preload()
	{
		this.load.setBaseURL('assets/images');
		this.load.spritesheet('player', 'sheet_ghost.png', {frameWidth:64, frameHeight:64});
		this._cursors = this.input.keyboard.createCursorKeys();
		this._preloadFixtureSources();
	}

	create()
	{
		this._player = this.physics.add.sprite(0, 0, 'player');
		this._player.body.height/=10;
		this._player.body.setOffset(0,this._player.height-this._player.body.height);
		this._player_fixture = new Fixture(this._player);
		this.anims.create({
			key: 'player_front',
			frames: [ { key: 'player', frame: 0 } ],
			frameRate: 20
		});
		this.anims.create({
			key: 'player_back',
			frames: [ { key: 'player', frame: 1 } ],
			frameRate: 20
		});
		this.anims.create({
			key: 'player_side',
			frames: [ { key: 'player', frame: 2 } ],
			frameRate: 20
		});

		
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

		if(this.loop)
		{
			if(0 || this._timer_done)
			{
				this._timer_done=false;
				this.loop();
			}
		}

		if(this._cursors.left.isDown)
		{
			this._player.flipX = true;
			this._player.setVelocityX(-SPEED);
			this._player.setVelocityY(0);
			this._player.anims.play("player_side");
		}
		else if(this._cursors.right.isDown)
		{
			this._player.flipX = false;
			this._player.setVelocityX(SPEED);
			this._player.setVelocityY(0);
			this._player.anims.play("player_side");
		}
		else
		{
			this._player.setVelocityX(0);
			if(this._cursors.up.isDown)
			{
				this._player.setVelocityY(-160);
				this._player.anims.play("player_back");
			}
			else if(this._cursors.down.isDown)
			{
				this._player.setVelocityY(160);
				this._player.anims.play("player_front");
			}
			else
			{
				this._player.setVelocityY(0);

				// Only allow objects currently being moved to be movable
				for(const obj of this._stuck_movables)
				{
					if(obj.body.velocity.x == 0 && obj.body.velocity.y==0)
					{
						obj.body.immovable=true;
						this._stuck_movables.delete(obj);
					}
				}
			}

			this.player_fixture.refreshDepth();
		}
	}

}
