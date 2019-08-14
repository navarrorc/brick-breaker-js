import "./scss/main.scss";
import Game from "./classes/Game";

// see: https://github.com/Microsoft/vscode/issues/35727#issuecomment-335035228
const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
  "gameScreen"
));
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();

let lastTime = 0;

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

// Enables Hot Module Reloading (HMR) during Development
if (module.hot) {
  module.hot.accept();
}
