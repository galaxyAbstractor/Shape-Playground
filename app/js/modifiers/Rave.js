import Modifier from "./Modifier";

class Rave extends Modifier {
    constructor() {
        super();
        this.keep = false;
    }
    apply() {
        this.shape.red = Math.random() * 255;
        this.shape.green = Math.random() * 255;
        this.shape.blue = Math.random() * 255;
    }
}

export default Rave;