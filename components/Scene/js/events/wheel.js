import * as THREE from 'three'
import Common from '../Common'


if (process.browser) {
    Hammer = require('hammerjs');
} 
import EventBus from "~/utils/event-bus"


class Wheel{


    constructor(){
        this.wheeled = 0;
        this.wheelSpeed = 0;
        this.stopWheelTimer;
    }
    init(){
        const hammertime = new Hammer(Common.renderer.domElement);

        document.addEventListener("wheel", this.onWheel.bind(this));

        hammertime.on('pan', this.panMove.bind(this) );
    }

    panMove(e){

    }

    onStopWheel(){
        this.wheelSpeed = 0;
    }
    
    onWheel(e){

        this.wheeled += e.deltaY
        this.wheelSpeed = e.deltaY

        if(this.stopWheelTimer!==undefined){
            clearTimeout(this.stopWheelTimer)
        };
        this.stopWheelTimer = setTimeout(() => this.onStopWheel(), 200);
        EventBus.$emit("WHEELED", this.wheeled);
        
    }

    // loop because the wheelspeed does not 
    // reset to 0
    loop(){
        EventBus.$emit("WHEELSPEED", this.wheelSpeed);
    }
}

export default new Wheel();

