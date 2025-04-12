const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = 500;
const numberOfCells = 25;
const cellSize = Math.floor(canvasWidth / numberOfCells);
const scoreBoxHeight = 80; // space reserved for the score
const canvasHeight = numberOfCells * cellSize + scoreBoxHeight;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const GREEN = 'rgb(173, 204, 96)';
const DARK_GREEN = 'rgb(43, 51, 24)';

let snake = [{ x: 6, y: 9 }, { x: 5, y: 9 }, { x: 4, y: 9 }];
let direction = { x: 1, y: 0 };
let food = generateRandomPos();
let score = 0;
let gameInterval;

const eatSound = new Audio('/static/static_eat.mp3');
const wallHitSound = new Audio('/static/wall.mp3');

function draw() {
    // Draw score area
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, scoreBoxHeight);

    ctx.fillStyle = DARK_GREEN;
    ctx.font = '40px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${score}`, 10, 20);

    // Draw game zone (green)
    ctx.fillStyle = GREEN;
    ctx.fillRect(0, scoreBoxHeight, canvasWidth, canvasHeight - scoreBoxHeight);

    // Draw snake
    ctx.fillStyle = DARK_GREEN;
    snake.forEach(segment => {
        ctx.fillRect(segment.x * cellSize, scoreBoxHeight + segment.y * cellSize, cellSize, cellSize);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * cellSize, scoreBoxHeight + food.y * cellSize, cellSize, cellSize);
}

function update() {
    const head = { ...snake[0] };
    head.x += direction.x;
    head.y += direction.y;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateRandomPos();
        eatSound.play();
    } else {
        snake.pop();
    }

    if (
        head.x < 0 || head.x >= numberOfCells ||
        head.y < 0 || head.y >= numberOfCells ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        wallHitSound.play();
        clearInterval(gameInterval);
        alert('Game Over!');
    }

    draw();
}

function generateRandomPos() {
    let pos;
    do {
        pos = {
            x: Math.floor(Math.random() * numberOfCells),
            y: Math.floor(Math.random() * numberOfCells)
        };
    } while (snake.some(segment => segment.x === pos.x && segment.y === pos.y));
    return pos;
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

gameInterval = setInterval(update, 200);
