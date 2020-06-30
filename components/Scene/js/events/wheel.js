import * as THREE from 'three'
import Common from '../Common'
import Scene from '../Scene'


if (process.browser) {
    Hammer = require('hammerjs');
} 
import EventBus from "~/utils/event-bus"


class Wheel{


    constructor(){
        // this.wheeled = 0;
        this.wheelSpeed = 0;
        this.stopWheelTimer;
        this.panned = 0;
    }

    init(){
        document.addEventListener("wheel", this.onWheel.bind(this));
        let hammertime = new Hammer(Common.renderer.domElement);
        hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
        hammertime.on('pan', this.panMove.bind(this));
    }

    onStopWheel(){
        this.wheelSpeed = 0;
    }
    
    onWheel(e){

        // this.wheeled += e.deltaY
        this.wheelSpeed = e.deltaY;

        if(this.stopWheelTimer!==undefined){
            clearTimeout(this.stopWheelTimer);
        };
        
        this.stopWheelTimer = setTimeout(() => this.onStopWheel(), 200);
        EventBus.$emit("WHEELSPEED", this.wheelSpeed);

    }

    panMove(e){
        
        this.panned = + e.velocityX + e.velocityY;
        EventBus.$emit("PANNED", this.panned);

    }
}

export default new Wheel();

