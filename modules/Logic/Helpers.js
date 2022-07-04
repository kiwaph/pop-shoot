import { game } from "../../app.js";
import { Notification } from "../Graphics/Effects/Notification.js";
import { CANVAS } from "../Assets/OtherGfx.js";
import { FLASHPARTICLESPRITE } from "../Assets/Effects.js";

// Returns a random number between min(inclusive) and max(inclusive)
export function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// converts game time to MM:SS format
export function convertedTime() {
    let minutes = Math.floor(game.state.time / 60);
    let seconds = game.state.time % 60;
    
    if (minutes < 10)
        minutes = '0' + minutes;
    if (seconds < 10)
        seconds = '0' + seconds;
    return `${minutes}:${seconds}`
}

// returns the closest enemy to entity
export function closestEnemyTo(entity) {
    let distance = 9999;
    let closestEnemy;
    game.enemies.liveEnemies.forEach((enemy) => {
        const dx = enemy.x - entity.x;
        const dy = enemy.y - entity.y;

        const squared = Math.pow(dx, 2) + Math.pow(dy, 2);
        const newDistance = Math.sqrt(squared);

        if (newDistance < distance) {
            distance = newDistance;
            closestEnemy = enemy;
        } 
    })
    return closestEnemy;
}

// white screen-flash
export function flashScreen() {
    game.particles.add(new Notification(CANVAS.width / 2, CANVAS.height / 2, FLASHPARTICLESPRITE, 5));
}