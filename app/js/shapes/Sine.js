import Shape from "./Shape";
import store from "../Store";
import MovesX from "../modifiers/MovesX";
import Rave from "../modifiers/Rave";

class Sine extends Shape {
    constructor(ctx, x, y, red, green, blue, modifiers) {

        let hasMovesX = modifiers.reduce(function (acc, cv) {
            return cv instanceof MovesX || acc;
        }, false);

        if(!hasMovesX) {
            modifiers.push(new MovesX());
        }

        super(ctx, x, y, red, green, blue, modifiers);

        this.supportsModifiers = [MovesX, Rave];

        super.cleanModifiers();

        this.size = 20;
        this.opacity = 1;
    }
    draw() {
        super.draw();

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(' + this.red + ', ' + this.green + ', ' + this.blue + ', ' + this.opacity + ')';

        let x = this.x + store.getItem("x");
        let y = this.y + store.getItem("y");

        this.ctx.beginPath();

        for(let x1 = x; x1 < (x+100); x1 += 1) {
            this.ctx.lineTo(x1, y + (20 * Math.sin(x1 / 20)));
        }

        this.ctx.stroke();

    }
}

export default Sine;
