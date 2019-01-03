import { trace } from './utils/Utils.js';
window.trace = trace; // Make trace method available globally
//https://colyseus.io/
import PreloaderScene from './scenes/PreloaderScene.js';
import MainMenuScene from './scenes/MainMenuScene.js';
import MainScene from './scenes/MainScene.js';

let config,
    project,
    width,
    height,
    keepAspectRatio = true; // for doing fullscreen games

function resize() {

    if (keepAspectRatio) {
        var canvas = project.canvas, width = window.innerWidth, height = window.innerHeight;
        var wratio = width / height, ratio = canvas.width / canvas.height;

        if (wratio < ratio) {
            canvas.style.width = width + "px";
            canvas.style.height = (width / ratio) + "px";
        } else {
            canvas.style.width = (height * ratio) + "px";
            canvas.style.height = height + "px";
        }

    } else {
        width = window.innerWidth;
        height = window.innerHeight;
        project.renderer.resize(width, height);

        // Iterates through active scenes and runs the class method resize on them.
        for (var key in project.scene.keys) {
            if (project.scene.isActive(key)) {
                project.scene.getScene(key).resize();
            }
        }
    }

    window.stageWidth = project.canvas.width;
    window.stageHeight = project.canvas.height;



    // console.log('canvas:', project.canvas.width, project.canvas.height)
    // console.log('renderer:', project.renderer.width, project.renderer.height)
}


window.onload = function () {

    config = {
        type: Phaser.AUTO,
        width: keepAspectRatio ? 1024 : 0,
        height: keepAspectRatio ? 768 : 0,
        canvas: document.querySelector("canvas#project"),
        autoResize: true,
        scene: [
            PreloaderScene,
            MainMenuScene,
            MainScene]
        // physics: {
        //     default: 'arcade matter',
        //     matter: {
        //         // debug: true
        //     },
        //     arcade: {
        //         gravity: { y: 500 },
        //         debug: true
        //     }
        // }

    }

    project = new Phaser.Game(config);

    window.addEventListener("resize", resize, false);
    resize();

    trace("Project renderer: " + project.renderer.constructor.name, "CAUTION");

}

