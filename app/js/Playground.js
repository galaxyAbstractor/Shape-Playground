import Spawner from "./Spawner";
import store from "./Store";

class Playground {
    constructor(el, options) {
        this.el = el;
        this.ctx = el[0].getContext("2d");
        this.width = el.width();
        this.height = el.height();
        this.x = 0;
        this.shapes = [];

        store.setItem("x", 0);
        store.setItem("y", 0);
        store.setItem("width", this.width);
        store.setItem("height", this.height);

        let self = this;
        el.on("mousemove", function (e) {

            let rect = self.el[0].getBoundingClientRect();
            let scrollTop = document.documentElement.scrollTop?
                document.documentElement.scrollTop:document.body.scrollTop;
            let scrollLeft = document.documentElement.scrollLeft?
                document.documentElement.scrollLeft:document.body.scrollLeft;
            let elementLeft = rect.left+scrollLeft;
            let elementTop = rect.top+scrollTop;

            let x = e.pageX-elementLeft;
            let y = e.pageY-elementTop;

            store.setItem("x",  20 - (40 * (x / self.width)));
            store.setItem("y",  20 - (40 * (y / self.height)));
        });


        let default_options = {
            background: {
                color: "#ff0000"
            },
            shapes: {
                max: 30
            }
        };

        this.options = Object.assign({}, default_options, options);

        window.requestAnimationFrame(this.loop.bind(this));

        $(window).on("resize", function () {
            self.el.attr("height", self.el.height());
            self.el.attr("width", self.el.width());
            self.width = self.el.width();
            self.height = self.el.height();
            store.setItem("width", this.width);
            store.setItem("height", this.height);
        });

        el.attr("height", self.el.height());
        el.attr("width", self.el.width());
        self.width = self.el.width();
        self.height = self.el.height();
    }
    drawBackground() {
        this.ctx.fillStyle = this.options.background.color;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawShapes() {
        this.shapes.forEach((shape) => {
            shape.draw();
        })
    }

    draw() {
        this.drawBackground();
        this.drawShapes();
    }

    spawnShape() {
        if(Math.random() > 0.8) {
            this.shapes.push(Spawner.spawnShape(this.ctx, this.width, this.height));
        }
    }

    killShapes() {
        this.shapes = this.shapes.filter((shape) => {
            if(Math.random() > 0.8) {
                return shape.shouldKeep();
            } else {
                return true;
            }
        })
    }

    loop() {
        if(this.shapes.length < this.options.shapes.max) {
            this.spawnShape();
        }

        this.draw();
        this.killShapes();

        window.requestAnimationFrame(this.loop.bind(this));

    }

}

export default Playground;