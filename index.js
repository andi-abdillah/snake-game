const CELL_SIZE = 15;
const CANVAS_SIZE = 300;
const REDRAW_INTERVAL = 0;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
var MOVE_INTERVAL = 170;
var diamond = 3;
var level = 1;
var score = 0;
 
function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}
function outPosition() {
    return {
        x: 1000,
        y: 1000,
    }
}
function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
}
 
function initDirection() {
    return Math.floor(Math.random() * 4);
}
 
function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,
        diamond: 3,
        level: 1,
    }
}
let snake1 = initSnake("black");

let dinding1 = {
    position: {
        x: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
        y: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
    },
    color: "grey",
}

let dinding2 = {
    position: {
        x: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
        y: [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
    },
    color: "grey",
}

let dinding3 = {
    position: {
        x: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
        y: [15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15],
    },
    color: "grey",
}

let dinding4 = {
    position: {
        x: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
        y: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    },
    color: "grey",
}

let dinding5 = {
    position: {
        x: [15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15],
        y: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    },
    color: "grey",
}
 
let dinding6 = {
    position: {
        x: [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
        y: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    },
    color: "grey",
}
 
let life = {
    color: "red",
    position: outPosition(),
}

function multiple(score){
    if(score % 5 == 0){
        life.position = initPosition();
    }else if(score % 5 != 0){
        life.position = outPosition();
    }
}

let apple1 = {
    color: "red",
    position: initPosition(),
}
 
let apple2 = {
    color: "red",
    position: initPosition(),
}

let positionObstacle = [
    { x: 3, y: Math.floor(HEIGHT * 1 / 4) }, // lvl 2
    { x: 3, y: Math.floor(HEIGHT * 3 / 4) }, // lvl 3
    { x: 3, y: Math.floor(HEIGHT * 2 / 4) }, // lvl 4
    
    // lvl 5
    { x: 0, y: Math.floor(HEIGHT * 1 / 4) }, 
    { x: 0, y: Math.floor(HEIGHT * 3 / 4) }, 
    { x: 5, y: Math.floor(HEIGHT * 2 / 4) }, 
    
];

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawDiamond(ctx, x, y) {
    let img = document.getElementById('life');
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawLifeScore(ctx, x, y) {
    let img = document.getElementById('life');
    ctx.drawImage(img, x*4, y, CELL_SIZE*1.4, CELL_SIZE*1.4);
}
 
function drawApple(ctx, x, y) {
    let img = document.getElementById('apple');
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}
 
function drawSnake(ctx, x, y) {
    let img = document.getElementById('snake');
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}
 
function drawSnakeBody(ctx, x, y) {
    let img = document.getElementById('snakeBody');
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawHorizontal(ctx, x, y, width, height) {
    ctx.fillStyle = "Black";
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE * width, CELL_SIZE * height);
}

function drawScore(score) {
    let scoreCanvas;
    scoreCanvas = document.getElementById("score1Board");
    let scoreCtx = scoreCanvas.getContext("2d");
 
    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "15px Arial";
    scoreCtx.fillStyle = "black";
    scoreCtx.fillText(score, 35, 22);
}

function drawLevel(level) {
    let levelCanvas;
    levelCanvas = document.getElementById("levelBoard");
    let levelCtx = levelCanvas.getContext("2d");
 
    levelCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    levelCtx.font = "15px Arial";
    levelCtx.fillStyle = "black";
    levelCtx.fillText("Level " + level, 18, 22);
}
function drawSpeed(speed) {
    let speedCanvas;
    speedCanvas = document.getElementById("speedBoard");
    let speedCtx = speedCanvas.getContext("2d");
 
    speedCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    speedCtx.font = "15px Arial";
    speedCtx.fillStyle = "black";
    speedCtx.fillText(speed + ".ms ", 18, 22);
}

function draw() {
    setInterval(function() {
        let snakeLifeScore = document.getElementById("lifeBoard");
        let ctx1 = snakeLifeScore.getContext("2d");
        ctx1.clearRect(0, 0, 400, 40);
        for (let i = 0; i < diamond; i++) {
            drawLifeScore(ctx1, i*5.5, 0, life.color);
        }
        
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        drawSnake(ctx, snake1.head.x, snake1.head.y, snake1.color);
        for (let i = 1; i < snake1.body.length; i++) {
            drawSnakeBody(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
        }
        drawApple(ctx, apple1.position.x, apple1.position.y, apple1.color);
        drawApple(ctx, apple2.position.x, apple2.position.y, apple2.color);
        drawScore(score);
        drawLevel(level);
        drawSpeed(MOVE_INTERVAL);
        setAppleAndDiamond(apple1);
        setAppleAndDiamond(apple2);
        setAppleAndDiamond(life);
        drawDiamond(ctx, life.position.x, life.position.y, life.color);
        if(level ===2){
            for(let i = 0; i < dinding1.position.x.length; i++){
                console.log("test");
                drawCell(ctx, dinding1.position.x[i], dinding1.position.y[i], dinding1.color);
                console.log("test2");
            }
        }else if(level === 3){
            for(let i = 0; i < dinding1.position.x.length; i++){
                console.log("test");
                drawCell(ctx, dinding1.position.x[i], dinding1.position.y[i], dinding1.color);
                console.log("test2");
            }
            for(let i = 0; i < dinding2.position.x.length; i++){
                console.log("test");
                drawCell(ctx, dinding2.position.x[i], dinding2.position.y[i], dinding2.color);
                console.log("test2");
            }
        }else if (level === 4){
            for(let i = 0; i < dinding1.position.x.length; i++){
                console.log("test");
                drawCell(ctx, dinding1.position.x[i], dinding1.position.y[i], dinding1.color);
                console.log("test2");
            }
            for(let i = 0; i < dinding2.position.x.length; i++){
                console.log("test");
                drawCell(ctx, dinding2.position.x[i], dinding2.position.y[i], dinding2.color);
                console.log("test2");
            }
            for(let i = 0; i < dinding3.position.x.length; i++){
                console.log("test");
                drawCell(ctx, dinding3.position.x[i], dinding3.position.y[i], dinding3.color);
                console.log("test2");
            }
        }else if(level === 5){
            for(let i = 0; i < dinding4.position.x.length; i++){
                console.log("test");
                drawCell(ctx, dinding4.position.x[i], dinding4.position.y[i], dinding4.color);
                console.log("test2");
            }
            for(let i = 0; i < dinding5.position.x.length; i++){
                console.log("test");
                drawCell(ctx, dinding5.position.x[i], dinding5.position.y[i], dinding5.color);
                console.log("test2");
            }
        }else if(level === 6){
            for(let i = 0; i < dinding4.position.x.length; i++){
                console.log("test");
                drawCell(ctx, dinding4.position.x[i], dinding4.position.y[i], dinding4.color);
                console.log("test2");
            }
            for(let i = 0; i < dinding5.position.x.length; i++){
                console.log("test");
                drawCell(ctx, dinding5.position.x[i], dinding5.position.y[i], dinding5.color);
                console.log("test2");
            }
            for(let i = 0; i < dinding6.position.x.length; i++){
                console.log("test");
                drawCell(ctx, dinding6.position.x[i], dinding6.position.y[i], dinding6.color);
                console.log("test2");
            }
        }

    }, REDRAW_INTERVAL);
}
 
function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}
 
function speedUp(score){
    let multiple = Math.ceil(score/5) * 5;
    var levelUpAudio = new Audio('assets/levelUp.mp3');
    if(score == multiple && score < 26){
        levelUpAudio.play();
        MOVE_INTERVAL -= 20;
        level++;
        let levelup = level-1;
        alert("Level " + levelup + " Is Complete");
    }else if(score == multiple && score > 26){
        levelUpAudio.play();
        MOVE_INTERVAL -= 5;
    }
 
}

function eatDiamond(snake, life) {
    if (snake.head.x == life.position.x && snake.head.y == life.position.y) {
        life.position = outPosition();
        diamond++;
        score++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
        var audio = new Audio('assets/eatingdiamond.wav');
        audio.play();
    }
}
 
function eat(snake, apple) {
    if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
        apple.position = initPosition();
        score++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
        var audio = new Audio('assets/eat.wav');
        audio.play();
        speedUp(score);
        multiple(score);
    }
}

function upButton() {
    turn(snake1, DIRECTION.UP);
}
function leftButton() {
    turn(snake1, DIRECTION.LEFT);
}
function rightButton() {
    turn(snake1, DIRECTION.RIGHT);
}
function downButton() {
    turn(snake1, DIRECTION.DOWN);
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple1);
    eat(snake, apple2);
    eatDiamond(snake, life);
}
 
function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple1);
    eat(snake, apple2);
    eatDiamond(snake, life);
}
 
