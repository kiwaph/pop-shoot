import { game } from "../../app.js";
import { randomInRange } from "../Logic/Helpers.js";

export class Items {
    static _piercers() {
        // Action
        game.state.variables.piercers = true;
    
        // Graphics
        game.itemcontroller.drawNotification('piercers');
        game.itemcontroller.drawIcon('piercers');
        game.itemcontroller.drawPauseDescription('piercers');
    }
    
    static _bomb() {
        // Action
        game.state.variables.bomb = true;
    
        // Graphics
        game.itemcontroller.drawNotification('bomb');
        game.itemcontroller.drawIcon('bomb');
        game.itemcontroller.drawPauseDescription('bomb');
    }

    static _machinegun() {
        // Action
        game.state.variables.machinegun = true;
    
        // Graphics
        game.itemcontroller.drawNotification('machinegun');
        game.itemcontroller.drawIcon('machinegun');
        game.itemcontroller.drawPauseDescription('machinegun');
    }
    
    static _loopers() {
        // Action
        game.state.variables.loopers = true;
    
        // Graphics
        game.itemcontroller.drawNotification('loopers');
        game.itemcontroller.drawIcon('loopers');
        game.itemcontroller.drawPauseDescription('loopers');
    }
    
    static _rocket() {
        // Action
        game.state.variables.rocket = true;
    
        // Graphics
        game.itemcontroller.drawNotification('rocket');
        game.itemcontroller.drawIcon('rocket');
        game.itemcontroller.drawPauseDescription('rocket');
    }
    
    static _seekers() {
        // Action
        game.state.variables.seekers = true;
    
        // Graphics
        game.itemcontroller.drawNotification('seekers');
        game.itemcontroller.drawIcon('seekers');
        game.itemcontroller.drawPauseDescription('seekers');
    }
    
    static _timefreeze() {
        // Action
        game.state.variables.slowmorate = 0.05;
    
        // Graphics
        game.itemcontroller.drawNotification('timefreeze');
        game.itemcontroller.drawIcon('timefreeze');
        game.itemcontroller.drawPauseDescription('timefreeze');
    }
    
    static _uraniumfuel() {
        // Action
        game.state.variables.uranium = true;
    
        // Graphics
        game.itemcontroller.drawNotification('uranium');
        game.itemcontroller.drawIcon('uranium');
        game.itemcontroller.drawPauseDescription('uranium');
    }
    
    static _nitrogen() {
        // Action
        game.state.variables.nitrogen = true;
    
        // Graphics
        game.itemcontroller.drawNotification('nitrogen');
        game.itemcontroller.drawIcon('nitrogen');
        game.itemcontroller.drawPauseDescription('nitrogen');
    }
    
    
    static _metalshield() {
        // Action
        game.state.variables.metalshield = true;
    
        // Graphics
        game.itemcontroller.drawNotification('metalshield');
        game.itemcontroller.drawIcon('metalshield');
        game.itemcontroller.drawPauseDescription('metalshield');
    }
    
    static _emp() {
        // Action
        game.state.variables.emp = true;
        
        // Graphics
        game.itemcontroller.drawNotification('emp');
        game.itemcontroller.drawIcon('emp');
        game.itemcontroller.drawPauseDescription('emp');
    }

    static _greed() {
        // Action
        game.state.variables.greed = true;
        
        // Graphics
        game.itemcontroller.drawNotification('greed');
        game.itemcontroller.drawIcon('greed');
        game.itemcontroller.drawPauseDescription('greed');
    }

    static _parasites() {
        // Action
        game.state.variables.parasites = true;
        
        // Graphics
        game.itemcontroller.drawNotification('parasites');
        game.itemcontroller.drawIcon('parasites');
        game.itemcontroller.drawPauseDescription('parasites');
    }

    static _toxic() {
        // Action
        game.state.variables.toxic = true;

        setInterval(()=> {
            if (game.state.slowmo && game.state.variables.toxic)
                game.enemies.damageAll(randomInRange(2,6) * game.state.variables.damageMultiplier * game.state.variables.toxicrate);
        }, 500)
        
        // Graphics
        game.itemcontroller.drawNotification('toxic');
        game.itemcontroller.drawIcon('toxic');
        game.itemcontroller.drawPauseDescription('toxic');
    }
    
    static _clock() {
        // Action
        game.player.clock.owned = true;
    
        // Graphics
        game.state.variables.clockIconPosition = game.itemcontroller.icons.length; // Get icon position
        game.itemcontroller.drawNotification('clock');
        game.itemcontroller.drawIcon('clock');
        game.itemcontroller.drawPauseDescription('clock');
    }
    
    static _multiplydamage() {
        // Graphics
        // If statement executes the first time the upgrade is acquired
        if (game.state.variables.dmgMultiplier === 1) {
            game.state.variables.dmgIconPosition = game.itemcontroller.icons.length; // Get icon position
            game.itemcontroller.drawIcon('damage');
            game.itemcontroller.drawPauseDescription('damage');
        }
        game.itemcontroller.drawNotification('damage');
    
        // Action
        game.state.variables.incrementDamageMultiplier()
    }
    
    static _spray() {
        // Graphics
        // If statement executes the first time the upgrade is acquired
        if (game.state.variables.spray === 0) {
            game.state.variables.sprayIconPosition = game.itemcontroller.icons.length; // Get icon position
            game.itemcontroller.drawIcon('spray');
            game.itemcontroller.drawPauseDescription('spray');
        }
        game.itemcontroller.drawNotification('spray');
    
        // Action
        game.state.variables.spray++;
    }
}