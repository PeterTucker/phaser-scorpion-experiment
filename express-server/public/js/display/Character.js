import Spear from '../display/weapons/Spear.js';

export default class Character {
    constructor(_scene) {
        this.scene = _scene;
        this.anchor = this.scene.matter.add.image(0, 0, "blue", null, {
            collisionFilter: {
                category:2,
                mask: 0x0002,
                group: -1
            }
        });
        this.bringTo = false; // variable that says if character to move towards object when spear is thrown
        this.anchor.setStatic(true);

        this.create();
    }

    create() {
        this.sprite = this.scene.physics.add.image(stageWidth / 2, stageHeight / 2, "scorpion", null);
        this.sprite.setCollideWorldBounds(true);
        
        this.sprite.classRef = this;
        this.sprite.body.classRef = this;

        this.spear = new Spear(this.scene, this, { x: stageWidth / 2, y: 100, segments: 10 });
        this.createSpearArea(this.spear)

        // this.sprite.setStatic(true)

    }

    createSpearArea(_spear) {
        this.spearAreaRadius = _spear.segments[0].displayWidth * _spear.segments.length + _spear.spear.displayWidth/2;

        this.spearAreaGPX = this.scene.add.graphics();
        this.spearAreaGPX.fillStyle(0xFF0000, .1);
        this.spearAreaGPX.fillCircle(0, 0, (this.spearAreaRadius));

        this.spearArea = new Phaser.Geom.Circle(this.spearAreaGPX.x, this.spearAreaGPX.y, this.spearAreaRadius);
    }

    update() {
        if(!this.bringTo){
            this.anchor.x = 
            this.spearArea.x = this.spearAreaGPX.x = this.sprite.x;
            this.anchor.y = 
            this.spearArea.y = this.spearAreaGPX.y = this.sprite.y;
        }
        this.spear.update();


    }
}