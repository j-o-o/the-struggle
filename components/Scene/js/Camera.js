import * as THREE from 'three'
import Common from "./Common"
// import Shape from "./elements/Shape"

import Image from "./elements/Image"
import Wall from "./elements/Wall"
// import Ground from "./elements/Ground"

import Pointer from "./events/pointer"
import Wheel from "./events/wheel"
import { lerp } from 'math-toolbox'
// import Raycaster from './events/raycaster'
import EventBus from "~/utils/event-bus"

export default class Camera{

    constructor(){
    
        this.wheeled = 0;
        this.slant = -3;
        this.camPos = new THREE.Vector3();
        this.camLookAt = new THREE.Vector3();
        this.mouse = new THREE.Vector2();

        this.init();

    }

    init(){

        EventBus.$on("WHEELSPEED", this.onWheel.bind(this));
        EventBus.$on("MOUSEMOVE", this.mouseMove.bind(this));
        EventBus.$on("SCROLLENABLED", this.isScrollEnabled.bind(this));

    }

    isScrollEnabled(e){this.scrollEnabled=e}

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
    }
    mouseMove(e){

        this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    }


    loop(){
        // const easing = Math.min(1.0, 3.5 * Common.time.delta)
        let breathing = Math.sin(Date.now() * 0.0012) * Math.PI * 0.02;


        if(this.scrollEnabled == true){

            this.camPos.z = 20

            if(this.camPos.y >= 0){
                EventBus.$emit("ISINGALLERY", false);
            }
             
            if(Common.isInGallery == false){
                Common.camera.position.x = lerp(Common.camera.position.x, this.camPos.x + this.mouse.x / 2 + this.slant, 0.08);
                Common.camera.position.y = lerp(Common.camera.position.y, this.mouse.y / 2 + breathing, 0.08);
                this.camLookAt.x = lerp(this.camLookAt.x, this.camPos.x + this.mouse.x * 1.8, 0.3);
            } else {
                Common.camera.position.x = lerp(Common.camera.position.x, this.camPos.x + this.mouse.x / 2 + this.slant, 0.08);
                Common.camera.position.y = lerp(Common.camera.position.y, this.camPos.y + this.mouse.y / 2 + breathing, 0.08);
                // this.camLookAt.x = lerp(this.camLookAt.x, this.camPos.x + this.mouse.x * 1.8, 0.3);
            }
         
        } 
        
        
        
        
        
        
        
        
        else {
            this.camPos.z = 40
            this.camPos.x += 0.01;

            Common.camera.position.x = lerp(Common.camera.position.x,this.camPos.x + this.mouse.x / 2, 0.08);

            if(Common.isInGallery == false){
                this.camLookAt.x = lerp(this.camLookAt.x, this.camPos.x + this.mouse.x * 1.8, 0.3);
            }

        }
 
        Common.camera.position.z = lerp(Common.camera.position.z, this.camPos.z / 2, 0.08);

        if(Common.isInGallery == false){
            this.camLookAt.y = lerp(this.camLookAt.y, this.mouse.y * 1.8 + breathing, 0.3);
        } else {
            this.camLookAt.y = lerp(this.camLookAt.y, this.camPos.y, 0.3);
        }

        Common.camera.lookAt(this.camLookAt.x, this.camLookAt.y, 0)
 
    }
}