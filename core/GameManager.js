"use strict";
// Class for global game manager object "trout"
// Wrapper around the Phaser game object
class GameManager
{
	_loaded_scenes = new Set();
	_scenes = {};

	constructor()
	{
		const _config = {
			type: Phaser.AUTO,
			width: 800,
			height: 600,
			pixelArt: true,
			physics: {
				default: 'arcade',
				arcade:{
					debug:true,
				}
			}
		}
		this._game = new Phaser.Game(_config);
	}

	// After defining a scene,
	// you should register it immediately after
	// so we can use it when we load it
	registerScene(scene)
	{
		if(!this._latest_scene_name)
			throw new Error("Are you sure you're using registerScene correctly? We weren't set to dynamically load a scene")

		for(const s in this._scenes)
		{
			if(s === scene)
			{
				throw new Error("Can't register scene twice");
			}
		}

		this._scenes[this._latest_scene_name] =
			{
				scene:scene
			};
	}

	_setPrimaryScene(scene_name, fixtures)
	{
		const scene_data = this._scenes[scene_name];
		const scene = scene_data.scene;
		scene.prototype.preSetup = function(){this.fixture_definitions = 
				scene_data.fixtures;
		}
		this._game.scene.add("primary", scene, true);
	}

	// Change main scene
	async setPrimaryScene(scene_name)
	{
		this._game.scene.remove("primary");

		if(this._scenes[scene_name])
		{
			// Scene is already loaded
			this._setPrimaryScene(scene_name);
			return;
		}

		this._latest_scene_name = scene_name;

		// Load scene
		const scene_path = "scenes/"+scene_name+"/";
		const fixtures_response = await fetch(scene_path+"fixtures.json");
		if(fixtures_response.ok)
		{
			const fixtures = await fixtures_response.json();

			const script = document.createElement("script");
			script.src = scene_path+"/class.js";
			document.head.appendChild(script);
			script.onload = ()=>{
				this._scenes[scene_name].fixtures = fixtures;
				this._setPrimaryScene(scene_name);
			};
		}
		else
		{
			throw new Error("Couldn't load fixtures for scene");
		}
		
	}

	// Set a callback to be called when we finish loading the first scene
	onFinishLoading(callback)
	{
		this._loading_finished_callback = callback;
	}
	
	// notify game manager that we finished loading and that we should use a
	// callback if one had previouly been provided
	finishLoading(callback)
	{
		if(this._loading_finished_callback)
		{
			this._loading_finished_callback();
			this._loading_finished_callback = null;
		}
	}
};

const trout = new GameManager;
