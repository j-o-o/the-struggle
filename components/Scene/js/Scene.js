import * as THREE from 'three'
import Common from "./Common"
import Shape from "./elements/Shape"
import Image from "./elements/Image"
import Pointer from "./events/pointer"
import Wheel from "./events/wheel"
import { lerp } from 'math-toolbox'
// import Raycaster from './events/raycaster'
import EventBus from "~/utils/event-bus"



export default class Scene{

    constructor(props){
        this.props = props;
        this.init();

    }

    init(){
        this.CamPos = new THREE.Vector3();
        EventBus.$on("TRANSITION", this.onTransition.bind(this));

        Common.init(this.props.$canvas);
        this.shape = new Shape();
        this.image = new Image();


        window.addEventListener("resize", this.resize.bind(this));

        Pointer.init();
        Wheel.init();
        this.loop();
    }

    resize(){
        Common.resize();
    }

    onTransition(path){
        switch(path){
            case "index": 
                this.CamPos.x = 0;
            break;
            case "about":
                this.CamPos.x = 1;
            break;
            case "contact":
                this.CamPos.x = 2;
            break;
        }
    }

    loop(){
        this.render();
        requestAnimationFrame(this.loop.bind(this));
        const easing = Math.min(1.0, 3.5 * Common.time.delta)
        Common.camera.position.x = lerp(Common.camera.position.x, this.CamPos.x, easing);
        // console.log(Common.camera.position.x)
    }

    render(){
        Common.render();
        Wheel.loop();
    }
    update(){
    }

}