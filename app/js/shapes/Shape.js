import Grows from "../modifiers/Grows";
import MovesX from "../modifiers/MovesX";
import MovesY from "../modifiers/MovesY";
import Rave from "../modifiers/Rave";

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
        this.supportsModifiers = [Grows, MovesY, MovesX, Rave];

        let self = this;

        this.modifiers.forEach(function (modifier) {
            modifier.setShape(self);
            modifier.init();
        })
    }

    cleanModifiers() {
        let self = this;
        this.modifiers = this.modifiers.filter(function (modifier) {
            return self.supportsModifiers.reduce(function (acc, cv) {
                return modifier instanceof cv || acc;
            }, false);
        });
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