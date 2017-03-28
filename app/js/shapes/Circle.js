import Shape from "./Shape";
import store from "../Store";

class Circle extends Shape {
    draw() {
        super.draw();

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(' + this.red + ', ' + this.green + ', ' + this.blue + ', ' + this.opacity + ')';

        let x = this.x + store.getItem("x");
        let y = this.y + store.getItem("y");

        this.ctx.beginPath();
        this.ctx.arc(x, y, this.size, 0, Math.PI * 2, true);
        this.ctx.stroke();

    }
}

export default Circle;
