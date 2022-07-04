import { game } from "../../../app.js";

export class SlowMo {

    static start() {
        // ENEMIES
        game.enemies.liveEnemies.forEach(enemy => enemy.speed *= game.state.variables.slowmorate);
        game.enemies.liveEnemies.forEach(enemy => enemy.firingrate /= game.state.variables.slowmorate);
        
        // LASERS
        game.firelasers.liveLasers.forEach(laser => laser.speed *= game.state.variables.slowmorate);
        game.bluelasers.liveLasers.forEach(laser => laser.speed *= game.state.variables.slowmorate);
        
        // EFFECTS
        game.scoreballs.liveScoreballs.forEach(scoreball => scoreball.speed *= game.state.variables.slowmorate);
        game.damagenumbers.liveNumbers.forEach(number => number.speed *= game.state.variables.slowmorate);
        game.damagenumbers.liveNumbers.forEach(number => number.duration /= game.state.variables.slowmorate);
        game.player.flame.toggleSpriteSpeed();
    }

    static stop() {
        // ENEMIES
        game.enemies.liveEnemies.forEach(enemy => enemy.speed /= game.state.variables.slowmorate);
        game.enemies.liveEnemies.forEach(enemy => enemy.firingrate *= game.state.variables.slowmorate);

        // LASERS
        game.firelasers.liveLasers.forEach(laser => laser.speed /= game.state.variables.slowmorate);
        game.bluelasers.liveLasers.forEach(laser => laser.speed /= game.state.variables.slowmorate);

        // EFFECTS
        game.scoreballs.liveScoreballs.forEach(scoreball => scoreball.speed /= game.state.variables.slowmorate);
        game.damagenumbers.liveNumbers.forEach(number => number.speed /= game.state.variables.slowmorate);
        game.damagenumbers.liveNumbers.forEach(number => number.duration *= game.state.variables.slowmorate);
        game.player.flame.toggleSpriteSpeed();
    }
}