function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple1);
    eat(snake, apple2);
    eatDiamond(snake, life);
}
 
function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apple1);
    eat(snake, apple2);
    eatDiamond(snake, life);
}

function setAppleAndDiamond(AppleAndDiamond){
    for (let k = 1; k < snake1.body.length; k++) {
        if (AppleAndDiamond.position.x == snake1.body[k].x && AppleAndDiamond.position.y == snake1.body[k].y) {
            AppleAndDiamond.position = initPosition();
        }
    }
    if (life.position.x == apple1.position.x && life.position.y == apple1.position.y || life.position.x == apple2.position.x && life.position.y == apple2.position.y ) {
        life.position = initPosition();
    }
    if(level >= 2 && level <= 4 ){
        if(level >= 2){
            for (let i = 0; i < dinding1.position.x.length; i++){
                if (AppleAndDiamond.position.x == dinding1.position.x[i] && AppleAndDiamond.position.y == dinding1.position.y[i]){
                    AppleAndDiamond.position = initPosition();
                }
            }
        }if(level >= 3){
            for (let i = 0; i < dinding2.position.x.length; i++){
                if (AppleAndDiamond.position.x == dinding2.position.x[i] && AppleAndDiamond.position.y == dinding2.position.y[i]){
                    AppleAndDiamond.position = initPosition();
                }
            }
        }if(level >= 4){
            for (let i = 0; i < dinding3.position.x.length; i++){
                if (AppleAndDiamond.position.x == dinding3.position.x[i] && AppleAndDiamond.position.y == dinding3.position.y[i]){
                    AppleAndDiamond.position = initPosition();
                }
            }
        }
    } if(level > 4 ){
        if(level >= 5){
            for (let i = 0; i < dinding4.position.x.length; i++){
                if (AppleAndDiamond.position.x == dinding4.position.x[i] && AppleAndDiamond.position.y == dinding4.position.y[i]){
                    AppleAndDiamond.position = initPosition();
                }
            }
            for (let i = 0; i < dinding5.position.x.length; i++){
                if (AppleAndDiamond.position.x == dinding5.position.x[i] && AppleAndDiamond.position.y == dinding5.position.y[i]){
                    AppleAndDiamond.position = initPosition();
                }
            }
        }if(level >= 6){
            for (let i = 0; i < dinding6.position.x.length; i++){
                if (AppleAndDiamond.position.x == dinding6.position.x[i] && AppleAndDiamond.position.y == dinding6.position.y[i]){
                    AppleAndDiamond.position = initPosition();
                }
            }
        }
    }
}


