import { game } from "../../../app.js";
import { randomInRange } from "../../Logic/Helpers.js";
import { CANVAS } from "../../Assets/OtherGfx.js";
import { Scoreball } from "../../Graphics/Effects/Scoreball.js";
import { Parasites } from "../../Lasers/Friendly/Parasites.js";

export class Enemy {
    constructor(radius, hp, scoreballs, sprite, speed, firingrate) {
        this.radius = radius;
        this.hp = this.maxhp = hp;
        this.scoreballs = (game.state.variables.greed) ? scoreballs * 2 : scoreballs;
        this.sprite = sprite;
        this.speed = speed;
        this.firingrate = firingrate;
        this.steps = 0;
        this.hitsound = 'standard';

        this.x = randomInRange(0 + this.radius, CANVAS.width - this.radius);
        this.y = - this.radius;
    }

    takeDamage(damage) {
        this.hp -= damage;
    }

    pushBack() {
        this.y -= randomInRange(3, 7);
    }

    // All enemies have a steps variable in parallel with y.
    // Shooting time and some types of movement (such as sinewave) rely on steps.
    // Steps is incremented by the move() method.
    step() {
        this.steps++;
        if (this.steps % this.firingrate === 0 && !game.state.variables.muteenemies)
            this.shoot()
    }

    // Release scoreballs when killed.
    // Some enemies & bosses have extra behaviour for this method.
    die() {
        // SCOREBALLS
        for(let i = 0; i < this.scoreballs; i++) {
            game.scorecontroller.incrementScore();
            game.scorecontroller.checkPlayerScore();
            if ( i < 10)    // to prevent ugly effect when scoreballs number becomes too high
                game.scoreballs.add(new Scoreball(this.x + randomInRange(-80, 80), this.y + randomInRange(-80, 80)));
        }
        
        // PARASITES UPGRADE
        if (game.enemies.enemiesOnScreen() && game.state.variables.parasites)
            for(let i = 0; i < game.state.variables.parasitesnumber; i++)
                game.bluelasers.add(new Parasites(this.x + randomInRange(-40, 40), this.y + randomInRange(-40, 40), this))
    }
}