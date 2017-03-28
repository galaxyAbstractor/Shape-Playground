class Shape {
    constructor(ctx, x, y, red, green, blue, modifiers) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.size = 0;
        this.keep = true;
        this.opacity = 0;
        this.maxSize = 40;
        this.speed = 0.005;
        this.modifiers = modifiers;
        this.fadesOut = true;

        let self = this;
        this.modifiers.forEach(function (modifier) {
            modifier.setShape(self);
            modifier.init();
        })
    }

    draw() {
        this.fade();

        this.modifiers.forEach(function (modifier) {
            modifier.apply();
        })
    }
    fade() {
        if (this.size <= 10) {
            this.opacity = (this.size / 10);
        }

        if (this.fadesOut && this.size >= this.maxSize - 10) {
            this.opacity = 1 - ((this.size - (this.maxSize - 10)) / 10);
        }
    }
    shouldKeep() {
        return this.modifiers.reduce(function (acc, cv) {
            return cv.keep || acc;
        }, false);
    }
}

export default Shape