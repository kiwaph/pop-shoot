import { game } from "../../app.js"; 
import { DamageNumber } from "./Effects/DamageNumber.js";
import { SceneHelpers } from "./SceneHelpers.js";
import { convertedTime } from "../Logic/Helpers.js";
import { CANVAS, FOG, FOGGREEN, MENU, S0BACK, S0FRONT, S1BACK, S1FRONT, S2BACK, S2FRONT, S3BACK, S3FRONT, S4BACK, S4FRONT } from "../Assets/OtherGfx.js";
import { GAMEOVERGLASSSPRITE, GLASSBARSPRITE, GLASSLEFTSPRITE, GLASSRIGHTSPRITE, PAUSESPRITE, SHIELDDOWNSPRITE } from "../Assets/Hud.js";
import { INVINCIBILITYSPRITE } from "../Assets/Player.js";

// CANVAS
const CANVASWIDTH = 1000;
const RATIO = 16 / 9;

// DEFAULT DRAWING & FONT STYLES
const FILLSTYLE = '#FFFFFF';
const STROKESTYLE = '#FFFFFF';
const FONTSMALL = '20px thaleahfatmedium';
const FONTMEDIUM = '30px thaleahfatmedium';
const FONTLARGE =  '40px thaleahfatmedium'
const FONTXLARGE =  '60px thaleahfatmedium'

// BACKGROUNDS
const BACKGROUNDS = {
    stage0: { back: S0BACK, front: S0FRONT },
    stage1: { back: S1BACK, front: S1FRONT },
    stage2: { back: S2BACK, front: S2FRONT },
    stage3: { back: S3BACK, front: S3FRONT },
    stage4: { back: S4BACK, front: S4FRONT }
}

export class Scene {
    constructor() {
        // Canvas
        this.canvas = CANVAS;
        this.canvas.width = CANVASWIDTH;
        this.canvas.height = CANVASWIDTH / RATIO;
        this.ctx = this.canvas.getContext('2d');

        // Fill & Stroke styles
        this.ctx.fillStyle = FILLSTYLE;
        this.ctx.strokeStyle = STROKESTYLE;

        // Background offset is used to scroll the background for parallax effect
        this.backgroundScrollOffset = 0;

        // shake is set by the Shake class. Used for screen-shake effect
        this.shake = 0;
    }

    drawBackground() {
        this.backgroundback = BACKGROUNDS[`stage${game.state.stage}`].back;
        this.backgroundfront = BACKGROUNDS[`stage${game.state.stage}`].front;

        // Clear Canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Parallax effect. Stars
        this.ctx.drawImage(this.backgroundback, this.backgroundScrollOffset + this.shake, this.shake);
        this.ctx.drawImage(this.backgroundback, this.backgroundScrollOffset + this.backgroundback.width + this.shake, this.shake);

        // Front part of the background
        this.ctx.drawImage(this.backgroundfront, this.shake, this.shake);

        // Reset the offset in case the background reaches the end while scrolling
        if (this.backgroundScrollOffset <= - this.backgroundback.width)
            this.backgroundScrollOffset = 0;
        // Slow the stars & draw the fog during slowmo
        const fogtype = (game.state.variables.toxic) ? FOGGREEN : FOG;
        if (game.state.slowmo || !game.state.time || game.player.clock.active) {
            this.ctx.drawImage(fogtype, -this.backgroundScrollOffset - this.backgroundback.width, 0);
            this.ctx.drawImage(fogtype, -this.backgroundScrollOffset, 0);
            this.backgroundScrollOffset -= game.state.variables.slowmorate;
        }
        else this.backgroundScrollOffset -= 3;
    }

