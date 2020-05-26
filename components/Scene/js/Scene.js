import * as THREE from 'three'
import Common from "./Common"
import Shape from "./elements/Shape"
import Model_1 from "./elements/Model_1"
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

        this.camPos = {
            x: 0,
            y: 0,
            z: 0
        }

        EventBus.$on("TRANSITION", this.onTransition.bind(this));

        Common.init(this.props.$canvas);
        this.shape = new Shape();
        this.model_1 = new Model_1();

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
                this.camPos.x = 0;
            break;
            case "about":
                this.camPos.x = 1;
            break;
            case "contact":
                this.camPos.x = 2;
            break;
        }
    }

    loop(){
        this.render();
        requestAnimationFrame(this.loop.bind(this));
        this.camPos.x += Wheel.wheelSpeed/400;
        const easing = Math.min(1.0, 3.5 * Common.time.delta)
        Common.camera.position.x = lerp(Common.camera.position.x, this.camPos.x, easing);
    }

    render(){
        Common.render();
        Wheel.loop();
    }
}