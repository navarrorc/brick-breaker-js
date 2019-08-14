// TODO: continue at https://youtu.be/3EMxBkqC4z0?t=1940
import Paddle from "./Paddle";
import InputHandler from "./Input";
import Ball from "./Ball";

class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  start() {
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);

    this.gameObjects = [this.ball, this.paddle];

    new InputHandler(this.paddle);
  }

  update(deltaTime) {
    this.gameObjects.forEach(sprite => sprite.update(deltaTime));
  }

  draw(/** @type {CanvasRenderingContext2D} */ ctx) {
    this.gameObjects.forEach(sprite => sprite.draw(ctx));
  }
}

export default Game;