    drawPlayer() {
        // JET FLAME
        this.ctx.drawImage(game.player.flame.sprite, SceneHelpers.offsetCoordinates(game.player.flame).x, SceneHelpers.offsetCoordinates(game.player.flame).y);

        // PLAYER
        this.ctx.drawImage(game.player.sprite, SceneHelpers.offsetCoordinates(game.player).x, SceneHelpers.offsetCoordinates(game.player).y);

        // SHIELD
        if (game.player.shield.isCharged() && !game.state.variables.invincibility)
            game.player.shield.sprite.forEach(sprite => this.ctx.drawImage(sprite, SceneHelpers.offsetCoordinates(game.player).x, SceneHelpers.offsetCoordinates(game.player).y));
        if (game.state.variables.invincibility)
            this.ctx.drawImage(INVINCIBILITYSPRITE, SceneHelpers.offsetCoordinates(game.player).x, SceneHelpers.offsetCoordinates(game.player).y);
        
        // BUFFS
        if (game.state.variables.mute)
            SceneHelpers.drawText('X', game.player.x-5, game.player.y - 15, FONTSMALL);
        if (game.buffcontroller.seconds) {
            SceneHelpers.drawText(game.buffcontroller.text, 400, 440, FONTLARGE);
            SceneHelpers.drawText(`${game.buffcontroller.seconds} SECONDS REMAINING`, 385, 460, FONTMEDIUM);   
        }
    }   

    drawEnemies() {
        game.enemies.liveEnemies.forEach((enemy) => {
            // Get the remaining hitpoints ratio, to calcular the healthbar size
            const hitPercentage = enemy.hp / enemy.maxhp;

            // Healthbar to draw if normal enemy
            if (enemy.hp < enemy.maxhp && !enemy.name)
                SceneHelpers.drawBar(enemy.x - enemy.sprite.width / 2 , enemy.y - enemy.sprite.height / 1.25, enemy.sprite.width, 1.5, hitPercentage);
            // Healthbar to draw if boss
            if (enemy.name) {
                SceneHelpers.drawBigBar(7, 10, 296, 11, hitPercentage)
                SceneHelpers.drawText(enemy.name, 8, 40, FONTMEDIUM);
            }
            // Enemy sprite
            this.ctx.drawImage(enemy.sprite, SceneHelpers.offsetCoordinates(enemy).x, SceneHelpers.offsetCoordinates(enemy).y); 
        });
    }

    // FIRELASERS AND EFFECTS
    drawEntity(entity) {
        entity.forEach((entity) => {
            if (entity.constructor === DamageNumber)
                SceneHelpers.drawText(entity.text, entity.x, entity.y, FONTMEDIUM);
            else
                this.ctx.drawImage(entity.sprite, SceneHelpers.offsetCoordinates(entity).x, SceneHelpers.offsetCoordinates(entity).y);
        });
    }

    drawBlueLasers() {
        game.bluelasers.liveLasers.forEach((laser) => {
            laser.sprite.forEach(sprite => this.ctx.drawImage(sprite, SceneHelpers.offsetCoordinates(laser).x, SceneHelpers.offsetCoordinates(laser).y))
        })
    }

    drawMenu() {
        this.ctx.drawImage(MENU, 0, 0);
    }

    drawGameOver() {
        this.ctx.drawImage(GAMEOVERGLASSSPRITE, 320, 205);
        this.ctx.filter = 'drop-shadow(1px 1px 0 black)'
        SceneHelpers.drawText(`GAMEOVER !`, 370, 245, FONTXLARGE);
        SceneHelpers.drawText(`YOU SURVIVED ${convertedTime()} MINUTES`, 330, 270, FONTMEDIUM);
        SceneHelpers.drawText(`YOU DIED AT STAGE ${game.state.stage+1}`, 380, 290, FONTMEDIUM);
        SceneHelpers.drawText(`YOUR SCORE: ${game.scorecontroller.score}`, 405, 310, FONTMEDIUM);
        SceneHelpers.drawText(`PRESS SPACE TO REPLAY`, 355, 340, FONTMEDIUM);
        this.ctx.filter = 'none';
        
    }

