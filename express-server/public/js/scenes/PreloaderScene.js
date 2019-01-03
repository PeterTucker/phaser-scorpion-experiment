import BaseScene from './BaseScene.js';


export default class PreloaderScene extends BaseScene
{
    constructor()
    {
        super({key: "PreloaderScene"})
    }

    preload(){
        this.load.image('color', './img/super-mario.gif');
        this.load.image('ball', './img/ball.png');
        this.load.image('skull', './img/skull.gif');
        this.load.image('vertebrae', './img/vertebrae.gif');
        this.load.image('spear', './img/spear.gif');
        this.load.image('knot', './img/knot.gif');
        this.load.image('scorpion', './img/scorpion.png');
        this.load.image('blue', './img/blue-box.jpg');
        
    }

    create(){
        
        this.scene.switch("MainScene");
    }

    update(){
    }

    resize(){
        
    }

}