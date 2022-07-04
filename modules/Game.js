import { Scene } from "./Graphics/Scene.js";
import { Controls } from "./Logic/Motion/Controls.js";
import { Player } from "./Actors/Player/Player.js";
import { LaserPool } from "./Lasers/LaserPool.js";
import { EnemyPool } from "./Actors/Enemies/EnemyPool.js";
import { DamageNumberPool } from "./Graphics/Effects/DamageNumberPool.js";
import { ScoreballPool } from "./Graphics/Effects/ScoreballPool.js";
import { ParticlePool } from "./Graphics/Effects/ParticlePool.js";
import { GameState } from "./Logic/State/GameState.js";
import { AudioController } from "./Logic/Controllers/AudioController.js";
import { ScoreController } from "./Logic/Controllers/ScoreController.js";
import { EnemyController } from "./Logic/Controllers/EnemyController.js";
import { ItemController } from "./Logic/Controllers/ItemController.js";
import { BuffController } from "./Logic/Controllers/BuffController.js";

export class Game {
    constructor() {
        this.scene = new Scene();

        // ENTITIES
        this.player = new Player();
        this.enemies = new EnemyPool();
        this.bluelasers = new LaserPool();
        this.firelasers = new LaserPool();
        this.itemcontroller = new ItemController();
        this.buffcontroller = new BuffController();

        // EFFECTS
        this.particles = new ParticlePool();
        this.damagenumbers = new DamageNumberPool()
        this.scoreballs = new ScoreballPool();

        // LOGIC CONTROLLERS
        this.state = new GameState();
        this.controls = new Controls();
        this.audiocontroller = new AudioController();
        this.scorecontroller = new ScoreController();
        this.enemycontroller = new EnemyController();
    }

    draw() {
        this.scene.drawBackground();
        this.scene.drawPlayer();
        this.scene.drawEnemies();
        this.scene.drawBlueLasers();
        this.scene.drawEntity(this.firelasers.liveLasers);
        this.scene.drawEntity(this.particles.liveParticles)
        this.scene.drawEntity(this.damagenumbers.liveNumbers)
        this.scene.drawEntity(this.scoreballs.liveScoreballs)
        if (!this.state.time) this.scene.drawMenu();
        else this.scene.drawHud();
    }

    move() {
        this.enemies.move();
        this.bluelasers.move();
        this.firelasers.move();
        this.particles.tick();
        this.damagenumbers.move();
        this.scoreballs.move();
    }

    refresh() {
        this.enemies.refresh();
        this.bluelasers.refresh();
        this.firelasers.refresh();
        this.particles.refresh();
        this.damagenumbers.refresh();
        this.scoreballs.refresh();
    }
}