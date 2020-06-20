import * as THREE from "three";
import Common from "../Common";
import EventBus from "~/utils/event-bus"
import { lerp, smoothStep } from 'math-toolbox'

export default class Wall{

    constructor(){
        this.wall = null
        this.pointer = null
        this.rayWall = new THREE.Vector2()
        this.rayImage = new THREE.Vector2()
        this.isOnImg = false
        this.hoveredImg = null
        this.pr = 0
        this.ps = 1
        this.isLoading = false

        this.imgScale = 1
        
        this.init();
    }

    init(){
        
        EventBus.$on("RAYCASTERWALL", this.onRayCastWall.bind(this));
        EventBus.$on("RAYCASTERIMAGE", this.onRayCastImage.bind(this));
        EventBus.$on("WHEELSPEED", this.wheeled.bind(this));
        EventBus.$on("LOADINGGALLERY", this.loader.bind(this))

        this.wall = new THREE.Mesh(new THREE.PlaneBufferGeometry(50,50), new THREE.MeshBasicMaterial({color: 0xffffff}))
        this.wall.visible = false;
        this.wall.position.z = -0.1;
        this.wall.name = 'wall'
        Common.scene.add(this.wall)

        this.pointer = new THREE.Mesh(new THREE.SphereBufferGeometry(0.1, 3, 2, 1, 6.3, 0),new THREE.MeshNormalMaterial())
        // this.pointer.position.z = -0.1;

        Common.scene.add(this.pointer)


    }

    wheeled(e){
        this.pr += e/100
    }

    loader(e){
        console.log(e)
        if(e == false){
            this.isLoading = true
        } else {
            this.isLoading = false
        }
    }

    onRayCastWall(e){
        if(e != false){
            this.rayWall.x = e.point.x
            this.rayWall.y = e.point.y
        }
    }
    onRayCastImage(e){

        this.imgScale = lerp(this.imgScale, 1.2, 0.07);
        // e.object.scale.x = this.imgScale

        if(e == false){
            this.isOnImg = false
            EventBus.$emit("ISONIMG", this.isOnImg);
        } else {
            this.hoveredImg = e.object
            
            this.isOnImg = true
            EventBus.$emit("ISONIMG", this.isOnImg);
        }
        // this.rayImage.x = e.point.x
        // this.rayImage.y = e.point.y
    }

    loop(){
        this.wall.position.x = Common.camera.position.x
        this.wall.position.y = Common.camera.position.y

        this.pointer.rotation.y = this.pr

        if(this.isLoading == true){
            this.pr += 0.08
        }


        if(this.isOnImg == false){
            this.breathing = 0
            this.pointer.position.x = lerp(this.pointer.position.x, this.rayWall.x, 0.1)
            this.pointer.position.y = lerp(this.pointer.position.y, this.rayWall.y + this.breathing, 0.1)
        } else {
            this.breathing = Math.sin(Date.now() * 0.003) * Math.PI * 0.02
            this.pr += 0.05
            this.pointer.position.x = lerp(this.pointer.position.x, this.hoveredImg.position.x, 0.1)
            this.pointer.position.y = lerp(this.pointer.position.y, this.hoveredImg.position.y + this.hoveredImg.geometry.parameters.height/2 + this.breathing + 0.2, 0.1)
        }
    }
}