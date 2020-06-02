import * as THREE from "three";
import Common from "../Common";
import EventBus from "~/utils/event-bus"
import { lerp } from 'math-toolbox'

export default class Wall{

    constructor(){
        this.wall = null
        this.pointer = null
        this.rayWall = new THREE.Vector2()
        this.rayImage = new THREE.Vector2()
        this.isOnImg = false
        this.hoveredImg = null
        this.pr = 0
        
        this.init();
    }


    init(){
        EventBus.$on("RAYCASTERWALL", this.onRayCastWall.bind(this));
        EventBus.$on("RAYCASTERIMAGE", this.onRayCastImage.bind(this));
        this.wall = new THREE.Mesh(new THREE.PlaneBufferGeometry(50,50), new THREE.MeshNormalMaterial({wireframe:true}))
        this.wall.position.z = 0.5;
        this.wall.name = 'wall'
        Common.scene.add(this.wall)

        this.pointer = new THREE.Mesh(new THREE.SphereBufferGeometry(0.1, 3, 2, this.thetaStart, 6.3, 0),new THREE.MeshNormalMaterial())
        this.pointer.position.z = 0.5;
        
        Common.scene.add(this.pointer)

    }

    onRayCastWall(e){
        this.rayWall.x = e.point.x
        this.rayWall.y = e.point.y
    }
    onRayCastImage(e){
        if(e == false){
            this.isOnImg = false
        } else {

            this.hoveredImg = e.object
            this.isOnImg = true

        }
        // this.rayImage.x = e.point.x
        // this.rayImage.y = e.point.y
    }

    loop(){
        this.wall.position.x = Common.camera.position.x
        if(this.isOnImg == false){
            this.pointer.position.x = lerp(this.pointer.position.x, this.rayWall.x, 0.1)
            this.pointer.position.y = lerp(this.pointer.position.y, this.rayWall.y, 0.1)
        } else {
            this.pr += 0.05
            this.pointer.rotation.y = this.pr
            console.log(this.pointer.geometry.parameters.thetaStart)
            this.pointer.position.x = lerp(this.pointer.position.x, this.hoveredImg.position.x, 0.1)
            this.pointer.position.y = lerp(this.pointer.position.y, this.hoveredImg.geometry.parameters.height/2 + 0.2, 0.1)
            // this.pointer.position = this.hoveredImg

        }
    }
}