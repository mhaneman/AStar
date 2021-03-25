class PointMap
{
    constructor()
    {
        this.items = []
    }

    set(key, value)
    {
        this.items.push([key, value]);
    }

    get(key)
    {
        for (var i in this.items)
        {
            var current = this.items[i][0];
            if (current.x == key.x && current.y == key.y)
            {
                return this.items[i][1];
            }
        }
    }

}