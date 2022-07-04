import { game } from "../../../app.js";
import {
    PARTICLE0SPRITE, PARTICLE1SPRITE, PARTICLE2SPRITE, PARTICLE3SPRITE,
    PARTICLEQUAD0SPRITE, PARTICLEQUAD1SPRITE, PARTICLEQUAD2SPRITE, PARTICLEQUAD3SPRITE
    } from "../../Assets/Effects.js";
import { randomInRange } from "../../Logic/Helpers.js";

const DURATION = 5; // When DURATION reaches 0, the particle will be removed by refresh()
const SPRITE = [
    [ PARTICLE0SPRITE, PARTICLE1SPRITE, PARTICLE2SPRITE, PARTICLE3SPRITE],
    [ PARTICLEQUAD0SPRITE, PARTICLEQUAD1SPRITE, PARTICLEQUAD2SPRITE, PARTICLEQUAD3SPRITE]
]

export class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.duration = DURATION;
        this.sprite = (game.state.variables.quaddamage) ? SPRITE[1][randomInRange(0, 3)] : SPRITE[0][randomInRange(0, 3)];
    }

    tick() { // Particles don't have a move() function, so tick is being used instead to decrease duration
        this.duration --;
    }
}