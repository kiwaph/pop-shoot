export class ParticlePool {
    constructor() {
        this.liveParticles = [];
    }

    add(particle) {
        this.liveParticles.push(particle);
    }

    tick() {
        this.liveParticles.forEach(particle => particle.tick());
    }

    // Only keep particles which duration have not yet reached 0
    refresh() {
        this.liveParticles = this.liveParticles.filter(particle => particle.duration > 0);
    }
}