import Circle from "./shapes/Circle";
import Square from "./shapes/Square";
import Triangle from "./shapes/Triangle";
import Sine from "./shapes/Sine";
import RaveSine from "./shapes/RaveSine";

import Grows from "./modifiers/Grows";
import MovesX from "./modifiers/MovesX";
import MovesY from "./modifiers/MovesY";
import Rave from "./modifiers/Rave";

let availableShapes = [Circle, Square, Triangle, Sine, RaveSine];
let availableModifiers = [Grows, MovesX, MovesY, Rave];

class Spawner {
    static spawnShape(ctx, width, height) {

        let mods = Array.from(availableModifiers);
        let modifiers = mods.splice(Math.floor(Math.random() * mods.length), 1);

        for (let i = 0; i < availableModifiers.length; i++) {
            if(Math.random() > 0.9) {
                let modifier = mods.splice(Math.floor(Math.random() * mods.length), 1);
                modifiers = modifiers.concat(modifier);
            }
        }

        modifiers = modifiers.map(function (modifier) {
            return new modifier();
        });

        return new availableShapes[Math.floor(Math.random() * availableShapes.length)](
            ctx,
            Math.floor(Math.random() * width),
            Math.floor(Math.random() * height),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            modifiers
        )

    }
}

export default Spawner;