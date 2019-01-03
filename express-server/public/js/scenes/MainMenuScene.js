import BaseScene from './BaseScene.js';
import { NegPos } from '../utils/Utils.js';
export default class MainMenuScene extends BaseScene {
    constructor() {
        super({ key: "MainMenuScene", physics:{
            matter: {
                // debug: true
            }
        }})
        this.Body = Phaser.Physics.Matter.Matter.Body
    }

    preload() {

    }

    create() {
        let scene = this;

        var category1 = 0x0001,
            category2 = 0x0002,
            category3 = 0x0003,
            category4 = 0x0004;

        //this.img = this.add.image(0, 0, 'color');
        //this.layout(this.img, ["VCENTER", "right"]);

        this.matter.world.setBounds(0, 0, this.game.config.width, this.game.config.height);

        let group = this.Body.nextGroup(false);
        console.log(group)
        let stiffness = .1;
        let segments = 3;//20

        // let boxes = this.matter.add.stack(
        //     this.game.config.width / 2,
        //     this.game.config.height / 2,
        //     20, 1, 10, 10, function (x, y) {
        //         return scene.Bodies.rectangle(x, y, 10, 10, {
        //             collisionFilter: {
        //                 mask: category1
        //             }
        //         });
        //     });

        let boxes = this.matter.add.imageStack("skull", 0,
            this.game.config.width / 2,
            this.game.config.height / 4, 1, segments, 0, 0, {
                collisionFilter: {
                    mask: category1
                }
            });
        boxes.bodies[0].isStatic = true;
        boxes.bodies.forEach(function (body) {
            body.gameObject.setScale(.35)
        })

        let chain = this.matter.add.chain(boxes, 0, .5, 0, -.5, {
            stiffness: stiffness,
            collisionFilter: {
                mask: category4
            }
        });
        return;
        this.circle = this.matter.add.circle(this.game.config.width / 2, this.game.config.height / 4, 10, {
            isStatic: true,
            stiffness: stiffness,
            collisionFilter: {
                mask: category2
            }
        });

        this.matter.add.constraint(this.circle, boxes.bodies[0], 100, stiffness,
            {
                collisionFilter: {
                    mask: category4
                }
            });
        return;
        this.skull = this.matter.add.image(this.game.config.width / 2, this.game.config.height / 2, "skull", null, {
            restitution: 1, isStatic: false, shape: { type: "circle" }, collisionFilter: {
                mask: category1
            }
        })

        this.matter.add.constraint(this.skull, boxes.bodies[boxes.bodies.length - 1], 70, stiffness);

        this.skull.setScale(.35)
        this.skull.setInteractive();
        this.input.setDraggable(this.skull);

        console.log(this.matter.remove);

        this.input.on("drag", (pointer, gameObject, x, y) => gameObject.setPosition(x, y));
        this.input.on("dragstart", (pointer, gameObject) => gameObject.setStatic(true));
        this.input.on("dragend", (pointer, gameObject) => gameObject.setStatic(false));

        this.keyHasReleased = true;
        scene.input.keyboard.on('keyup', function (evt) {
            scene.keyHasReleased = true;
        });
        scene.input.keyboard.on('keydown', function (evt) {
            console.log(evt.keyCode)
            let vX = 0;
            let vY = 0;

            switch (evt.keyCode) {
                case 37://left
                    scene.skull.angle = 45;
                    scene.skull.setAngularVelocity(-Math.PI / 40)
                    vX = (20) * -1;
                    vY = (5) * -1;
                    break;
                case 38://up
                    //scene.skull.rotation = 0;
                    scene.skull.angle = 0;
                    scene.skull.setAngularVelocity(0)
                    vY = (50) * -1;
                    break;
                case 39://right
                    scene.skull.angle = -45;
                    scene.skull.setAngularVelocity(Math.PI / 40)
                    vX = (20);
                    vY = (5) * -1;
                    break;
                case 40://down
                    vY = (2);
                    break;
                case 32:
                    //vX = (50) * NegPos()
                    //vY = (50) * NegPos()
                    console.log(scene.skull);
                    //scene.matter.world.engine.timing.timeScale = 0.001;
                    break;
            }
            if (evt.keyCode == 37 ||
                evt.keyCode == 38 ||
                evt.keyCode == 39 ||
                evt.keyCode == 40) {
                if (scene.keyHasReleased) {
                    scene.skull.setVelocity(vX, vY);
                    scene.keyHasReleased = false;

                }

            }

        });


    }

    update() {
        //console.log(this.circle)
        //this.circle.setPosition(10,20);
        // this.img.angle =
        // this.img2.angle += 1; 
    }

    resize() {
        //this.layout(this.img, ["VCENTER", "right"])
    }

}