import { game } from "../../app.js";

export class Buffs {
    static _quaddamage() {
        game.buffcontroller.text = `QUAD-DAMAGE !`;
        game.state.variables.quaddamage = true;

        const fn = ()=> game.state.variables.quaddamage = false;
        game.buffcontroller.setTimer(fn);
    }

    static _invincibility() {
        game.buffcontroller.text = `INVINCIBILITY !`;
        game.state.variables.invincibility = true;
        const fn = () => game.state.variables.invincibility = false;
        game.buffcontroller.setTimer(fn);
    }

    static _mute() {
        game.buffcontroller.text = `YOU'RE MUTED !`;
        game.state.variables.mute = true;
        const fn = () => game.state.variables.mute = false
        game.buffcontroller.setTimer(fn);
    }

    static _noshield() {
        game.buffcontroller.text = `SHIELD DOWN !`;
        game.state.variables.noshield = true;
        game.player.shield.deplete();
        const fn = () => game.state.variables.noshield = false
        game.buffcontroller.setTimer(fn);
    }

    static _muteenemies() {
        game.buffcontroller.text = `ENEMIES MUTED !`;
        game.state.variables.muteenemies = true;
        const fn = () => game.state.variables.muteenemies = false;
        game.buffcontroller.setTimer(fn);
    }

    static _noslowmo() {
        game.buffcontroller.text = `NO SLOW-MO !`;
        game.state.variables.noslowmo = true;
        const fn = () => game.state.variables.noslowmo = false;
        game.buffcontroller.setTimer(fn);
    }
}