import "./scss/main.scss";
import Paddle from "./classes/Paddle";
import InputHandler from "./classes/Input";
import Ball from "./classes/Ball";

// see: https://github.com/Microsoft/vscode/issues/35727#issuecomment-335035228
const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
  "gameScreen"
));
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
const ball = new Ball(GAME_WIDTH, GAME_HEIGHT);

new InputHandler(paddle);

let lastTime = 0;

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  paddle.update(deltaTime);
  paddle.draw(ctx);

  ball.update(deltaTime);
  ball.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

// Enables Hot Module Reloading (HMR) during Development
if (module.hot) {
  module.hot.accept();
}
