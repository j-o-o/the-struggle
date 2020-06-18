import * as THREE from 'three'
import Common from "./Common"

import Image from "./elements/Image"
import Gallery from "./elements/Gallery"
import Wall from "./elements/Wall"
import Camera from "./Camera"

import Pointer from "./events/pointer"
import Wheel from "./events/wheel"
import { lerp } from 'math-toolbox'
import EventBus from "~/utils/event-bus"

import Stats from 'stats.js'

export default class Scene{

    constructor(props){

        this.props = props;
        this.init();

    }

    init(){

        Common.init(this.props.$canvas);

        EventBus.$on("TRANSITION", this.onTransition.bind(this));
        EventBus.$on("SCROLLENABLED", this.isScrollEnabled.bind(this));
        EventBus.$on("ISINGALLERY", this.isItInGallery.bind(this));
        EventBus.$on("RAYCASTERIMAGECLICK", this.onClickImage.bind(this));

        window.addEventListener("resize", this.resize.bind(this));

        this.stats = new Stats();
        let element = document.getElementById('stats')
        element.appendChild( this.stats.dom )

        this.wall = new Wall();
        
        Pointer.init();
        Wheel.init();

        this.loop();

        // if (this.scrollEnabled == true){
        // }

    }

    isScrollEnabled(e){
        this.scrollEnabled=e;
    }

    onClickImage(e){
        // console.log('scene js')
        if (this.scrollEnabled == true){

            EventBus.$emit("ISINGALLERY", false);
            
            Common.isInGallery = true;
            Gallery.load(e)
        }
    }


    isItInGallery(e){

        // destroy gallery if back in thumbnails
        if(e == false){
            for( var i = Common.scene.children.length - 1; i >= 0; i--) { 
                var obj = Common.scene.children[i];
                if (obj.name == "gallery") {
                    obj.geometry.dispose()
                    obj.material.dispose()
                    Common.scene.remove(obj)
                }
            }
        }
    }




    loop(){

        this.stats.begin();
    
        this.render();

        this.wall.loop();
        Pointer.loop();
        Camera.loop();

        // console.log('Camera position: ', Common.camera.position.y, 'Global Height: ', Gallery.globalHeight, 'Section Height: ', Gallery.sectionHeight)

	    this.stats.end();
        requestAnimationFrame(this.loop.bind(this));

    }

    render(){
        Common.render();
    }

    resize(){
        Common.resize();
    }


    

    onTransitionEnd( event ) {

	    event.target.remove();
	
    }


    onTransition(path){
        switch(path.name){
            case "index":
                EventBus.$emit("SCROLLENABLED", false);
            break;
            case "exhibition":
                setTimeout(function(){
                    EventBus.$emit("SCROLLENABLED", true);
                }, 1000)
            break;
            case "exhibition-id":
                setTimeout(function(){
                    EventBus.$emit("SCROLLENABLED", true);
                }, 1000)
            break;
        }
        switch(path.params.id){
            case "1": 
                Camera.camPos.x = 0
            break;
            case "2":
                Camera.camPos.x = 10
            break;
            case "3":
                Camera.camPos.x = 20
            break;
            case "4":
                Camera.camPos.x = 30
            break;
            case "5":
                Camera.camPos.x = 40
            break;
            case "6":
                Camera.camPos.x = 50
            break;
            case "7":
                Camera.camPos.x = 60
            break;
            case "8":
                Camera.camPos.x = 70
            break;
            case "9":
                Camera.camPos.x = 80
            break;
            case "10":
                Camera.camPos.x = 90
            break;
        }
    }

}