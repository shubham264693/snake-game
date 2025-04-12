const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Increased canvas height to accommodate the score box outside the game zone
const canvasWidth = 500;
const canvasHeight = 550; // Increased height
const numberOfCells = 25; 
const cellSize = Math.floor(canvasWidth / numberOfCells); // Calculate cell size
const OFFSET = 0; 

const GREEN = 'rgb(173, 204, 96)';
const DARK_GREEN = 'rgb(43, 51, 24)';

let snake = [{ x: 6, y: 9 }, { x: 5, y: 9 }, { x: 4, y: 9 }];
let direction = { x: 1, y: 0 };
let food = generateRandomPos();
let score = 0;
let gameInterval;

// Load sounds
const eatSound = new Audio('/static/static_eat.mp3');
const wallHitSound = new Audio('/static/wall.mp3');

// Adjust the canvas height and draw the score box outside the game area
canvas.height = canvasHeight;

function draw() {
    // Draw the game area (playfield)
    ctx.fillStyle = GREEN;
    ctx.fillRect(0, 80, canvasWidth, canvasHeight - 80); // Leave 50px space at the top for the score box

    ctx.fillStyle = DARK_GREEN;
    snake.forEach(segment => {
        ctx.fillRect(OFFSET + segment.x * cellSize, 50 + OFFSET + segment.y * cellSize, cellSize, cellSize); // Adjust y position
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(OFFSET + food.x * cellSize, 50 + OFFSET + food.y * cellSize, cellSize, cellSize); // Adjust y position

    // Draw score box outside the game zone
    ctx.fillStyle = 'white';
    ctx.fillRect(OFFSET - 10, 10, canvasWidth, 50); // Score box at the top

    ctx.fillStyle = DARK_GREEN;
    ctx.font = '40px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${score}`, OFFSET, 20);  // Adjusted Y position for score
}

function update() {
    const head = { ...snake[0] };
    head.x += direction.x;
    head.y += direction.y;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateRandomPos();
        eatSound.play(); // Play eat sound
    } else {
        snake.pop();
    }

    // Collision detection (if snake hits walls or itself)
    if (head.x < 0 || head.x >= numberOfCells || head.y < 0 || head.y >= numberOfCells || 
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        wallHitSound.play(); // Play wall hit sound
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
