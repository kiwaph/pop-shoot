// ITEMS ARE DROPPED BY RED PACKAGES

import { game } from "../../../app.js";
import { Notification } from "../../Graphics/Effects/Notification.js";
import { randomInRange } from "../Helpers.js";
import { Items } from "../../Drops/Items.js";

import {
    BOMBS_NOTIFICATION, CLOCK_NOTIFICATION, DAMAGE_NOTIFICATION, BOMBS_PAUSE, CLOCK_PAUSE, DAMAGE_PAUSE,
    EMP_PAUSE, LOOPERS_PAUSE, METALSHIELD_PAUSE, NITROGEN_PAUSE,
    PIERCERS_PAUSE, ROCKET_PAUSE, SEEKERS_PAUSE, SPRAY_PAUSE, TIMEFREEZE_PAUSE, URANIUM_PAUSE,
    EMP_NOTIFICATION, BOMBS_ICON, CLOCK_ICON,
    DAMAGE_ICON, EMP_ICON, LOOPERS_ICON, METALSHIELD_ICON,
    NITROGEN_ICON, PIERCERS_ICON, ROCKET_ICON, SEEKERS_ICON, SPRAY_ICON, TIMEFREEZE_ICON, URANIUM_ICON,
    LOOPERS_NOTIFICATION, METALSHIELD_NOTIFICATION, NITROGEN_NOTIFICATION, PIERCERS_NOTIFICATION,
    ROCKET_NOTIFICATION, SEEKERS_NOTIFICATION, SPRAY_NOTIFICATION, TIMEFREEZE_NOTIFICATION,
    URANIUM_NOTIFICATION, GREED_ICON, GREED_PAUSE, GREED_NOTIFICATION, MACHINEGUN_ICON, MACHINEGUN_PAUSE,
    MACHINEGUN_NOTIFICATION, TOXIC_ICON, TOXIC_NOTIFICATION, TOXIC_PAUSE, PARASITES_ICON, PARASITES_NOTIFICATION,
    PARASITES_PAUSE
    } from "../../Assets/Hud.js";

const DRAWINGS = 
{
    piercers:      { icon: PIERCERS_ICON,      pause: PIERCERS_PAUSE,      notification: PIERCERS_NOTIFICATION },
    bomb:          { icon: BOMBS_ICON,         pause: BOMBS_PAUSE,         notification: BOMBS_NOTIFICATION },
    parasites:     { icon: PARASITES_ICON,     pause: PARASITES_PAUSE,     notification: PARASITES_NOTIFICATION },
    toxic:         { icon: TOXIC_ICON,         pause: TOXIC_PAUSE,         notification: TOXIC_NOTIFICATION },
    machinegun:    { icon: MACHINEGUN_ICON,    pause: MACHINEGUN_PAUSE,    notification: MACHINEGUN_NOTIFICATION },
    greed:         { icon: GREED_ICON,         pause: GREED_PAUSE,         notification: GREED_NOTIFICATION },
    loopers:       { icon: LOOPERS_ICON,       pause: LOOPERS_PAUSE,       notification: LOOPERS_NOTIFICATION },
    uranium:       { icon: URANIUM_ICON,       pause: URANIUM_PAUSE,       notification: URANIUM_NOTIFICATION },
    timefreeze:    { icon: TIMEFREEZE_ICON,    pause: TIMEFREEZE_PAUSE,    notification: TIMEFREEZE_NOTIFICATION },
    emp:           { icon: EMP_ICON,           pause: EMP_PAUSE,           notification: EMP_NOTIFICATION },
    damage:        { icon: DAMAGE_ICON,        pause: DAMAGE_PAUSE,        notification: DAMAGE_NOTIFICATION },
    spray:         { icon: SPRAY_ICON,         pause: SPRAY_PAUSE,         notification: SPRAY_NOTIFICATION },
    metalshield:   { icon: METALSHIELD_ICON,   pause: METALSHIELD_PAUSE,   notification: METALSHIELD_NOTIFICATION },
    nitrogen:      { icon: NITROGEN_ICON,      pause: NITROGEN_PAUSE,      notification: NITROGEN_NOTIFICATION },
    rocket:        { icon: ROCKET_ICON,        pause: ROCKET_PAUSE,        notification: ROCKET_NOTIFICATION },
    seekers:       { icon: SEEKERS_ICON,       pause: SEEKERS_PAUSE,       notification: SEEKERS_NOTIFICATION },
    clock:         { icon: CLOCK_ICON,         pause: CLOCK_PAUSE,         notification: CLOCK_NOTIFICATION },
}

const NOTIFICATIONX = 860;
const NOTIFICATIONY = 35;

// DROP RATES
const RATERARE = 10;
const RATECOMMON = 75;

export class ItemController {
    constructor() {
        this.icons = [];
        this.descriptions = [];

        this.pool1 = [ Items._loopers, Items._piercers, Items._bomb];
        this.pool2 = [ Items._uraniumfuel, Items._timefreeze ];
        this.pool3 = [ Items._clock, Items._greed ];
        this.pool4 = [ Items._emp, Items._metalshield ];

        this.randompool1 = this.pool1[randomInRange(0, this.pool1.length - 1)];
        this.randompool2 = this.pool2[randomInRange(0, this.pool2.length -1)];
        this.randompool3 = this.pool3[randomInRange(0, this.pool3.length -1)];
        this.randompool4 = this.pool4[randomInRange(0, this.pool4.length -1)];

        this.repetitive =   [ Items._multiplydamage, Items._spray ];
        this.common =       [ this.randompool4, this.randompool1, Items._parasites, Items._toxic, Items._machinegun, Items._rocket, Items._seekers, Items._nitrogen, this.randompool2 ]
        this.rare =         [ this.randompool3 ];
    }

    drop() {
        const roll = randomInRange(0, 100);
        const isRareEmpty = !this.rare.length;
        const isCommonEmpty = !this.common.length;

        if (roll <= RATERARE && !isRareEmpty) {
            const rand = randomInRange(0, this.rare.length - 1);
            this.rare[rand]();
            this.rare.splice(rand, 1)
        }
        else if (roll <= RATECOMMON && !isCommonEmpty) {
                const rand = randomInRange(0, this.common.length - 1);
                this.common[rand]();
                this.common.splice(rand, 1)
            }
        else {
                const rand = randomInRange(0, this.repetitive.length - 1);
                this.repetitive[rand]();
            }
    }

    drawIcon(type) {
        this.icons.push(DRAWINGS[type].icon)
    }

    drawNotification(type) {
        game.particles.add(new Notification(NOTIFICATIONX, NOTIFICATIONY, DRAWINGS[type].notification, 400));
    }

    drawPauseDescription(type) {
        this.descriptions.push(DRAWINGS[type].pause);
    }
}
