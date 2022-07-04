import { CANVAS } from "../../Assets/OtherGfx.js";

export class Movement {
    static move(angle, speed) {
        const dx = Math.cos(angle / 180 * Math.PI) * speed;
        const dy = Math.sin(angle / 180 * Math.PI) * speed;
        return { x: dx, y: dy }
    }

    // Moves 'entity' towards 'destination'
    static moveTowards(entityX, entityY, destinationX, destinationY, speed) {
        const dx = destinationX - entityX;
        const dy = destinationY - entityY;

        const goal_dist = Math.sqrt((dx * dx) + (dy * dy));
        const ratio = speed / goal_dist;
        
        const xIncrement = ratio * dx;
        const yIncrement = ratio * dy;
        
        return { x: xIncrement, y: yIncrement};
    }

    // Moves 2 enemies away from each other
    static moveAway(enemy1, enemy2) {
        if (enemy1.x < enemy2.x) {
            enemy1.x += Movement.move(180, enemy1.speed).x; // MOVE LEFT
            enemy1.y += Movement.move(180, enemy1.speed).y; // MOVE LEFT
            enemy2.x += Movement.move(0, enemy2.speed).x; // MOVE RIGHT
            enemy2.y += Movement.move(0, enemy2.speed).y; // MOVE RIGHT
        }
        else {
            enemy1.x += Movement.move(0, enemy1.speed).x; // MOVE RIGHT
            enemy1.y += Movement.move(0, enemy1.speed).y; // MOVE RIGHT
            enemy2.x += Movement.move(180, enemy2.speed).x; // MOVE LEFT
            enemy2.y += Movement.move(180, enemy2.speed).y; // MOVE LEFT
        }
    }

    // Moves an enemy back to the screen if going out of canvas
    static moveToCanvas(enemy) {
        if (enemy.x > CANVAS.width - enemy.radius) {
            enemy.x += Movement.move(180, enemy.speed).x; // MOVE LEFT
            enemy.y += Movement.move(180, enemy.speed).y; // MOVE LEFT
        }
        if (enemy.x < enemy.radius){
            enemy.x += Movement.move(0, enemy.speed).x; // MOVE RIGHT
            enemy.y += Movement.move(0, enemy.speed).y; // MOVE RIGHT
        }
    }
}