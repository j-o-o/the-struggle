import * as THREE from 'three'
import Common from '../Common'

if (process.browser) {
    Hammer = require('hammerjs');
} 
import EventBus from "~/utils/event-bus"

import RayCast from "./raycaster"

class Pointer{

    constructor(){
        this.mouse = new THREE.Vector2( 0, 0 );
    }
    init(){
        this.pointer = new Pointer();
        this.RayCast = new RayCast();
        document.addEventListener("mousemove", this.mouseMove.bind(this));

        const hammertime = new Hammer(Common.renderer.domElement);
        hammertime.on('pan', this.panMove.bind(this) );
    }
    mouseMove(e){
        EventBus.$emit("MOUSEMOVE", e);

        this.mouse.x = e.clientX
        this.mouse.y = e.clientY

        this.RayCast.mouseMove(e);
    }
    panMove(e){
        EventBus.$emit("PANMOVE", e);
    }

    loop(){
        let e = this.mouse
        EventBus.$emit("MOUSEMOVELOOP", e);
    }


}

export default new Pointer();