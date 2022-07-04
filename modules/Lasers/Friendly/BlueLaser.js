import { Movement } from "../../Logic/Motion/Movement.js";
import { game } from "../../../app.js";
import { CANVAS } from "../../Assets/OtherGfx.js";
import { Boom } from "../../Graphics/Effects/Boom.js";
import { randomInRange } from "../../Logic/Helpers.js";
import { BOMBSPRITE, LASERSPRITE, PIERCERSPRITE, QUADSPRITE } from "../../Assets/Lasers.js";

const SPEED = 10;
const RADIUS = 5;
const MINDMG = 3;
const MAXDMG = 6;
const DEFAULTDIRECTION = 270 // Angle (0=EAST 90=South 180=WEST 270=NORTH)

export class BlueLaser {
    constructor(x, y, direction = DEFAULTDIRECTION) {
        this.x = x;
        this.y = y;
        this.radius = RADIUS;
        this.sprite = [ LASERSPRITE ];
        
        this.damage = randomInRange(MINDMG, MAXDMG) * game.state.variables.damageMultiplier;
        this.speed = SPEED;
        this.direction = direction;
        
        this.shattered = false;
        this.alreadyLooped = false;

        this.setSprite();

        // When piercers is upgraded, keep track of pierced enemies
        // to avoid hitting them over and over again
        this.piercedEnemies = [];
    }

    move() {
        if (game.state.variables.loopers && this.y <= 10 && !this.alreadyLooped) {
            this.y = CANVAS.height
            this.alreadyLooped = true;
        }

        this.x += Movement.move(this.direction, this.speed).x;
        this.y += Movement.move(this.direction, this.speed).y;
    }

    setSprite() {
        if (game.state.variables.piercers)
            this.sprite.push(PIERCERSPRITE);
        if (game.state.variables.bomb)
            this.sprite.push(BOMBSPRITE);
        if (game.state.variables.quaddamage)
            this.sprite.unshift(QUADSPRITE);
    }

    // laser will shatter when hitting an enemy if piercers is not upgraded
    shatter() {
        this.shattered = true;
        game.particles.add(new Boom(this.x, this.y, 'smokesmall'));
    }
}