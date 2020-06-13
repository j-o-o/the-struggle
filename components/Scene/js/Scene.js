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

export default class Scene{

    constructor(props){

        this.props = props;
        this.init();

    }

    init(){

        Common.init(this.props.$canvas);

        // this.scene = new Scene()

        EventBus.$on("TRANSITION", this.onTransition.bind(this));

        EventBus.$on("SCROLLENABLED", this.isScrollEnabled.bind(this));


        window.addEventListener("resize", this.resize.bind(this));
        // EventBus.$on("ISONIMG", this.isOnImg.bind(this));

        this.stats = new Stats();
        var element = document.getElementById('stats')
        element.appendChild( this.stats.dom )

        this.camera = new Camera();
        
        // this.shape = new Shape();
        this.image = new Image();
        this.wall = new Wall();
        // this.ground = new Ground();
        // Image.init()
        Pointer.init();
        Wheel.init();

        this.loop();






    }

    isScrollEnabled(e){this.scrollEnabled=e;        
        if (this.scrollEnabled == true){
            EventBus.$on("RAYCASTERIMAGECLICK", this.onClickImage.bind(this));
        }
    }

    onClickImage(e){
        console.log(e)
        console.log(e.object.id)

        Common.isInGallery = true;
        this.camera.camPos.y -= 6

        this.onLoadProject(e.object.id);

    }

    onLoadProject(e){
        console.log(e)
        this.gallery = new Gallery();
        this.gallery.init()
    }




    // isOnImg(e){
    //     console.log(e)
    // }

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
                EventBus.$emit("SCROLLENABLED", true);
            break;
            case "exhibition-id":
                EventBus.$emit("SCROLLENABLED", true);
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