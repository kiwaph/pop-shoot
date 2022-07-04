import { game } from "../../../app.js";
import { BlueLaser } from "../../Lasers/Friendly/BlueLaser.js";
import { PLAYERSPRITE } from "../../Assets/Player.js";
import { Shield } from "./Shield.js";
import { Flame } from "./Flame.js";
import { closestEnemyTo, randomInRange } from "../../Logic/Helpers.js";
import { Rocket } from "../../Lasers/Friendly/Rocket.js";
import { Seeker } from "../../Lasers/Friendly/Seeker.js";
import { Clock } from "../../Drops/Clock.js";
import { SlowmoGauge } from "./SlowmoGauge.js";

const SPRAYDISTANCE = 5;    // Distance between laser streams when spray upgrade is acquired
const LASERANGLE = 270;     // Default laser direction. 270 = NORTH
const RADIUS = 13;
const DEFAULTSHOOTINGRATE = 150 // Default shooting rate (speed) if not upgraded to machine gun

export class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.radius = RADIUS;
        this.sprite = PLAYERSPRITE;

        this.flame = new Flame();
        this.slowmogauge = new SlowmoGauge();
        this.shield = new Shield();
        this.clock = new Clock();
    }

    shoot() {
        if (!game.state.variables.mute && !this.clock.active) {
            
            // Play Audio
            game.audiocontroller.playLaserSound();
            
            // Roll a dice to calculate rocket spawn chance
            const rocketroll = randomInRange(0, 100);
            
            // Select appropriate weapon
            let weapon;
            if (game.state.variables.rocket && rocketroll < game.state.variables.rocketchance)
                weapon = Rocket;
            else
                weapon = BlueLaser

            // In case the spray number is even, skew the laser's angle by 2.5 degrees
            let direction = (game.state.variables.spray % 2) ? LASERANGLE - 2.5 : LASERANGLE;

            // Fire the first laser
            game.bluelasers.add(new weapon(this.x, this.y, direction));

            // Calculate the sprays directions & fire them
            let spraycount = 1;
            for (let i = 0; i < game.state.variables.spray; i++) {
                if (i % 2) {
                    // add spray left
                    game.bluelasers.add(new weapon(this.x, this.y, direction - SPRAYDISTANCE * spraycount));
                    spraycount++;
                }
                else
                    // add spray right
                    game.bluelasers.add(new weapon(this.x, this.y, direction + SPRAYDISTANCE * spraycount));
            }

            // Seekers
            if (game.enemies.enemiesOnScreen() && game.state.variables.seekers)
                game.bluelasers.add(new Seeker(this.x, this.y, closestEnemyTo(this)))
        }
    }

    setShoot() {
        const rate = (game.state.variables.machinegun) ? game.state.variables.machinegunrate : DEFAULTSHOOTINGRATE;
        this.shoot();
        this.shootInterval = setInterval(this.shoot.bind(this), rate);
    }

    unsetShoot() {
        clearInterval(this.shootInterval);
    }
}