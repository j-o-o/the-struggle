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
        this.throttle = false;
    }

    init(){
        this.pointer = new Pointer();
        this.RayCast = new RayCast();
        document.addEventListener("mousemove", this.mouseMove.bind(this));

        let hammertime = new Hammer(Common.renderer.domElement);
        hammertime.on('pan', this.panMove.bind(this) );
    }
    
    mouseMove(e){
        if(Common.isTouch == false){
            EventBus.$emit("MOUSEMOVE", e);

            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        }

    }
    panMove(e){
        EventBus.$emit("PANMOVE", e);
    }

    loop(){
        let e = this.mouse;
        this.RayCast.mouseMove(e);
        EventBus.$emit("MOUSEMOVELOOP", e);
    }


}

export default new Pointer();