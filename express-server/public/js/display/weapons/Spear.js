import { SetDefault } from '../../utils/Utils.js';
import { checkSpriteOverlap } from '../../utils/Utils.js';

export default class Spear {
    constructor(_scene, _owner, _options = {}) {
        this.scene = _scene;
        this.segments = [];
        this.spear;
        this.isBeingThrown = false;
        this.owner = _owner;
        this.direction = null;
        this.create(_options);
        this.charConstraint; // pin that connects spear to player
        this.hasHitObject;
        this.spearedObject;
        this.spearedConstraint;
    }



    create(options) {

        options.x = SetDefault(options.x, 0);
        options.y = SetDefault(options.y, 0);
        options.segments = SetDefault(options.segments, 5);

        let x = options.x;
        let prev;
        let stiffness = .5;
        let padding;
        let self = this;
        let scale = .2;

        for (var i = 0; i <= options.segments; i++) {
            let knot = this.scene.matter.add.sprite(x, options.y, "knot", 0, {
                shape: "circle",
                collisionFilter: {
                    category: 0x0001
                    // group: 1
                    // mask: 0x0003

                }
            });

            self.segments.push(knot);
            knot.setScale(scale);
            // knot.setMass(.15)
            padding = knot.displayWidth / 8;
            if (i === 0) {
                // this.owner.sprite.body.immovable = true;
                // this.owner.sprite.body.moves = false;
                // this.scene.matter.add.joint(this.owner.anchor, knot, length, stiffness, {
                //     pointA: {
                //         x: 0,
                //         y: 0
                //     },
                //     pointB: {
                //         x: 0,
                //         y: 0
                //     }
                // });

            } else {
                let length = (knot.displayWidth / 2) - (knot.displayWidth / 2);
                let pointA = { x: 0, y: 0 };
                let pointB = { x: -knot.displayWidth / 2, y: 0 };
                this.scene.matter.add.joint(prev, knot, length, stiffness,
                    {
                        pointA: pointA,
                        pointB: pointB
                    });
            }

            prev = knot;
            x += knot.displayWidth;
        }

        this.spear = this.scene.matter.add.sprite(x + prev.displayWidth, options.y, "spear", 0, {
            shape: "rectangle",
            collisionFilter: {
                category: 1,
			    mask: 255,
                // mask: 0x001
                // category: 0x0002
            }
        });
        this.spear.classRef = this;
        this.spear.setMass(100)
        this.spear.name = "spear";
        

        this.spear.setScale(scale);
        this.scene.matter.add.joint(prev, this.spear, prev.displayWidth / 2, stiffness, {
            pointA: {
                x: 0,
                y: 0
            },
            pointB: {
                x: -this.spear.displayWidth / 2 + (prev.displayWidth / 4),
                y: 0
            }
        });

        this.disable();
    }



    disable() {
        this.segments.forEach(function (knot) {
            knot.setVisible(false);
            knot.x = -100;
            knot.y = -100;

        })
        this.spear.setVisible(false);
        this.spear.x = -100;
        this.spear.y = -100;
    }

    enable() {
        this.segments.forEach(function (knot) {
            knot.setVisible(true);

        })
        this.spear.setVisible(true);
    }

