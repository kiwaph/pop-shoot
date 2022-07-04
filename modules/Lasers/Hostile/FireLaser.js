import { FIRELASERSPRITE } from "../../Assets/Lasers.js";
import { Movement } from "../../Logic/Motion/Movement.js";
import { Boom } from "../../Graphics/Effects/Boom.js"
import { game } from "../../../app.js"

const RADIUS = 5;
const SPRITE = FIRELASERSPRITE;

export class FireLaser {
    constructor(x, y, direction, speed) {
        this.x = x;
        this.y = y;
        this.radius = RADIUS;
        this.sprite = SPRITE;

        this.direction = direction;
        this.speed = speed;

        this.shattered = false;
    }

    move() {
        this.x += Movement.move(this.direction, this.speed).x;
        this.y += Movement.move(this.direction, this.speed).y;
    }

    // laser will shatter when hitting the player
    shatter() {
        this.shattered = true;
        game.particles.add(new Boom(this.x, this.y, 'smokesmall'));
    }
}