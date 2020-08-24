"use strict";
class TroutManager
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
					debug:true
				}
			}
		}
		this._game = new Phaser.Game(_config);
	}

	addScene(scene)
	{
		if(!this._latest_scene_name)
			throw new Error("Are you sure you're using addScene correctly? We weren't set to dynamically load a scene")

		for(const s in this._scenes)
		{
			console.log(s);
			if(s === scene)
			{
				throw new Error("Can't add scene twice");
			}
		}

		this._scenes[this._latest_scene_name] = scene;
	}

	_setPrimaryScene(scene_name)
	{
		const scene = this._scenes[scene_name];
		this._game.scene.remove("primary");
		this._game.scene.add("primary", this._scenes[scene_name], true);
	}

	setPrimaryScene(scene_name)
	{
		if(this._scenes[scene_name])
		{
			// Scene is already loaded
			this._setPrimaryScene(scene_name);
			return;
		}

		this._latest_scene_name = scene_name;

		// Load scene
		const script = document.createElement("script");
		script.src = "scenes/"+scene_name+".js";
		document.head.appendChild(script);
		script.onload = ()=>{
			this._setPrimaryScene(scene_name);
		};
		
	}
};

const trout = new TroutManager;
