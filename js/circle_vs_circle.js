
function ClearCanvas(Context, Color)
{
    Context.fillStyle = 'white';
    Context.fillRect(0, 0, 800, 600);
}

function DrawCircle(Context, X, Y, Radius, Color)
{
    Context.fillStyle = Color;
    Context.beginPath();
    Context.arc(800/2 - 10, 600/2 -10, 20, 0, Math.PI * 2, true);
    Context.fill();
}

window.onload = function()
{
    PreviewCanvas = document.getElementById('PreviewCanvas');
    PreviewCanvasContext = PreviewCanvas.getContext('2d');

    FirstCanvas = document.getElementById('FirstCanvas');
    FirstCanvasContext = FirstCanvas.getContext('2d');

    SecondCanvas = document.getElementById('SecondCanvas');
    SecondCanvasContext = SecondCanvas.getContext('2d');

    ClearCanvas(PreviewCanvasContext, 'white');
    DrawCircle(PreviewCanvasContext, 0, 0, 1, 'blue');

    FirstCanvasContext.fillStyle = 'white';
    FirstCanvasContext.fillText("Click to continue", 350, 500);
    FirstCanvasContext.fillRect(0, 0, 800, 600);
    FirstCanvasContext.fillStyle = 'red';
    FirstCanvasContext.fillRect(400 - 50, 300 - 50, 100, 100);

    DrawCircle(SecondCanvasContext, 0, 0, 1, 'red');
}
