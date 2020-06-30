import * as THREE from 'three'
import Common from '../Common'
import Image from "../elements/Image"

import EventBus from "~/utils/event-bus"

export default class RayCast{
    constructor(){
        this.init();
    }
    init(){

        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.image = new Image();

        window.addEventListener("click", this.onClick.bind(this));
        EventBus.$on("SCROLLENABLED", this.isIndex.bind(this));

        let hammertime = new Hammer(Common.renderer.domElement);
        hammertime.on('tap', this.tap.bind(this))

    }

    isIndex(e){
        this.isIndex = e
    }

    tap(e){

        this.mouse.x = +(e.center.x / window.innerWidth) * 2 +-1;
        this.mouse.y = -(e.center.y / window.innerHeight) * 2 + 1;
        
        console.log('tap', this.mouse.x, this.mouse.y, e)
        this.raycaster.setFromCamera( this.mouse, Common.camera )
        this.intersects = this.raycaster.intersectObjects( this.image.thumbs )
        console.log(this.intersects)
        if(this.isIndex == true ){
            if ( this.intersects.length > 0 ) {
                // console.log(this.intersects[0])
                EventBus.$emit("RAYCASTERIMAGECLICK", this.intersects[0])
            } else {
                // EventBus.$emit("RAYCASTERIMAGECLICK", false);
            }   
        }
    }

    mouseMove(e){
        
        if(Common.isMobile == true){
            
            this.mouse.x = ( e.x / window.innerWidth ) * 2 - 1
            this.mouse.y = - ( e.y / window.innerHeight ) * 2 + 1

        
            this.raycaster.setFromCamera( this.mouse, Common.camera )

            // calculate objects intersecting the picking ray
            let wall = Common.scene.getObjectByName( "wall" )
            this.intersect = this.raycaster.intersectObject( wall )
            this.intersects = this.raycaster.intersectObjects( this.image.thumbs, true )

            if(Common.isMobile == true){       
                if ( this.intersect.length > 0 ) {
                    if(this.onImg == false){
                        EventBus.$emit("RAYCASTERWALL", this.intersect[0])
                    } else {
                        EventBus.$emit("RAYCASTERWALL", false);
                    }
                }
            }

            if(this.isIndex == true ){
                if(Common.isInGallery == false) {
                    if ( this.intersects.length > 0 ) {
                        this.onImg = true
                        EventBus.$emit("RAYCASTERIMAGE", this.intersects[0])
                    } else {
                        this.onImg = false
                        EventBus.$emit("RAYCASTERIMAGE", false)
                    }
                } else {
                    if ( this.intersect.length > 0 ) {
                        EventBus.$emit("RAYCASTERWALL", this.intersect[0])
                    }
                }
            }
        }
        
    }

    onClick(){
        if(Common.isMobile == true){      
            this.intersects = this.raycaster.intersectObjects( this.image.thumbs )
            if(this.isIndex == true ){
                if ( this.intersects.length > 0 ) {
                    // console.log(this.intersects[0])
                    EventBus.$emit("RAYCASTERIMAGECLICK", this.intersects[0])
                } else {
                    // EventBus.$emit("RAYCASTERIMAGECLICK", false);
                }   
            }
        }
    }
}
