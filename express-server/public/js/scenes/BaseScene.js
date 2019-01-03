export default class BaseScene extends Phaser.Scene {
    constructor(_data) {
        super(_data);
    }

    resize() {

    }

    layout(_obj, _posArray) {
        let stageWidth = this.sys.canvas.width,
            stageHeight = this.sys.canvas.height;

        if (!Array.isArray(_posArray)) {
            _posArray = [_posArray];
        }

        _posArray.forEach(function (position) {
            switch (position.toUpperCase()) {
                case 'CENTER':
                    _obj.y = stageHeight / 2;
                    _obj.x = stageWidth / 2;
                    break;
                case 'VCENTER':
                    _obj.y = stageHeight / 2;
                    break;
                case 'HCENTER':
                    _obj.x = stageWidth / 2;
                    break;
                case 'LEFT':
                    _obj.x = 0;
                    break;
                case 'RIGHT':
                    _obj.x = stageWidth;
                    break;
                case 'TOP':
                    _obj.y = 0;
                    break;
                case 'BOTTOM':
                    _obj.y = stageHeight;
                    break;
                default:
                    trace("Value " + position + " is not a valid layout location.", "WARNING");

                    break;
            }


        });
    }
}