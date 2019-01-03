import BaseScene from './BaseScene.js';

import Character from '../display/Character.js';

export default class MainScene extends BaseScene {
    constructor() {
        super({
            key: "MainScene",
            physics: {
                matter: {
                    debug: true
                },
                arcade: {
                    // gravity: 100
                    gravity: { y: 1000 },
                    // debug: true
                }
            }
        });
    }

    preload() {

    }

    create() {

        this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
        this.matter.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
        this.scorp = new Character(this);

        this.skull = this.matter.add.sprite(stageWidth / 2 + 100, stageHeight / 2, "ball", 0);
        this.skull.setScale(.75);
        this.skull.name = "skull";
        this.skull.spearable = true;
        this.createListeners();

    }

    createListeners() {
        this.input.keyboard.on('keydown', this.keyDown);
        this.input.keyboard.on('keyup', this.keyUp);
        this.matter.world.on('collisionstart', this.matterCollisionStart);
    }

    matterCollisionStart(evt, bodyA, bodyB) {

        let scene = this.scene;
        let collisionObjs = [this.scene.scorp.spear.spear.body];
        collisionObjs.forEach(function (obj) {
            let mainObj;
            let hitObj;
            
            if (bodyA == obj) {
                mainObj = bodyA;
                hitObj = bodyB;
            } else if (bodyB == obj) {
                mainObj = bodyB;
                hitObj = bodyA;
            }

            switch (mainObj) {
                case scene.scorp.spear.spear.body:
                    if (hitObj.gameObject && hitObj.gameObject.spearable) {
                        console.log(evt)
                    
                        scene.scorp.spear.spearObject(hitObj);
                    }

                    break;
            }
        })

    }

    bodyFilter(bodyNeeded, bodyA, bodyB, evt) {
        if (bodyNeeded == bodyA) {
            return [bodyA, bodyB, evt]
        } else {

        }
    }

    keyDown(evt) {
        let scene = this.scene;
        switch (evt.keyCode) {
            case 32://space
                scene.scorp.spear.center();
                break;
            case 37://left
                scene.scorp.spear.throw({ direction: "left" });
                break;
            case 39://right
                scene.scorp.spear.throw({ direction: "right" });
                break;
        }
    }

    keyUp(evt) {
        let scene = this.scene;

    }

    update() {
        this.scorp.update();
    }
}