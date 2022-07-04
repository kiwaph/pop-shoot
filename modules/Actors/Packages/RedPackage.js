// RED PACKAGES DROP ITEMS

import { Enemy } from "../Enemies/Enemy.js";
import { Movement } from "../../Logic/Motion/Movement.js";
import { game } from "../../../app.js";
import { Shake } from "../../Graphics/Effects/Shake.js";
import { Boom } from "../../Graphics/Effects/Boom.js";
import { REDPACKAGESPRITE } from "../../Assets/Enemies.js";

// MOVEMENT
const SPEED = 0.5;
const MOVEDIRECTION = 90;   // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// STATE
const HP = 150;
const SCOREBALLS = 0;
const RADIUS = 17;
const SPRITE = REDPACKAGESPRITE;

export class RedPackage extends Enemy {
    constructor() {
        super(RADIUS, HP, SCOREBALLS, SPRITE, SPEED);
        this.hitsound = 'metal';
        game.audiocontroller.playBeepSound();
    }

    move() {
        this.x += Movement.move(MOVEDIRECTION, this.speed).x;
        this.y += Movement.move(MOVEDIRECTION, this.speed).y;
    }
    
    die() {
        game.audiocontroller.playBoomSound('reload');
        game.particles.add(new Boom(this.x, this.y, 'exp'));
        game.itemcontroller.drop();
        Shake.addShake(4, 0.5);
    }
}