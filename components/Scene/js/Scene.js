import Common from "./Common"

import Gallery from "./elements/gallery"
import Wall from "./elements/Wall"
import Camera from "./Camera"

import Pointer from "./events/pointer"
import Wheel from "./events/wheel"
import EventBus from "~/utils/event-bus"

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

        this.wall = new Wall();
        
        Pointer.init();
        Wheel.init();

        this.loop();

    }

    isScrollEnabled(e){
        this.scrollEnabled = e
    }

    onClickImage(e){
        if (this.scrollEnabled == true && Common.isInGallery == false){

            EventBus.$emit("ISINGALLERY", true);
            EventBus.$emit("CLICKEDID", e.object.uuid);
            EventBus.$emit("RAYCASTERIMAGE", false);

            Common.isInGallery = true;
            Gallery.load(e);
            
        }
    }


    isItInGallery(e){
        if(e == false){
            for( var i = Common.scene.children.length - 1; i >= 0; i--) { 
                var obj = Common.scene.children[i];
                if (obj.name == "gallery") {
                    obj.geometry.dispose();
                    obj.material.dispose();
                    Common.scene.remove(obj);
                }
            }
        }
    }





    loop(){
        this.render();

        this.wall.loop();
        Pointer.loop();
        Camera.loop();

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
        Camera.autoScrollEnabled = true
        // console.log('transition')
        switch(path.name){
            case "index":
                EventBus.$emit("SCROLLENABLED", false);
                //EventBus.$emit("ISTOUCH", false);
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
            case "0": 
                Camera.camPos.x = 0
            break;
            case "1":
                Camera.camPos.x = 10
            break;
            case "2":
                Camera.camPos.x = 20
            break;
            case "3":
                Camera.camPos.x = 30
            break;
            case "4":
                Camera.camPos.x = 40
            break;
            case "5":
                Camera.camPos.x = 50
            break;
            case "6":
                Camera.camPos.x = 60
            break;
            case "7":
                Camera.camPos.x = 70
            break;
            case "8":
                Camera.camPos.x = 80
            break;
            case "9":
                Camera.camPos.x = 90
            break;
            case "10":
                Camera.camPos.x = 100
            break;
            case "11":
                Camera.camPos.x = 110
            break;
            case "12":
                Camera.camPos.x = 120
            break;
            case "13":
                Camera.camPos.x = 130
            break;
            case "14":
                Camera.camPos.x = 140
            break;
        }
    }

}