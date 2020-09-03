/**
 * Scene with a room
 * Automatically draws borders around grounds
 */
class RoomScene extends PlayerScene
{
	constructor()
	{
		super();
		this._edgeUpRoom();
	}
	
	_edgeUpRoom()
	{
		class Point
		{
			constructor(x,y)
			{
				[this.x,this.y] = [x,y];
			}
		}
		class Area{
			constructor(x,y,width, height)
			{
				[this.x,this.y,this.width,this.height]=[x,y,width,height];
			}
			containsEdge(hedge)
			{
				if(hedge.p1.y < this.y || hedge.p2.y> this.y+this.height)
					return false;
				if(hedge.p1.x < this.x || hedge.p2.x> this.x+this.width)
					return false;
				if(hedge.vertical &&
					(hedge.p1.x === this.x || hedge.p1.x === this.x+this.width) &&
					(Math.abs(hedge.p2.y-hedge.p1.y)<=this.height))
					return false;
				if(!hedge.vertical &&
					(hedge.p1.y === this.y || hedge.p1.y === this.y+this.height) &&
					(Math.abs(hedge.p2.x-hedge.p1.x)<=this.width))
					return false;

				console.log(hedge);	
				return true;
			}
		}
		class Edge
		{
			constructor(p1,p2)
			{
				[this.p1, this.p2] = [p1,p2];
			}
			containsPoint(p)
			{
				throw "Unimplemented";
			}
		}

		class Vedge extends Edge
		{
			constructor(a,b)
			{
				if(a.y < b.y)
					super(a,b);
				else
					super(b,a);
				if(a.x !== b.x)
					throw("Oh no");
				if(a.y === b.y)
					throw("Oh no");
				this.vertical=true;
			}
			containsPoint(p)
			{
				if(p.x !== this.p1.x)
					return false;
				return
					(p.y<=this.p1.y && p.y>=this.p2.y) ||
					(p.y>=this.p1.y && p.y<=this.p2.y) 
			}
			getIntersection(hedge)
			{

				if(hedge.p1.y <= this.p1.y)
					return null;
				if(hedge.p1.y >= this.p2.y)
					return null;
				if(hedge.p1.x >= this.p1.x)
					return null;
				if(hedge.p2.x <= this.p1.x)
					return null;

				return new Point(this.p1.x, hedge.p1.y);
			}
		}

		class Hedge extends Edge
		{
			constructor(a,b)
			{
				if(a.x < b.x)
					super(a,b);
				else
					super(b,a);
				if(a.y !== b.y)
					throw("Oh no");
				if(a.x === b.x)
					throw("Oh no");
				this.vertical=false;
			}
			containsPoint(p)
			{
				if(p.y !== this.p1.y)
					return false;
				return
					(p.x<=this.p1.x && p.x>=this.p2.x) ||
					(p.x>=this.p1.x && p.x<=this.p2.x) 
			}
		}
		const areas=[];
		const hedges=[];
		const vedges=[];
		for(const prefixture of this.prefixtures)
		{
			if(prefixture.abstract)continue;
			if(prefixture.type!== "ground")continue;
			const width = prefixture.width;
			const height = prefixture.height;
			const x = prefixture.x-width/2;
			const y = prefixture.y-height/2;
			areas.push(new Area(x,y,width,height));
			hedges.push(new Hedge(
				new Point(x,y),
				new Point(x+width,y)
			));
			hedges.push(new Hedge(
				new Point(x+width,y+height),
				new Point(x,y+height)
			));
			vedges.push(new Vedge(
				new Point(x,y),
				new Point(x,y+height)));
			vedges.push(new Vedge(
				new Point(x+width,y+height),
				new Point(x+width,y)));
		}

		for(const hedge of hedges)
		{
			for(const vedge of vedges)
			{
				const breakpoint = vedge.getIntersection(hedge);
				if(!breakpoint)continue;
				const old_h_point = new Point(hedge.p2.x, hedge.p2.y);
				const old_v_point = new Point(vedge.p2.x, vedge.p2.y);
				hedge.p2.x = breakpoint.x;
				hedge.p2.y = breakpoint.y;
				vedge.p2.x = breakpoint.x;
				vedge.p2.y = breakpoint.y;
				hedges.push(new Hedge(
					new Point(breakpoint.x,breakpoint.y),
					new Point(old_h_point.x,old_h_point.y)
				));
				vedges.push(new Vedge(
					new Point(breakpoint.x,breakpoint.y),
					new Point(old_v_point.x,old_v_point.y)
				));

			}
		}

		for(const edge of [...hedges, ...vedges])
		{
			let in_area = false;
			for(const area of areas)
			{
				if (area.containsEdge(edge))
				{
					in_area=true;
				}
			}
			if(in_area)continue;
			let prefix;
			if(edge.vertical)
			{
				prefix={
					src:"pixels/transparent.png",
					y:(edge.p1.y+edge.p2.y)/2,
					x:edge.p1.x,
					scaley:Math.abs(edge.p2.y-edge.p1.y)
				};
			}else
			{
				prefix={
					src:"pixels/transparent.png",
					x:(edge.p1.x+edge.p2.x)/2,
					y:edge.p1.y,
					scalex:Math.abs(edge.p2.x-edge.p1.x)
				};
			}
			this.prefixtures.push(prefix);
		}
	}
}
