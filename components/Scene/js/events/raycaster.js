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
    }

    mouseMove(e){

        this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

        this.raycaster.setFromCamera( this.mouse, this.camera );

        // calculate objects intersecting the picking ray
        var wall = Common.scene.getObjectByName( "wall" );
        this.intersect = this.raycaster.intersectObject( wall );
    
        if ( this.intersect.length > 0 ) {
            EventBus.$emit("RAYCASTERWALL", this.intersect[0]);
    
        } else {
            EventBus.$emit("RAYCASTERWALL", null);
        }

        function Car(make) {
            this.make = make;
        }

        let images = Common.scene.children.filter( child => child.isInstancedMesh === true );

        
        // const result = objects.filter(object => object);
        // console.log(passed)
        // this.intersects = this.raycaster.intersectObjects( Common.scene.children );
        // if ( this.intersects.length > 0 ) {
        //     EventBus.$emit("RAYCASTERIMAGE", this.intersects[0]);
    
        // } else {
        //     EventBus.$emit("RAYCASTERIMAGE", null);
        // }
    }

}
