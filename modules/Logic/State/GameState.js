import { game, gameloop } from "../../../app.js";
import { ItemController } from "../Controllers/ItemController.js";
import { STAGE1SPRITE, STAGE2SPRITE, STAGE3SPRITE, STAGE4SPRITE, STAGE5SPRITE } from "../../Assets/Hud.js";
import { Notification } from "../../Graphics/Effects/Notification.js";
import { Shake } from "../../Graphics/Effects/Shake.js";
import { GameVariables } from "./GameVariables.js";
import { SlowMo } from "./SlowMo.js";
import { ScoreController } from "../Controllers/ScoreController.js";
import { flashScreen } from "../Helpers.js";
import { Clock } from "../../Drops/Clock.js";
import { BuffController } from "../Controllers/BuffController.js";

const STAGESPRITES = [STAGE1SPRITE, STAGE2SPRITE, STAGE3SPRITE, STAGE4SPRITE, STAGE5SPRITE]

export class GameState {
    constructor() {
        this.time = 0;
        this.stage = 0;

        this.slowmo = false;
        this.boss = false;

        this.paused = false;
        this.over = false;

        this.variables = new GameVariables();
    }

    // Set an interval to increment the game time by 1 every second.
    // Will not increment if the game is paused, or in game-over state.
    startGame() {
        this.time += 1;
        game.audiocontroller.playTrack('stage0');
        game.particles.add(new Notification(505, 80, STAGE1SPRITE, 300));
        setInterval(()=> {
            if (!this.paused && !this.over && !this.boss && !game.player.clock.active)
                this.time++;
            }, 1000)
    }

    startSlowmo() {
        if (!this.slowmo && !game.player.clock.active && !game.state.variables.noslowmo) {
            this.slowmo = true;
            SlowMo.start();
            game.audiocontroller.playTrack('slowmo');
        }
    }

    stopSlowmo() {
        // if statement to prevent from accidentally running the function several times
        if (this.slowmo) {
            this.slowmo = false;
            SlowMo.stop();
            if (this.boss) game.audiocontroller.playTrack(`boss${this.stage}`);
            if (!this.boss) game.audiocontroller.playTrack(`stage${this.stage}`);
        }
    }

    toggleBoss() {
        if (!this.boss) {
            Shake.addShake(6, 0.75);
            this.boss = true;
            game.audiocontroller.playTrack(`boss${this.stage}`)
        }
        else {
            this.time = (this.stage === 4) ? 1 : this.time + 1;
            this.stage = (this.stage === 4) ? 0 : this.stage + 1;
            this.boss = false;
            game.enemies.clear();
            game.firelasers.clear();
            game.bluelasers.clear();
            flashScreen();
            game.particles.add(new Notification(505, 80, STAGESPRITES[this.stage], 300));
            game.audiocontroller.playTrack(`stage${this.stage}`)
        }
    }

    togglePause() {
        // Only pause if game has started, or game is not on gameover screen
        if (this.time && !this.over) {
            if (!this.paused) {
                game.controls.removeMouseClicks();
                this.paused = true;
            }
            else {
                this.paused = false;
                game.controls.addMouseClicks();
                window.requestAnimationFrame(gameloop)
            }
        }
    }

    setGameOver() {
        this.stopSlowmo();
        this.over = true;
        game.controls.removeMouseClicks();
        game.audiocontroller.playTrack('gameover');
    }

    replay() {
        // CLEAR SCREEN
        game.enemies.clear(true);
        game.firelasers.clear();
        game.bluelasers.clear();
        
        // RESET GAME STATE
        this.time = 1;
        this.stage = 0;
        this.boss = false;
        this.over = false;
        game.state.variables = new GameVariables();

        // RESTORE CONTROLS
        game.controls.addMouseClicks();
        game.controls.addPauseButton();  
        
        // RESET PLAYER STATE
        game.player.shield.charge = 100;
        game.player.slowmogauge.charge = 100;
        game.player.clock = new Clock();
        game.itemcontroller = new ItemController();
        game.buffcontroller = new BuffController();
        game.scorecontroller = new ScoreController();

        // GRAPHICS
        flashScreen();
        game.particles.add(new Notification(505, 80, STAGE1SPRITE, 300));

        // AUDIO
        game.audiocontroller.rewind();
        game.audiocontroller.playTrack('stage0');

        window.requestAnimationFrame(gameloop);
    }
}