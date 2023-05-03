"use strict";
///////////////// SETUP THE CANVAS
// declare the canvas and the context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// simulate a 16:9 ratio for the canvas
canvas.width = 500;
canvas.height = 280;
//add an array with the color constants we want
const colorArr = ["#ee0000", "#00ee00", "#0000ee", "#0055dd"];
let bounces = 0;
// declare the vars readout
const readout = document.getElementById("var-readout");
////////// declare the variables for our html elements
const speedSlider = document.getElementById("speed-slider");
const pauseButton = document.getElementById("pause-button");
///////////// declare our game variables
let isPaused = false;
// define the game object
class gameObject {
  constructor(
    name = "default",
    ctx,
    x = 0,
    y = 0,
    dx = 0,
    dy = 0,
    height = 0,
    speed = 0,
    size = 0,
    width = 0
  ) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.height = height;
    this.speed = speed;
    this.size = size;
    this.ctx = ctx;
    this.width = width;
  }
  draw() {
    this.ctx.beginPath();
    switch (this.name) {
      case "ball":
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        break;
      case "paddle":
        this.ctx.rect(this.x, this.y, this.width, this.height);
      default:
        null;
        break;
    }
    switch (this.name) {
      case "ball":
        // make a switch case for changing the color of the ball
        switch (true) {
          // case ball is going up and right
          case ball.dx >= 0 && ball.dy >= 0:
            ctx.fillStyle = colorArr[0];
            break;
          // case ball is going down and right
          case ball.dx >= 0 && ball.dy < 0:
            ctx.fillStyle = colorArr[1];
            break;
          // case ball is going left and up
          case ball.dx < 0 && ball.dy >= 0:
            ctx.fillStyle = colorArr[2];
            break;
          // case ball is going left and down
          case ball.dx < 0 && ball.dy < 0:
            ctx.fillStyle = colorArr[3];
            break;
          // add a default fill color of black
          default:
            ctx.fillStyle = "#00000";
        }
        break;
      case "paddle":
        this.ctx.fillStyle = "#000000";
        break;
      default:
        this.ctx.fillStyle = "#000000";
        break;
    }
    this.ctx.fill();
    this.ctx.closePath();
  }
}
class Ball extends gameObject {
  constructor({ ctx, x, y, dx, dy, size, speed }) {
    super("ball", ctx, x, y, dx, dy, 0, speed, size);
  }
  // update the ball's direction based on touching the walls calculated by x and y position with account to ball diameter (size)
  update() {
    if (ball.x + ball.size)
      if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
      }

    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
      ball.dy *= -1;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
  }
}
class Paddle extends gameObject {
  constructor({ ctx, x, y, dx, dy, height, size, speed, width }) {
    super("paddle", ctx, x, y, dx, dy, height, speed, size, width);
  }
  move() {
    if (rightPressed && paddle.x < canvas.width - paddle.width) {
      paddle.x += paddle.speed;
    } else if (leftPressed && paddle.x > 0) {
      paddle.x -= paddle.speed;
    }
  }
}
let ball = new Ball({
  x: 50,
  y: 50,
  dx: 5,
  dy: 5,
  size: 20,
  speed: 5,
  ctx: ctx,
});
let paddle = new Paddle({
  x: canvas.width / 2 - 40,
  y: canvas.height - 30,
  height: 20,
  speed: 7,
  width: 80,
  ctx: ctx,
});
// console.log(ball);
// console.log(paddle);
/////// INPUT EVENT LISTENERS
speedSlider.addEventListener("input", function () {
  ball.speed = parseInt(speedSlider.value);
  ball.dx = ball.speed;
  ball.dy = ball.speed;
});
pauseButton.addEventListener("click", function () {
  isPaused = !isPaused;

  if (!isPaused) {
    pauseButton.innerHTML = "Pause";
    // console.log('game is playing');
    animate();
  } else {
    pauseButton.innerHTML = "Play";
    // console.log('game is paused');
  }
});

function detectCollision() {
  if (
    ball.y + ball.size >= paddle.y &&
    ball.x >= paddle.x &&
    ball.x <= paddle.x + paddle.width
  ) {
    ball.dy = -ball.dy; // Reverse the dy direction
    if (ball.y < paddle.y) {
      bounces += 1;
    }
  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  paddle.draw();
  ball.update();
  paddle.move();
  detectCollision();
  readout.innerHTML = `Game Variables: <br/>
  ${
    /*
  ball.x is ${ball.x} <br/>
  ball.dx is ${ball.dx} <br/>
  ball.y is ${ball.y} <br/>
  ball.dy is ${ball.dy} <br/>
  paddle.x is ${paddle.x} <br/>
  paddle.y is ${paddle.y} <br/> 
  paddle.speed is ${paddle.speed} <br/>
  */
    ""
  }
  bounces is ${bounces} <br/>
  rightPressed is ${rightPressed} <br/>
  leftPressed is ${leftPressed}
  `;
  if (!isPaused) {
    requestAnimationFrame(animate);
  }
}
animate();
