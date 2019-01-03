export function trace(_msg, _type = "") {
    let formatting = "";
    switch (_type.toUpperCase()) {
        case "1":
        case "CAUTION":
            formatting = "color:yellow; background-color:black;";
            break;
        case "2":
        case "WARNING":
            formatting = "color:red; background-color:black;";
            break;
        case "MESSAGE":
        case "0":
        default:
            formatting = "color:blue; background-color:white;";
            break;
    }
    console.log("%c"+_msg, formatting + " padding: 5px; font-weight: bold");
}

export function NegPos(){
    let negPosVal = Math.random();
    if(negPosVal>=.5){
        return -1;
    }else{
        return 1;
    }
}

export function SetDefault(objVar, value){
    return (typeof objVar === 'undefined') ? value : objVar;
}

export function checkSpriteOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);

}