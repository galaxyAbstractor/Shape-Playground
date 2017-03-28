import Modifier from "./Modifier";

class Grows extends Modifier {
    constructor() {
        super();
        this.inital = true;
    }
    apply() {
        if(this.inital) {
            this.shape.size = 0;
            this.inital = false;
        }

        if (this.shape.size < this.shape.maxSize) {
            this.shape.size += (this.shape.maxSize * this.shape.speed);
        }

        if (this.shape.size > this.shape.maxSize) {
            this.keep = false;
        }
    }
}

export default Grows;