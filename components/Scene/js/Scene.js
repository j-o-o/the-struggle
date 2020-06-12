import * as THREE from 'three'
import Common from "./Common"
// import Shape from "./elements/Shape"

import Image from "./elements/Image"
import Wall from "./elements/Wall"

import Pointer from "./events/pointer"
import Wheel from "./events/wheel"
import { lerp } from 'math-toolbox'
// import Raycaster from './events/raycaster'
import EventBus from "~/utils/event-bus"

import Stats from 'stats.js'

export default class Scene{

    constructor(props){
        this.props = props;
        this.wheeled = 0;
        this.camPos = new THREE.Vector3();
        this.camLookAt = new THREE.Vector3();
        this.mouse = new THREE.Vector2();

        this.scrollEnabled = false
        
        this.init();
    }

    init(){

        EventBus.$on("MOUSEMOVE", this.mouseMove.bind(this));
        EventBus.$on("WHEELSPEED", this.onWheel.bind(this));
        EventBus.$on("TRANSITION", this.onTransition.bind(this));
        window.addEventListener("resize", this.resize.bind(this));
        // EventBus.$on("ISONIMG", this.isOnImg.bind(this));

        this.stats = new Stats();
        var element = document.getElementById('stats')
        element.appendChild( this.stats.dom )

        Common.init(this.props.$canvas);
        // this.shape = new Shape();
        this.image = new Image()
        this.wall = new Wall();
        // Image.init()
        Pointer.init();
        Wheel.init();

        this.loop();

    }

    loadImages(e){
        console.log(e)
    }

    mouseMove(e){

        this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    }
    onWheel(e){
        if(this.scrollEnabled == true){
            this.camPos.x += e/200;
        }
    }

    // isOnImg(e){
    //     console.log(e)
    // }

    loop(){

	    this.stats.begin();
        
        this.render();
        // const easing = Math.min(1.0, 3.5 * Common.time.delta)

        if(this.scrollEnabled == true){
            Common.camera.position.x = lerp(Common.camera.position.x, this.camPos.x + this.mouse.x / 2, 0.08);
            Common.camera.position.y = lerp(Common.camera.position.y, this.mouse.y / 2, 0.08);
            this.camLookAt.x = lerp(this.camLookAt.x, this.camPos.x + this.mouse.x * 1.8, 0.3);
        } else {
            this.camPos.x += 0.01;
            Common.camera.position.x = lerp(Common.camera.position.x,this.camPos.x + this.mouse.x / 2, 0.08);
            this.camLookAt.x = lerp(this.camLookAt.x, this.camPos.x + this.mouse.x * 1.8, 0.3);
        }

        Common.camera.position.z = lerp(Common.camera.position.z, this.camPos.z / 2, 0.08);
        this.camLookAt.y = lerp(this.camLookAt.y, this.mouse.y * 1.8, 0.3);

        Common.camera.lookAt(this.camLookAt.x, this.camLookAt.y, 0)

        // Common.camera.lookAt = lerp(Common.camera.lookAt, this.pointer.position.x,this.pointer.position.y,this.pointer.position.z, 0.1)

	    this.stats.end();
        requestAnimationFrame(this.loop.bind(this));
    }

    render(){
        Common.render();
        // Wheel.loop();
        this.wall.loop();
        // this.image.update();
        Pointer.loop();
    }

    resize(){
        Common.resize();
    }


    

    onTransition(path){
        switch(path.name){
            case "index":
                this.scrollEnabled = false
                this.camPos.z = 40
            break;
            case "exhibition":
                this.scrollEnabled = true
                this.camPos.z = 20
            break;
            case "exhibition-id":
                this.scrollEnabled = true
                this.camPos.z = 20
            break;
        }
        switch(path.params.id){
            case "1": 
                this.camPos.x = 0
            break;
            case "2":
                this.camPos.x = 10
            break;
            case "3":
                this.camPos.x = 20
            break;
            case "4":
                this.camPos.x = 30
            break;
            case "5":
                this.camPos.x = 40
            break;
            case "6":
                this.camPos.x = 50
            break;
            case "7":
                this.camPos.x = 60
            break;
            case "8":
                this.camPos.x = 70
            break;
            case "9":
                this.camPos.x = 80
            break;
            case "10":
                this.camPos.x = 90
            break;
        }
    }

}