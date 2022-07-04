import { game } from "../../../app.js";
import { CANVAS } from "../../Assets/OtherGfx.js";

const PAUSEBUTTON = 'Space';

export class Controls {
    constructor() {
        this.addMouseMove();
        this.addMouseClicks();
        this.addPauseButton();
        this.disableRightClickMenu();
        this.shootInterval;
    }

    addMouseMove() {
        CANVAS.addEventListener('mousemove', (evt) => {
            game.player.x = evt.clientX;
            game.player.y = evt.clientY;
        })
    }
    
    addMouseClicks() {
        CANVAS.addEventListener('mousedown',this._mouseClicks)      // Left & right click
        CANVAS.addEventListener('mouseup', this._mouseClicksRelease) // Left & right click release
    }

    removeMouseClicks() {
        CANVAS.removeEventListener('mousedown',this._mouseClicks)       // Left & right click
    }

    addPauseButton() {
        document.addEventListener('keydown', this._pauseButton)
    }

    disableRightClickMenu() {
        CANVAS.addEventListener('contextmenu', (evt) => { evt.preventDefault(); })
    }

    // Functions that are bound to event listeners.
    // Event listeners can't be removed if using anonymous functions.
    _mouseClicks(evt) {
        if (evt.button === 0) { // Left click
            game.player.unsetShoot();   // unset first in case stuck to autoshooting by accident
            game.player.setShoot();
            if (!game.state.time) game.state.startGame();
        }
        if (evt.button === 2) // Right click
            game.state.startSlowmo(); 
    }

    _mouseClicksRelease(evt) {
        if (evt.button === 0)   // Left click release
        game.player.unsetShoot();

        if (evt.button === 2)   // Right click release
            game.state.stopSlowmo();
    }

    _pauseButton(evt) {
        if (evt.code === PAUSEBUTTON) {
            if (!game.state.over) game.state.togglePause();
            else game.state.replay();
        }
            
    }
}