    drawPause() {
        // PAUSE SPRITE
        this.ctx.drawImage(PAUSESPRITE, 360, 175);

        // ITEMS DESCRIPTIONS
        const numberOfRows = 4;
        const verticalGap = 50;
        const horizontalGap = 220;
        const startingX = 75;
        const startingY = 415;
        let x = startingX;
        let y = startingY;

        for (let i = 0; i < game.itemcontroller.descriptions.length; i++) {
            if (i % numberOfRows === 0) {
                x = startingX;
                y -= verticalGap;
            }
            this.ctx.drawImage(game.itemcontroller.descriptions[i], x, y)
            x += horizontalGap;
        }
    }

    drawHud() {
        // LEFT SIDE (SCORE)
        this.ctx.drawImage(GLASSLEFTSPRITE, 3, CANVAS.height - 30);
        SceneHelpers.drawText(`SCORE`, 12, CANVAS.height - 9, FONTMEDIUM);
        SceneHelpers.drawText(game.scorecontroller.score, 10, CANVAS.height - 34, FONTLARGE);

        // MIDDLE (UPGRADES)
        const dmgPos = game.state.variables.dmgIconPosition;
        const dmgStacked = game.state.variables.dmgMultiplier > 2;

        const sprayPos = game.state.variables.sprayIconPosition;
        const sprayStacked = game.state.variables.spray > 1;

        const clockPos = game.state.variables.clockIconPosition;
        const clockReady = game.player.clock.ready;
        const clockChargePositive = game.player.clock.currentCharge > 0;

        let drawPos = 150;
        const iconGap = 60;

        // This loop will draw the aquired upgrades icons.
        // In case of repetitive items or items with timers, check if additional
        // text should be drawn above the icon, and draw it.
        for (let i = 0; i < game.itemcontroller.icons.length; i++) {
            // Check if multiplydamage or spray is stacked, and check if clock is recharging
            if ( i === clockPos && !clockReady && clockChargePositive)    SceneHelpers.drawText(`${game.player.clock.currentCharge}`, drawPos+14, CANVAS.height - 78, FONTSMALL);
            if ( i === dmgPos && dmgStacked)         SceneHelpers.drawText(`x${game.state.variables.dmgMultiplier -1 }`, drawPos+15, CANVAS.height - 78, FONTSMALL);
            if ( i === sprayPos && sprayStacked)     SceneHelpers.drawText(`x${game.state.variables.spray }`, drawPos+15, CANVAS.height - 78, FONTSMALL);
            // Draw icon
            this.ctx.drawImage(game.itemcontroller.icons[i], drawPos, CANVAS.height - 75)
            drawPos += iconGap;
        }

        // NEXT-PACKAGE BAR
        this.ctx.drawImage(GLASSBARSPRITE, 295, CANVAS.height - 23)
        SceneHelpers.drawText(`NEXT PACKAGE`, 175, CANVAS.height - 11, FONTSMALL);
        SceneHelpers.drawBar(300, CANVAS.height - 18, 520, 6, game.scorecontroller.levelBarPercentage)

        // RIGHT SIDE (STAGE + TIME)
        this.ctx.drawImage(GLASSRIGHTSPRITE, CANVAS.width - 120, CANVAS.height - 30);
        SceneHelpers.drawText(`STAGE ${game.state.stage + 1}`, CANVAS.width - 105, CANVAS.height - 9, FONTMEDIUM);
        if (!game.state.boss)
            SceneHelpers.drawText(convertedTime(), CANVAS.width - 100, CANVAS.height - 34, FONTLARGE);
        else
            SceneHelpers.drawText(`BOSS FIGHT`, CANVAS.width - 100, CANVAS.height - 34, FONTSMALL);
        
        // TOP MIDDLE - SHIELD WARNING
        if (!game.player.shield.isCharged()) {
            this.ctx.drawImage(SHIELDDOWNSPRITE, 390, 5);
            SceneHelpers.drawText(`RECHARGING ${game.player.shield.getCharge()}%`, 440, 42, FONTSMALL);
        }
    }
}