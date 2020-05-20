import * as THREE from 'three'
import Common from '../Common'

if (process.browser) {
    Hammer = require('hammerjs');
} 
import EventBus from "~/utils/event-bus"

import RayCast from "./raycaster"

class Pointer{

    constructor(){
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
        this.RayCast.mouseMove(e);
    }
    panMove(e){
        console.log(e)
        EventBus.$emit("PANMOVE", e);
    }


}

export default new Pointer();