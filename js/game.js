// Main Menu Scene
class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        // Load assets for main menu if needed
    }

    create() {
        this.add.text(400, 300, 'Press SPACE to Start', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });
    }
}

// Game Scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Load assets
        this.load.image('car', '/img/car.png'); // Ensure correct path
        this.load.image('track', '/img/track.png'); // Ensure correct path
    }

    create() {
        // Debugging: check if assets are loaded correctly
        console.log('Creating GameScene');

        // Add track
        this.add.image(400, 300, 'track');

        // Add car
        this.car = this.physics.add.sprite(400, 300, 'car');
        this.car.setCollideWorldBounds(true);

        // Cursor keys for controlling the car
        this.cursors = this.input.keyboard.createCursorKeys();

        // Pause functionality
        this.input.keyboard.on('keydown-P', () => {
            this.scene.pause();
            this.scene.launch('PauseMenuScene');
        });
    }

    update() {
        if (this.cursors.left.isDown) {
            this.car.setAngularVelocity(-150);
        } else if (this.cursors.right.isDown) {
            this.car.setAngularVelocity(150);
        } else {
            this.car.setAngularVelocity(0);
        }

        if (this.cursors.up.isDown) {
            this.physics.velocityFromRotation(this.car.rotation, 200, this.car.body.velocity);
        } else {
            this.car.setVelocity(0);
        }
    }
}


// Pause Menu Scene
class PauseMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseMenuScene' });
    }

    create() {
        this.add.text(400, 300, 'Paused\nPress R to Resume', { fontSize: '32px', fill: '#FFF', align: 'center' }).setOrigin(0.5);
        this.input.keyboard.on('keydown-R', () => {
            this.scene.stop();
            this.scene.resume('GameScene');
        });
    }
}

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    parent: 'game-container',
    scene: [MainMenuScene, GameScene, PauseMenuScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};


// Initialize Phaser game
const game = new Phaser.Game(config);