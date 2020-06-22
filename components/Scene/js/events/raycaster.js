import * as THREE from 'three'
import Common from '../Common'
import Pointer from "./pointer"
import Image from "../elements/Image"
import { lerp } from 'math-toolbox'

import EventBus from "~/utils/event-bus"

export default class RayCast{
    constructor(){
        this.init();
    }
    init(){
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        // this.camera = Common.camera;
        this.image = new Image();


        window.addEventListener("click", this.onClick.bind(this));

    }

    mouseMove(e){
        
        this.mouse.x = ( e.x / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( e.y / window.innerHeight ) * 2 + 1;

        this.raycaster.setFromCamera( this.mouse, Common.camera );

        // calculate objects intersecting the picking ray
        let wall = Common.scene.getObjectByName( "wall" );
        this.intersect = this.raycaster.intersectObject( wall );
        this.intersects = this.raycaster.intersectObjects( this.image.thumbs, true );




        setTimeout( function() {
            if ( this.intersect.length > 0 ) {
                if(this.onImg == false){
                    EventBus.$emit("RAYCASTERWALL", this.intersect[0]);
                } else {
                    EventBus.$emit("RAYCASTERWALL", false);
                }
            }

            if(Common.isInGallery == false) {
                if ( this.intersects.length > 0 ) {
                    this.onImg = true
                    EventBus.$emit("RAYCASTERIMAGE", this.intersects[0]);
                } else {
                    this.onImg = false
                    EventBus.$emit("RAYCASTERIMAGE", false);
                }
            }



        }.bind(this), 1000 / 10);

        

       
        // if ( this.intersects.length > 0 ) {
        // } else {
        // }   




    }

    onClick(e){
        this.intersects = this.raycaster.intersectObjects( this.image.thumbs );
        if ( this.intersects.length > 0 ) {
            // console.log(this.intersects[0])
            EventBus.$emit("RAYCASTERIMAGECLICK", this.intersects[0]);
        } else {
            // EventBus.$emit("RAYCASTERIMAGECLICK", false);
        }   
    }
}
