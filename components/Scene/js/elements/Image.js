import * as THREE from "three";
import Common from "../Common";


export default class Image{
    constructor(){
        this.init();
    }

    init(){
    }

    addObject(image){

        this.material = new THREE.MeshBasicMaterial({map: image})
        this.mesh = new THREE.Mesh(this.geometry, this.material)

        Common.scene.add(this.mesh);    
    }

}