// collision 

function checkCollision(snakes) {
    let isCollide = false;
    //this
    for (let k = 1; k < snakes.body.length; k++) {
        if (snakes.head.x == snakes.body[k].x && snakes.head.y == snakes.body[k].y) {
            isCollide = true;
        }
    }

    if(level >= 2 && level <= 4 ){
        if(level >= 2){
            for (let i = 0; i < dinding1.position.x.length; i++){
                if (snakes.head.x == dinding1.position.x[i] && snakes.head.y == dinding1.position.y[i]){
                    isCollide = true;
                }
            }
        }if(level >= 3){
            for (let i = 0; i < dinding2.position.x.length; i++){
                if (snakes.head.x == dinding2.position.x[i] && snakes.head.y == dinding2.position.y[i]){
                    isCollide = true;
                }
            }
        }if(level >= 4){
            for (let i = 0; i < dinding3.position.x.length; i++){
                if (snakes.head.x == dinding3.position.x[i] && snakes.head.y == dinding3.position.y[i]){
                    isCollide = true;
                }
            }
        }
    }else if(level > 4){
        if(level >= 5){
            for (let i = 0; i < dinding4.position.x.length; i++){
                if (snakes.head.x == dinding4.position.x[i] && snakes.head.y == dinding4.position.y[i]){
                    isCollide = true;
                }
            }
            for (let i = 0; i < dinding5.position.x.length; i++){
                if (snakes.head.x == dinding5.position.x[i] && snakes.head.y == dinding5.position.y[i]){
                    isCollide = true;
                }
            }
        }if(level >= 6){
            for (let i = 0; i < dinding6.position.x.length; i++){
                if (snakes.head.x == dinding6.position.x[i] && snakes.head.y == dinding6.position.y[i]){
                    isCollide = true;
                }
            }
        }
    }

    if (isCollide) {
        if(diamond <= 1){
            var bel = new Audio('assets/gameover.mp3');
            bel.play();
            alert("Game over");
            snake1 = initSnake();
            level = 1;
            score = 0;
            diamond = 3;
            MOVE_INTERVAL = 170;
        } else{
            snake1 = initSnake();
            var hit = new Audio('assets/hit.mp3');
            hit.play();
            diamond--
        }
    }
    return isCollide;
}
 
function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    if (!checkCollision(snake)) {
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        move(snake1);
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}
 
function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }
 
    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake1, DIRECTION.DOWN);
    }
 
})
 
function initGame() {
    move(snake1);
}
 
initGame();
