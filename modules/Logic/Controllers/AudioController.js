import { game } from "../../../app.js";
import { OrangePackage } from "../../Actors/Packages/OrangePackage.js";
import { RedPackage } from "../../Actors/Packages/RedPackage.js";
import {
    LASERSOUND, RELOADSOUND, SHIELDDOWNSOUND, SHIELDUPSOUND, MUSICS0, MUSICS1, MUSICS2, MUSICS3,
    MUSICBOSS0, MUSICBOSS1, MUSICBOSS2, MUSICSLOWMO, MUSICGAMEOVER, BOOMSTD, BOOMEXP, BOOMPHASE,
    BOOMSMOKE, BOOMPHEW, BOOMBIGEXP, BEEPSOUND, HITSOUND, HITQUADSOUND, HITMETALSOUND, MUSICCLOCK,
    MUSICBOSS3, MUSICBOSS4, MUSICS4, DIVERSOUND
    } from "../../Assets/Audio.js";

const MUSIC = {
    stage0: MUSICS0, stage1: MUSICS1, stage2: MUSICS2, stage3: MUSICS3, stage4: MUSICS4,
    boss0: MUSICBOSS0, boss1: MUSICBOSS1, boss2: MUSICBOSS2, boss3: MUSICBOSS3, boss4: MUSICBOSS4,
    slowmo: MUSICSLOWMO, gameover: MUSICGAMEOVER, clock: MUSICCLOCK
};

const BOOMS = {
    phase: BOOMPHASE, std: BOOMSTD, phew: BOOMPHEW, exp: BOOMEXP,
    smoke: BOOMSMOKE, expbig: BOOMBIGEXP, reload: RELOADSOUND
};

const HITSOUNDS = { standard: HITSOUND, quad: HITQUADSOUND, metal: HITMETALSOUND };

export class AudioController {
    constructor() {
        for (const key in MUSIC)
            MUSIC[key].loop = true;
    }

    rewind() {
        for (const key in MUSIC)
            MUSIC[key].currentTime = 0;
    }

    playTrack(track) {
        for (const key in MUSIC)
            if ( key === track)
                MUSIC[key].play();
            else
                MUSIC[key].pause();
    }

    playHitSound(enemy) {
        if (enemy.constructor === RedPackage || enemy.constructor === OrangePackage)
            HITSOUNDS['metal'].cloneNode(true).play();
        else if (game.state.variables.quaddamage) HITSOUNDS['quad'].cloneNode(true).play();
        else HITSOUNDS['standard'].cloneNode(true).play();
    }

    playBoomSound(type) {
        BOOMS[type].cloneNode(true).play()
    }

    playLaserSound() {
        LASERSOUND.cloneNode(true).play();
    }

    playBeepSound() {
        BEEPSOUND.play();
    }
    
    playShieldUpSound() {
        SHIELDUPSOUND.play();
    }

    playShieldDownSound() {
        SHIELDDOWNSOUND.play();
    }

    playDiverSound() {
        DIVERSOUND.play();
    }
}