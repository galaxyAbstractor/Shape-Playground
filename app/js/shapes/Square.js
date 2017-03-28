import Shape from "./Shape";
import store from "../Store";

class Square extends Shape {
    draw() {
        super.draw();

        let x = this.x + store.getItem("x");
        let y = this.y + store.getItem("y");

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(' + this.red + ', ' + this.green + ', ' + this.blue + ', ' + this.opacity + ')';
        this.ctx.strokeRect(x - (this.size/2), y - (this.size/2), this.size, this.size);
    }
}

export default Square;
