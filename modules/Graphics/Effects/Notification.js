// Note: Notifications are considered Particles and added to the ParticlePool
// They don't have specific pools

export class Notification {
    constructor(x, y, sprite, duration) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.duration = duration;
    }

    tick() { // Notifications don't have a move() function, so tick is being used instead to decrease duration
        this.duration --;
    }
}