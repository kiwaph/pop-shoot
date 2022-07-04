import { game } from "../../../app.js";

// Default Slowmo rate
const SLOWMORATE = 0.2;

// UPGRADES MODIFIERS
const NITROGENRATE = 2;     // How much faster should shield recharge. (Default: 1)
const URANIUMRATE = 2;      // How much slower should shield discharge. (Default: 1)
const EMPRATE = 0.25;         // Multiplier to damage dealt to enemies when hit
const METALSHIELDTIME = 2;  // Invincibility time after being hit. In seconds (Default: 1)
const BOMBRATE = 0.25;       // Damage rate dealt to other enemies on screen (1 = full damage)
const TOXICRATE = 0.25;      // Damage rate dealt enemies in slowmo (1 = full damage)
const ROCKETCHANCE = 15;    // Percentage chance of firing a rocket
const ROCKETDAMAGE = 2;     // Rocket damage multiplier
const PARASITESRATE = 0.1;  // Damage rate dealt by parasites (1 = full damage)
const PARASITESNUMBER = 8;  // Number of parasites released
const MACHINEGUNRATE = 110; // Shooting rate of the machine gun. Lower = Faster. (default: 150)
const SEEKERRATE = 0.2;    // Damage rate dealt by seekers (1 = full damage);

export class GameVariables {
    constructor() {
        // Upgrades icons positions. Set by their respective functions by ItemController
        this.clockIconPosition;
        this.dmgIconPosition;
        this.sprayIconPosition;
        
        // LASER MODIFIERS
        this.piercers = false;
        this.loopers = false;
        this.seekers = false;
        this.bomb = false;
        this.rocket = false;
        this.machinegun = false;
        this.bombdamagerate = BOMBRATE;
        this.rocketchance = ROCKETCHANCE;
        this.rocketdamage = ROCKETDAMAGE;
        this.machinegunrate = MACHINEGUNRATE;
        this.seekerrate = SEEKERRATE;
        
        this.dmgMultiplier = 1;
        this.spray = 0;
        
        // SHIELD MODIFIERS
        this.metalshield = false;
        this.emp = false;
        this.nitrogen = false;
        this.uranium = false;
        this.metalshieldrate = METALSHIELDTIME;
        this.emprate = EMPRATE;
        this.nitrogenrate = NITROGENRATE;
        this.uraniumrate = URANIUMRATE;

        // SLOWMOTION RATE
        this.slowmorate = SLOWMORATE;

        // OTHER MODIFIERS
        this.parasites = false;
        this.greed = false;
        this.toxic = false;
        this.toxicrate = TOXICRATE;
        this.parasitesrate = PARASITESRATE;
        this.parasitesnumber = PARASITESNUMBER;

        // BUFFS
        this.invincibility = false;
        this.mute = false;
        this.noshield = false;
        this.quaddamage = false;
        this.muteenemies = false;
        this.noslowmo = false;
    }
   
    get damageMultiplier() {
            if (game.state.variables.quaddamage) return this.dmgMultiplier * 4;
            else return this.dmgMultiplier;
    }

    incrementDamageMultiplier() {
            this.dmgMultiplier += 1;
    }
}