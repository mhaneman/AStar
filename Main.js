// TODO: 
// use grid to create a 2d array. Use this to test the obstacles
// pass grid to AStarAlgorithm to make testing of blocked paths o(1)

let tileWidth = Math.floor(window.innerWidth / 40);
let tileHeight = Math.floor(window.innerWidth / 40);
let numTilesX = Math.floor(window.innerWidth / tileWidth);
let numTilesY = Math.floor(window.innerHeight / tileWidth);

var grid = Array.from(Array(numTilesX), () => new Array(numTilesY).fill(false));
console.log(grid);''

//rgb values for the tiles
let green = [51, 255, 187];
let black = [0, 0, 0];
let red = [211, 95, 122];
let pink = [231, 144, 244];
let blue = [90, 129, 226]


var blocked = [];
var start;
var end;

function setup() 
{
    // setup the inital state of the variables for caculations and drawing
    start = new Point(0, 0);
    end = new Point(10, 10);

    // Draw the inital state of the web page
    createCanvas(window.innerWidth, window.innerHeight);
    drawBackground();

    // draws the start and end node
    drawTile(start.x, start.y, blue);
    drawTile(end.x, end.y, red);
    drawAStar();
}

function draw() 
{
}

// draws the background grid
function drawBackground()
{
    for (i = 0; i < numTilesX; i++)
    {
        for (j = 0; j < numTilesY; j++)
        {
            drawTile(i, j, green);
        }
    }
}

// helper function
function drawTile(x, y, color)
{
    fill(color[0], color[1], color[2]);
    rect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
}

// draws the obstacles for A* to avoid
function drawBlocked()
{
    for (i = 0; i < this.blocked.length; i++)
    {
        drawTile(this.blocked[i].x, this.blocked[i].y, black);
    }
}

// draws the path that A* has calcuated
function drawAStar()
{
    var aStar = new AStarAlorithm(this.start, this.end, this.grid);
    var path = aStar.computePath();
    for (i = 0; i < path.length; i++)
    {
        drawTile(path[i].x, path[i].y, pink);
    }
}

function drawUpdate()
{
    drawBackground();
    drawTile(start.x, start.y, blue);
    drawTile(end.x, end.y, red);
    drawBlocked();
    drawAStar();
}

// update the blocked paths and recalcuate A*
function mouseClicked()
{
    x = Math.floor(mouseX / tileWidth);
    y = Math.floor(mouseY / tileHeight);
    tileClicked = new Point(x, y);
        
    if (blocked.filter(i => i.equals(tileClicked) == 0))
    {
        blocked.push(tileClicked);
        grid[x][y] = true;
    }
    drawUpdate();
}