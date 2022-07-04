import { game } from "../../../app.js";
import {
    FLAME0SPRITE, FLAME1SPRITE, FLAME2SPRITE, FLAME3SPRITE, FLAME4SPRITE, FLAME5SPRITE,
    FLAME6SPRITE, FLAME7SPRITE, FLAME8SPRITE, FLAME9SPRITE, FLAME10SPRITE, FLAME11SPRITE
    } from "../../Assets/Player.js";
import { randomInRange } from "../../Logic/Helpers.js";

const SPRITE = [FLAME0SPRITE, FLAME1SPRITE, FLAME2SPRITE, FLAME3SPRITE, FLAME4SPRITE,
FLAME5SPRITE, FLAME6SPRITE, FLAME7SPRITE, FLAME8SPRITE, FLAME9SPRITE, FLAME10SPRITE, FLAME11SPRITE]

const SPRITECHANGESPEED = 100; // 100 is the perfect speed. Preferably not to change

export class Flame {
    constructor() {
        this.yOffset = 16;
        this.sprite = FLAME0SPRITE;
        this.spriteChanger = setInterval(() => {
            this.sprite = SPRITE[randomInRange(0, 11)]
        }, SPRITECHANGESPEED);;
    }

    get x() {
        return game.player.x;
    }

    get y() {
        return (game.player.y + 6) + this.yOffset;
    }

    move() {
        this.yOffset = game.player.slowmogauge.charge * 0.16;
    }

    toggleSpriteSpeed() {
        clearInterval(this.spriteChanger);
        let speed = SPRITECHANGESPEED;

        if (game.state.slowmo)
            speed = 300;

        this.spriteChanger = setInterval(() => {
            this.sprite = SPRITE[randomInRange(0, 11)]
        }, speed);
    }
}