import * as THREE from "three";
import EventBus from "~/utils/event-bus"

class Common{
    constructor(){
        this.scene = null;
        this.camera = null;
        this.renderer = null;

        this.isInGallery = false;

        this.size = {
            windowW: null,
            windowH: null
        };

        this.clock = null;

        this.time = {
            total: null,
            delta: null
        };
    }

    init($canvas){

        this.setSize();
        
        this.fov = 55;
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            this.fov, 
            this.size.windowW / this.size.windowH,
            0.01, 
            10000
        );
        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(this.scene.position);

        this.renderer = new THREE.WebGLRenderer({
            canvas: $canvas
        });

        this.renderer.setPixelRatio(window.devicePixelRatio);
        
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(this.size.windowW, this.size.windowH);

        this.clock = new THREE.Clock();
        this.clock.start();

        EventBus.$on("ISINGALLERY", this.isItInGallery.bind(this));
        
    }

    setSize(){
        this.size = {
            windowW: window.innerWidth,
            windowH: window.innerHeight
        }
    }

    isItInGallery(e){
        this.isInGallery = e;
    }



    resize(){
        this.setSize();
        this.camera.aspect = this.size.windowW / this.size.windowH;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.size.windowW, this.size.windowH);
    }

    render(){
        this.time.delta = this.clock.getDelta();
        this.time.total += this.delta;
        this.renderer.render(this.scene, this.camera);
    }
}

export default new Common();