class AStarAlorithm
{
    constructor(start, end, grid)
    {
        this.start = start;
        this.end = end;
        this.grid = grid;
    }

    computePath()
    {
        var openSet = new PriorityQueue((i, j) => {return fScore.get(i) - fScore.get(j)});
        var cameFrom = new PointMap();
        var gScore = new Map();
        var fScore = new Map();

        openSet.enqueue(start);
        gScore.set(this.start, 0);
        fScore.set(this.start, this.heuristic(this.start, this.end));

        while(!openSet.isEmpty())
        {
            var current = openSet.dequeue();
            if (current.equals(end))
            {
                return this.reconstructPath(cameFrom, start, end)
            }

            this.neighbors(current)
                .filter(a => this.isWithinBounds(a))
                .filter(b => !this.isBlocked(b))
                .forEach(i => 
                {
                    fill(254, 252, 55);
                    rect(i.x * tileWidth, i.y * tileHeight, tileWidth, tileHeight);

                    var tenative_gScore = gScore.get(current) + 1;
                    var neighbor_gScore = (gScore.get(i) == null) ? 0 : gScore.get(i);
                    if (tenative_gScore < neighbor_gScore || gScore.get(i) == null)
                    {
                        cameFrom.set(i, current);
                        gScore.set(i, tenative_gScore);
                        fScore.set(i, tenative_gScore + this.heuristic(i, end));
                        if (!openSet.items.includes(i))
                        {
                            openSet.enqueue(i);
                        }
                    }
                })
        }
        return [];
    }

    heuristic(a, b)
    {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    neighbors(pos)
    {
        return [
            new Point(pos.x + 1, pos.y), 
            new Point(pos.x - 1, pos.y), 
            new Point(pos.x, pos.y + 1), 
            new Point(pos.x, pos.y - 1),
        ]
    }

    isBlocked(pos)
    {
        return this.grid[pos.x][pos.y];
    }

    isWithinBounds(pos)
    {
        if (pos.x >= 0 && pos.y >= 0 && pos.x < 200 && pos.y < 200)
        {
            return true;
        }
        return false;
    }

    reconstructPath(cameFrom, start, end)
    {
        var path = [];
        var current = end;
        while (!current.equals(start))
        {
            path.push(cameFrom.get(current));
            current = cameFrom.get(current);
        }
        path.pop();
        return path;
    }
}