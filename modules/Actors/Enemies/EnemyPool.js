import { game } from "../../../app.js";
import { CANVAS } from "../../Assets/OtherGfx.js";
import { Particle } from "../../Graphics/Effects/Particle.js";
import { RedPackage } from "../Packages/RedPackage.js";

export class EnemyPool {
    constructor() {
        this.liveEnemies = [];
    }

    add(enemy) {
        this.liveEnemies.push(enemy);   
        if (game.state.slowmo) {
            enemy.speed *= game.state.variables.slowmorate;
            enemy.firingrate /= game.state.variables.slowmorate;
        }
    }

    move() {
        if (!game.player.clock.active)
            this.liveEnemies.forEach(enemy => enemy.move());
    }

    damageAll(amount) {
        this.liveEnemies.forEach((enemy) => {
            enemy.takeDamage(amount);
            game.particles.add(new Particle(enemy.x, enemy.y));
        });
    }

    // If replay variable is set to true, the enemies array will be cleared (used for replay)
    // If set to false, the enemies will be killed normally & score counted (used after bosses)
    clear(replay) {
        if (replay)
            this.liveEnemies = [];
        else {
            this.liveEnemies.forEach((enemy) => {
                if (enemy.constructor !== RedPackage)
                    enemy.hp = 0;
            })
        }
    }

    // Used to check if there are any enemies on screen. Currently used by seekers
    enemiesOnScreen() {
        return this.liveEnemies.length;
    }

    // Execute the die() function on enemies which HP <= 0,
    // Then remove enemies that are dead or off-screen.
    refresh() {
        this.liveEnemies.forEach((enemy) => { if (enemy.hp <= 0) enemy.die()})
        this.liveEnemies = this.liveEnemies.filter((enemy) => enemy.y <= CANVAS.height && enemy.hp > 0)
    }
}