import store from "../Store";
import Modifier from "./Modifier";

class MovesY extends Modifier {
    constructor() {
        super();
    }

    init() {
        this.shape.fadesOut = false;
        this.shape.y = 0;
        this.direction = Math.random() < 0.5 ? -1 : 1;

        if(this.direction === 1) {
            this.shape.y = -50;
        } else {
            this.shape.y = store.getItem("height") + 50;
        }

    }
    apply() {
        this.shape.y += 3 * this.direction;

        if (this.direction === 1 && this.shape.y > store.getItem("height") + 50) {
            this.keep = false;
        } else if(this.shape.y < -50) {
            this.keep = false;
        }
    }
}

export default MovesY;