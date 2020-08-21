import {Game} from './engine/Game.js'
import {CollisionPair} from './engine/CollisionPair.js'
import {Sprite} from './engine/Sprite.js'
import {sleep} from './utils.js'

const game = new Game('main-container', 200, 200, 3);

const player = game.addSprite(new Sprite("media/megaman.gif",0,0));

for (const point of [[100,200],[200,50],[25,60],[50,133]])
{
	const tree = new Sprite("media/tree.gif", point[0], point[1]);
	const cp = new CollisionPair(player, tree, ()=>{collide=true;});
	game.addSprite(tree);
	game.registerCollisionPair(cp);
}

let xdiff = 0;
let ydiff = 0;
let collide = false;

async function main()
{
	await sleep(50);
	while(true)
	{
		game.x += xdiff;
		game.y += ydiff;
		player.x -= xdiff;
		player.y -= ydiff;
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
		await sleep(10);

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
