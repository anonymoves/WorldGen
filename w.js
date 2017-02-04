User = {x:190, y:190, size:10, color:"orange"};

WorldConstant = 11;
WorldCounter = 0;

ctx = cvs.getContext('2d');

Redraw();

function Redraw()
{
	fillCanvas(2, 3, 10);
	A = parseInt(IAID.value);
	if(A == 0) A = 1;
	F = parseFloat(IFID.value);
	X = parseInt(IXID.value);
	P = parseFloat(IPID.value);
	drawWorld(A, F, X, P);
	drawObject(User);
}

//Амплитуда, изменчивость, расстояние, вероятность
function drawWorld(A, F, X, P)
{
	S = 0;
	F1 = 0.0;
	ctx.fillStyle = '#aaa'
	
	for(x = 0; x < cvs.width; x+=X)
	{
		for(y = 0; y < cvs.height; y+=X)
		{
			if(randomizer(x, y, 100) / 100 >= P)
			{
				F1 += F;
				if(F1 == 1.0) F1 = 0.0;
				S = interpolate(A, 0, F1);
				ctx.fillRect(x, y, S, S);
			}
		}
	}
}

function randomizer(x, y, max)
{
	return (x ^ y) % max;
}

function interpolate(a, b, x)
{
	return a * (1 - ((1 - Math.cos(x * Math.PI)) / 2)) + b * ((1 - Math.cos(x * Math.PI)) / 2);
}

function fillCanvas(size, margin, rectSize)
{
	for(x = 0; x < cvs.width; x+=margin * 3 + (margin + rectSize) * 2)
		for(y = 0; y < cvs.height; y+=margin * 3 + (margin + rectSize) * 2)
			makeField(x, y, margin, rectSize);
}

function makeField(x, y, margin, rectSize)
{
	ctx.fillStyle = '#111'
	ctx.fillRect(x, y, margin * 3 + (margin + rectSize) * 2, margin * 3 + (margin + rectSize) * 2);
	
	ctx.strokeStyle = '#266'
	ctx.strokeRect(x + margin, y + margin, margin + (margin + rectSize) * 2, margin + (margin + rectSize) * 2)
	ctx.strokeStyle = '#233'
	ctx.strokeRect(x + margin * 2, y + margin * 2, rectSize, rectSize)
	ctx.strokeRect(x + rectSize + margin * 3, y + margin * 2, rectSize, rectSize)
	ctx.strokeRect(x + margin * 2, y + rectSize + margin * 3, rectSize, rectSize)
	ctx.strokeRect(x + rectSize + margin * 3, y + rectSize + margin * 3, rectSize, rectSize)
}
	
function drawObject(object)
{
	ctx.arc(object.x, object.y, object.size, 0, Math.PI / 180 * 360, true)
	ctx.fillStyle = object.color
	ctx.fill()
}