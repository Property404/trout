import {Game} from './Game.js'
import {Sprite} from './Sprite.js'
import {sleep} from './utils.js'

const game = new Game('main-container', 400, 400);

const player = game.addSprite(new Sprite("horse.png",0,0));
const pikachu = game.addSprite(new Sprite("test.png",300,300));
const pikachu2 = game.addSprite(new Sprite("test.png",300,-50));
game.registerCollisionPair(player, pikachu,
	(p,obj)=>{collide=true}, (p,obj)=>console.log("halo"));
game.registerCollisionPair(player, pikachu2,
	(p,obj)=>{collide=true});

let xdiff = 0;
let ydiff = 0;
let collide = false;

async function main()
{
	await sleep(50);
	while(true)
	{
		player.x += xdiff;
		player.y += ydiff;
		game.checkCollisionPairs();
		if(collide)
		{
			console.log("Collide!");
			player.x -= xdiff;
			player.y -= ydiff;
			collide = false;
		}
		game.render();
		xdiff = 0;
		ydiff = 0;
		await sleep(0);

	}
}
main();

window.onkeydown = function(e)
{
	const key = e.key;
	const speed = 1;
	if(key.includes("Arrow"))
	{
		e.preventDefault();
		if(key === "ArrowUp")
		{
			ydiff = -speed
		}
		else if(key === "ArrowDown")
		{
			ydiff = speed
		}
		else if(key === "ArrowLeft")
		{
			xdiff = -speed
		}
		else if(key === "ArrowRight")
		{
			xdiff = speed
		}
	}else if(key === "Enter")
	{
		enter_pressed = true;
	}
}
main();