    throw(_options) {
        let spearObj = this;
        let power = 75;
        this.hasHitObject;
        this.enable(); // makes spear visible
        if (this.spearedConstraint) {
            this.scene.matter.world.removeConstraint(this.spearedConstraint);
        }


        this.isBeingThrown = false;
        this.direction = SetDefault(_options.direction, "right");
        this.center(this.direction)
        this.isBeingThrown = true;
        this.isOutsideThrownArea = false;
        if (this.charConstraint) {
            this.scene.matter.world.removeConstraint(this.charConstraint);
        }
        this.charConstraint = this.scene.matter.add.joint(this.segments[0], this.owner.anchor, 0, 1)
        this.segments[0].body.collisionFilter.group = -1;
        this.owner.anchor.body.collisionFilter.group = -1;

        // this.shape = this.scene.make.graphics();
        // // this.shape.fillStyle(0xFFFFFF, 1);
        // // this.shape.fillRect(0, 0, stageWidth, stageHeight);
        // this.shape.fillStyle(0xFFFFFF, 1);
        // this.shape.fillRect(0, 0, this.owner.x, stageHeight);
        // // this.mask = new Phaser.Display.Masks.GeometryMask(this.scene, this.shape);
        // this.mask = this.shape.createGeometryMask();
        // console.log(this.mask)


        // this.segments.forEach(function (knot) {
        //     // knot.body.collisionFilter.mask = 0x002;
        //     knot.setMask(spearObj.mask);
        // })

        if (this.direction == "left") {
            this.spear.angle = 180;
            this.spear.setVelocity(-power, 0)
        } else if (this.direction == "right") {
            this.spear.angle = 0;
            this.spear.setVelocity(power, 0)
        }
    }

    spearObject(obj) {

        if (this.isOutsideThrownArea) {

        } else {
            if (this.spearedObject != undefined) { return; }
            this.spearedObject = obj;
            if (this.spearedConstraint) {
                this.scene.matter.world.removeConstraint(this.spearedConstraint);
            }
            //console.log(obj)
            this.spearedConstraint = this.scene.matter.add.joint(this.spear, this.spearedObject, 0, .2,
                {
                    pointA: { x: this.spear.displayWidth / 2, y: 0 },
                    pointB: { x: 0, y: 0 }
                })

            this.spearedObject.collisionFilter.group = -1;
            this.spear.body.collisionFilter.group = -1;
            this.spearedObject.gameObject.setMass(2)
            this.scene.children.bringToTop(this.spear);
        }


        this.isBeingThrown = false;
    }

    center(_direction) {
        let spearObj = this;
        let i = 0;
        this.segments.forEach(function (knot) {
            if (i == 0) {
                knot.x = spearObj.owner.sprite.x;
                knot.y = spearObj.owner.sprite.y;
            } else {
                knot.y = spearObj.owner.sprite.y;
                if (_direction == "left") {
                    knot.x = spearObj.owner.sprite.x + (spearObj.owner.sprite.width * 3);

                } else {
                    knot.x = spearObj.owner.sprite.x - (spearObj.owner.sprite.width * 3);
                }
                console.log(_direction)
            }
            knot.setVelocity(0, 0);
            //

            i++;
        })
        this.spear.x = this.owner.sprite.x;
        this.spear.y = this.owner.sprite.y;
        this.spear.setVelocity(0, 0);
    }



    update() {
        let spearObj = this;

        if (this.isBeingThrown) {
            this.segments.forEach(function (knot) {

                if (spearObj.direction == "left") {
                    if (knot.x < spearObj.owner.sprite.x) {
                        knot.setVisible(true);
                    } else {
                        knot.setVisible(false);
                    }
                } else if (spearObj.direction == "right") {
                    if (knot.x > spearObj.owner.sprite.x) {
                        knot.setVisible(true);
                    } else {
                        knot.setVisible(false);
                    }
                }

            });

            if (spearObj.direction == "left") {
                if (spearObj.spear.x < spearObj.owner.sprite.x) {
                    spearObj.spear.setVisible(true);
                } else {
                    spearObj.spear.setVisible(false);
                }
            } else if (spearObj.direction == "right") {
                if (spearObj.spear.x > spearObj.owner.sprite.x) {
                    spearObj.spear.setVisible(true);
                } else {
                    spearObj.spear.setVisible(false);
                }
            }
        }
        if (this.isBeingThrown) {
            if (!Phaser.Geom.Intersects.CircleToRectangle(spearObj.owner.spearArea, spearObj.spear.getBounds())) {
                console.log("Outside Spear Area")
                this.charConstraint.render.visible = false;

                this.scene.matter.world.removeConstraint(this.charConstraint);

                this.isBeingThrown = false;
                this.isOutsideThrownArea = true;
                this.segments.forEach(function (knot) {
                    knot.setVisible(true);
                });
            }

        }
    }
}