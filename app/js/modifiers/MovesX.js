import store from "../Store";
import Modifier from "./Modifier";

class MovesX extends Modifier {
    constructor() {
        super();
    }

    init() {
        this.shape.fadesOut = false;
        this.direction = Math.random() < 0.5 ? -1 : 1;

        if(this.direction === 1) {
            this.shape.x = -50;
        } else {
            this.shape.x = store.getItem("width") + 50;
        }

    }
    apply() {
        this.shape.x += 3 * this.direction;

        if (this.direction === 1 && this.shape.x > store.getItem("width") + 50) {
            this.keep = false;
        } else if(this.shape.x < -50) {
            this.keep = false;
        }
    }
}

export default MovesX;