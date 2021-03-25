class PriorityQueue
{
    constructor(comparator)
    {
        this.items = [];
        this.comparator = comparator;
    }

    enqueue(item)
    {
        var found = false;
        for (i = 0; i < this.items.length; i++)
        {
            if (this.comparator(item, this.items[i]) <= 0)
            {
                this.items.splice(i, 0, item);
                found = true;
                break;
            }
        }
        if (!found)
            this.items.push(item); 
    }

    dequeue()
{
    if (this.isEmpty())
    {
        return "Underflow";
    }
    return this.items.shift();
}

    isEmpty()
    {
        return this.items.length == 0;
    }
}