import * as THREE from 'three'
import Common from "./Common"
// import Shape from "./elements/Shape"

import Image from "./elements/Image"
import Gallery from "./elements/Gallery"
import Wall from "./elements/Wall"
// import Ground from "./elements/Ground"
import Camera from "./Camera"

import Pointer from "./events/pointer"
import Wheel from "./events/wheel"
import { lerp } from 'math-toolbox'
// import Raycaster from './events/raycaster'
import EventBus from "~/utils/event-bus"

import Stats from 'stats.js'
import loadImages from 'image-promise'

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

        window.addEventListener("resize", this.resize.bind(this));
        // EventBus.$on("ISONIMG", this.isOnImg.bind(this));

        this.stats = new Stats();
        let element = document.getElementById('stats')
        element.appendChild( this.stats.dom )

        this.camera = new Camera();
        
        this.image = new Image();
        this.wall = new Wall();
        
        Pointer.init();
        Wheel.init();

        this.loop();

    }

    isScrollEnabled(e){
        this.scrollEnabled=e;    
        if (this.scrollEnabled == true){
            EventBus.$on("RAYCASTERIMAGECLICK", this.onClickImage.bind(this));
        }
    }

    onClickImage(e){
        // Common.scene.traverse(function(child) {
        //     if (child.name === "gallery") {
        //       child.geometry.dispose()
        //       child.material.dispose()
        //       Common.scene.remove( child );
        //     }
        // });
        Common.isInGallery = true;

        this.gallery = new Gallery();
        this.gallery.init(e)
    }


    isItInGallery(e){
        console.log(e)
        if(e == false){
            Common.scene.traverse(function(child) {
                if (child.name === "gallery") {
                  child.geometry.dispose()
                  child.material.dispose()
                  Common.scene.remove( child );
                }
            });
        }
    }




    loop(){

	    this.stats.begin();
        
        this.render();

        this.wall.loop();
        Pointer.loop();
        this.camera.loop();

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
                this.camera.camPos.x = 0
            break;
            case "2":
                this.camera.camPos.x = 10
            break;
            case "3":
                this.camera.camPos.x = 20
            break;
            case "4":
                this.camera.camPos.x = 30
            break;
            case "5":
                this.camera.camPos.x = 40
            break;
            case "6":
                this.camera.camPos.x = 50
            break;
            case "7":
                this.camera.camPos.x = 60
            break;
            case "8":
                this.camera.camPos.x = 70
            break;
            case "9":
                this.camera.camPos.x = 80
            break;
            case "10":
                this.camera.camPos.x = 90
            break;
        }
    }

}