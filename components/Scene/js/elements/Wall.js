import * as THREE from "three";
import Common from "../Common";
import EventBus from "~/utils/event-bus"
import { lerp, smoothStep } from 'math-toolbox'

export default class Wall{

    constructor(){
        this.wall = null;
        this.pointer = null;
        this.rayWall = new THREE.Vector2();
        this.rayImage = new THREE.Vector2();
        this.isOnImg = false;
        this.hoveredImg = null;
        this.pr = 0;
        this.ps = 1;
        this.isLoading = false;

        this.imgScale = 1;
        
        this.init();
    }

    init(){
        
        EventBus.$on("RAYCASTERWALL", this.onRayCastWall.bind(this));
        EventBus.$on("RAYCASTERIMAGE", this.onRayCastImage.bind(this));
        // EventBus.$on("WHEELSPEED", this.wheeled.bind(this));
        EventBus.$on("LOADINGGALLERY", this.loader.bind(this));

        this.wall = new THREE.Mesh(new THREE.PlaneBufferGeometry(50,50), new THREE.MeshBasicMaterial({color: 0xffffff}));
        this.wall.visible = false;
        this.wall.position.z = -0.1;
        this.wall.name = 'wall';
        Common.scene.add(this.wall);

        this.pointer = new THREE.Mesh(new THREE.SphereBufferGeometry(0.1, 3, 2, 1, 6.3, 0),new THREE.MeshNormalMaterial());

        Common.scene.add(this.pointer);


    }

    loader(e){
        if(e == false){
            this.isLoading = true;
        } else {
            this.isLoading = false;
        }
    }

    onRayCastWall(e){
        if(e != false){
            this.rayWall.x = e.point.x;
            this.rayWall.y = e.point.y;
        }
    }
    onRayCastImage(e){

        this.imgScale = lerp(this.imgScale, 1.2, 0.07);
        // e.object.scale.x = this.imgScale
        if(e == false){
            this.isOnImg = false;
            EventBus.$emit("ISONIMG", this.isOnImg);
        } else {
            this.hoveredImg = e.object;
            
            this.isOnImg = true;
            EventBus.$emit("ISONIMG", this.isOnImg);
        }
        
    }

    loop(){
        this.wall.position.x = Common.camera.position.x;
        this.wall.position.y = Common.camera.position.y;

        this.pointer.rotation.y = this.pr;
        this.pointer.scale.set(this.ps,this.ps,this.ps)
        console.log(this.pointer.scale)

        if(this.isLoading == true){
            this.pr += 0.08;
            this.ps = lerp(this.ps, Math.sin(Date.now() * 0.008) * Math.PI * 1, .07);
        } else {
            this.ps = lerp(this.ps, 1, 0.2)
        }

        if(Common.isTouch == false){
            if(Common.isInGallery == false){
                if(this.isOnImg == false){
                    this.breathing = 0;
                    this.pointer.position.x = lerp(this.pointer.position.x, this.rayWall.x, 0.1);
                    this.pointer.position.y = lerp(this.pointer.position.y, this.rayWall.y + this.breathing, 0.1);
                } else {
                    // console.log('image', Common.isInGallery)
                    this.breathing = Math.sin(Date.now() * 0.003) * Math.PI * 0.02;
                    this.pr += 0.05;
                    this.pointer.position.x = lerp(this.pointer.position.x, this.hoveredImg.position.x, 0.1);
                    this.pointer.position.y = lerp(this.pointer.position.y, this.hoveredImg.position.y + this.hoveredImg.geometry.parameters.height/2 + this.breathing + 0.2, 0.1);
                    
                }
            } else {

                this.breathing = 0;
                // console.log('wall', Common.isInGallery)
                this.pointer.position.x = lerp(this.pointer.position.x, this.rayWall.x, 0.1);
                this.pointer.position.y = lerp(this.pointer.position.y, this.rayWall.y + this.breathing, 0.1);
            }
        } else {
            this.pointer.position.x = lerp(this.pointer.position.x, Common.camera.position.x + 3, 0.1);
            this.pointer.position.y = lerp(this.pointer.position.y, Common.camera.position.y, 0.1);
        }   
    }
}