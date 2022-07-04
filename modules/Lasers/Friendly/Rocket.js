import { game } from "../../../app.js";
import { ROCKETSPRITE } from "../../Assets/Lasers.js";
import { Boom } from "../../Graphics/Effects/Boom.js";
import { BlueLaser } from "./BlueLaser.js";

export class Rocket extends BlueLaser {
    constructor(x, y, direction) {
        super(x, y, direction)
        this.sprite = [ROCKETSPRITE];
        this.damage *= game.state.variables.rocketdamage;
    }

    // rocket will shatter when hitting an enemy
    shatter() {
        this.shattered = true;
        game.particles.add(new Boom(this.x, this.y, 'exp'));
    }
}