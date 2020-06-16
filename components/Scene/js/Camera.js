import * as THREE from 'three'
import Common from "./Common"
import Gallery from "./elements/Gallery"

import Image from "./elements/Image"
import Wall from "./elements/Wall"

import Pointer from "./events/pointer"
import Wheel from "./events/wheel"
import { lerp } from 'math-toolbox'

import EventBus from "~/utils/event-bus"

class Camera{

    constructor(){
    
        this.wheeled = 0;
        this.slant = -3;
        this.camPosTransitionY = 0;
        this.camPos = new THREE.Vector3(0,0,0);
        this.camLookAt = new THREE.Vector3();
        this.mouse = new THREE.Vector2();
        this.transition = false

        this.init();

    }

    init(){

        EventBus.$on("WHEELSPEED", this.onWheel.bind(this));
        EventBus.$on("MOUSEMOVE", this.mouseMove.bind(this));
        EventBus.$on("SCROLLENABLED", this.isScrollEnabled.bind(this));
        EventBus.$on("RAYCASTERIMAGE", this.isOnImg.bind(this));
        EventBus.$on("RAYCASTERIMAGECLICK", this.onClickImage.bind(this));

    }

    isOnImg(e){

        if(Common.isInGallery == false){
            if (e == false){
                this.slant = -3;
            } else {
                if(this.camPos.x >= e.object.position.x-3){
                    this.slant = -1;
                }
            }
        }



    }

    isScrollEnabled(e){this.scrollEnabled=e}


    onClickImage(e){

            
        this.transition = true

        this.camPos.x = e.object.position.x
        // this.camLookAt.x = e.object.position.x
        this.slant = 0
    

    }



    onWheel(e){

        if(Common.isInGallery == true){
            this.slant = 0;
            if(this.scrollEnabled == true){
                this.camPos.y -= e/200;
            }
        } else {
            this.slant = -3;
            if(this.scrollEnabled == true){
                this.camPos.x += e/200;
            }
        }


        // this is to check if the camera has entered the thumbnails
        if(this.camPos.y >= 0){
            console.log('top switch')
            EventBus.$emit("ISINGALLERY", false);
        } else if (this.camPos.y <= - Gallery.sectionWidth - 10){
            console.log('bottom switch')
            EventBus.$emit("ISINGALLERY", false);
        }





    }
    mouseMove(e){

        this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    }





    loop(){
        
        let breathing = Math.sin(Date.now() * 0.0012) * Math.PI * 0.02;
        console.log(this.camPos.y, Common.camera.position.y)



        if(this.scrollEnabled == true){

            this.camPos.z = 20

             
            if(Common.isInGallery == false){
                if(this.transition == false){
                    Common.camera.position.x = lerp(Common.camera.position.x, this.camPos.x + this.mouse.x / 2 + this.slant, 0.08);
                    Common.camera.position.y = lerp(Common.camera.position.y, this.mouse.y / 2 + breathing + this.camPos.y, 0.08);
                    this.camLookAt.x = lerp(this.camLookAt.x, this.camPos.x + this.mouse.x * 1.8, 0.3);
                }
            } else {

                if(this.transition == false){
                    Common.camera.position.y = lerp(Common.camera.position.y, this.camPos.y + this.mouse.y / 2 + breathing, 0.08);
                } else {
                    Common.camera.position.x = lerp(Common.camera.position.x, this.camPos.x + this.slant, 0.08);
                }
                
            }
         
        } 

        
        
        
        
        
        
        // this is for the intro page
        else {
            this.camPos.z = 40
            this.camPos.x += 0.01;

            Common.camera.position.x = lerp(Common.camera.position.x,this.camPos.x + this.mouse.x / 2, 0.08);

            if(Common.isInGallery == false){
                this.camLookAt.x = lerp(this.camLookAt.x, this.camPos.x + this.mouse.x * 1.8, 0.3);
            }
        }

        // slow the transition between thumbnails and gallery
        if(this.transition == true){
            this.camPos.y = -10
            Common.camera.position.y = lerp(Common.camera.position.y, this.camPos.y, 0.07);
            this.camLookAt.y = lerp(this.camLookAt.y, this.camPos.y, 0.1);
            this.camLookAt.x = lerp(this.camLookAt.x, this.camPos.x, 0.1);

            if (this.transition) {
                setTimeout(() => { this.transition = false }, 1000);
            }

        }
 
        Common.camera.position.z = lerp(Common.camera.position.z, this.camPos.z / 2, 0.08);


        if (Common.isInGallery == false){
            this.camLookAt.y = lerp(this.camLookAt.y, this.mouse.y * 1.8 + breathing + this.camPos.y, 0.3);
        } else if (Common.isInGallery == true) {
            if(this.transition == false){
                this.camLookAt.y = lerp(this.camLookAt.y, this.camPos.y, 0.3);
            }
        }

        Common.camera.lookAt(this.camLookAt.x, this.camLookAt.y, 0)
 
    }
}



export default new Camera();