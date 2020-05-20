import * as THREE from 'three'
import Common from '../Common'
import Pointer from "./pointer"

import EventBus from "~/utils/event-bus"

export default class RayCast{
    constructor(){
        this.init();
    }
    init(){
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.camera = Common.camera;
        console.log(this.camera)
        
    }

    mouseMove(e){

        this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

        this.raycaster.setFromCamera( this.mouse, this.camera );

        // calculate objects intersecting the picking ray
        this.intersects = this.raycaster.intersectObjects( Common.scene.children );
    
        if ( this.intersects.length > 0 ) {
            EventBus.$emit("RAYCASTER", this.intersects[0].object.type);
    
        } else {
            EventBus.$emit("RAYCASTER", null);
        }
    }
}
