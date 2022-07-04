import { CANVAS } from "../Assets/OtherGfx.js";
import { game } from "../../app.js";

export class LaserPool {
    constructor() {
        this.liveLasers = [];
    }

    add(laser) {
        this.liveLasers.push(laser);
        if (game.state.slowmo)
            laser.speed *= game.state.variables.slowmorate;
    }

    clear() {
        this.liveLasers.forEach(laser => laser.shatter());
    }

    move() {
        if (!game.player.clock.active)
            this.liveLasers.forEach(laser => laser.move());
    }

    // Only keep lasers that are not shattered and still on-screen
    refresh() {
        this.liveLasers = this.liveLasers.filter(laser => laser.y >= 0 && laser.y <= CANVAS.height && !laser.shattered);
    }
}