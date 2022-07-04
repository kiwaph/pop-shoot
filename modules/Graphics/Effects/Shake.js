import { game } from "../../../app.js";
import { randomInRange } from "../../Logic/Helpers.js";

export class Shake {
    // duration in seconds
    static addShake(intensity, duration) {
        const shake = setInterval(() => game.scene.shake = randomInRange(-intensity, intensity), 16)

        setTimeout(()=> {
            game.scene.shake = 0;
            clearInterval(shake) }
            , duration * 1000)
    }
}