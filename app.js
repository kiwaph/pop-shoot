import { Game } from "./modules/Game.js";
import { CollisionDetection } from "./modules/Logic/Motion/CollisionDetection.js";

export const game = new Game();
window.requestAnimationFrame(gameloop);

export function gameloop() {
    if (!game.state.paused && !game.state.over) {
        game.draw();
        game.move();
        game.refresh();
        CollisionDetection.checkCollisions();   
        window.requestAnimationFrame(gameloop);
    }
    else {
        if (game.state.over) game.scene.drawGameOver();
        if (game.state.paused) game.scene.drawPause();        
    }
}