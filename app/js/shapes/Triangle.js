import Shape from "./Shape";
import store from "../Store";

class Triangle extends Shape {
    constructor() {
        super(...arguments);

        this.maxSize = 60;
    }
    draw() {
        super.draw();

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(' + this.red + ', ' + this.green + ', ' + this.blue + ', ' + this.opacity + ')';

        let x = this.x + store.getItem("x");
        let y = this.y + store.getItem("y");

        this.ctx.beginPath();
        this.ctx.moveTo(x, y - (this.size / 2));
        this.ctx.lineTo(x - (this.size / 2), y + (this.size / 2));
        this.ctx.lineTo(x + (this.size / 2), y + (this.size / 2));
        this.ctx.lineTo(x, y - (this.size / 2));
        this.ctx.stroke();

    }
}

export default Triangle;
