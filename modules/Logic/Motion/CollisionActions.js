import { game } from "../../../app.js";
import { CANVAS } from "../../Assets/OtherGfx.js";
import { DamageNumber } from "../../Graphics/Effects/DamageNumber.js";
import { Particle } from "../../Graphics/Effects/Particle.js";
import { Movement } from "./Movement.js";
import { flashScreen, randomInRange } from "../Helpers.js";
import { Seeker } from "../../Lasers/Friendly/Seeker.js";
import { Parasites } from "../../Lasers/Friendly/Parasites.js";


export class CollisionActions {
    // BLUELASERS AND ENEMIES
    static BluelasersEnemies(enemy, laser) {
        // Check if the enemy is not already pierced (in case of piercers upgrade)
        if (!laser.piercedEnemies.includes(enemy)) {
            enemy.pushBack();
            enemy.takeDamage(laser.damage);
            game.audiocontroller.playHitSound(enemy);
            game.damagenumbers.add(new DamageNumber(enemy.x, enemy.y, laser.damage))
            game.particles.add(new Particle(enemy.x, enemy.y));
        }

        // Check if Piercers upgraded
        if (!game.state.variables.piercers || laser.constructor === Seeker || laser.constructor === Parasites )
            laser.shatter();
        else {
            laser.piercedEnemies.push(enemy);
        }
            

        // Check if Bomb upgraded
        if (game.state.variables.bomb)
            game.enemies.damageAll(laser.damage * game.state.variables.bombdamagerate);
    }

    // PLAYER AND ENEMIES
    static PlayerEnemies(enemy) {
        if (game.player.shield.isCharged() && !enemy.name && !game.player.clock.active) {
            flashScreen();
            enemy.takeDamage(enemy.hp);
            game.player.shield.deplete();
            if (game.state.variables.emp) {
                game.enemies.damageAll(randomInRange(2,6) * game.state.variables.damageMultiplier * game.state.variables.emprate);
                game.firelasers.clear();
            }
        }
        // If clock not active but ready, activate it.
        else if (game.player.clock.owned && !game.player.clock.active && game.player.clock.ready)
            game.player.clock.activate();
        else if (!game.player.clock.active)
            game.state.setGameOver();
    }

    // PLAYER AND ENEMY LASERS
    static PlayerLasers(firelaser) {
        if (game.player.shield.isCharged() && !game.player.clock.active) {
            flashScreen();
            firelaser.shatter();
            game.player.shield.deplete();
            if (game.state.variables.emp) {
                game.enemies.damageAll(randomInRange(2,6) * game.state.variables.damageMultiplier * game.state.variables.emprate);
                game.firelasers.clear();
            }
        }
        // If clock not active but ready, activate it.
        else if (game.player.clock.owned && !game.player.clock.active && game.player.clock.ready)
            game.player.clock.activate();
        else if (!game.player.clock.active)
            game.state.setGameOver();
    }

    // ENEMIES AND ENEMIES
    static EnemiesEnemies(enemy1, enemy2) {
        Movement.moveAway(enemy1, enemy2);
    }

    // BLUELASERS AND FIRELASERS
    static BluelasersFirelasers(bluelaser, firelaser) {
            if (game.state.variables.piercers)
                firelaser.shatter();
    }

    // ENEMIES AND CANVAS LIMITS
    static EnemyCanvas(enemy) {
        Movement.moveToCanvas(enemy);
    }
}