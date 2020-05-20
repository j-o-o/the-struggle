import * as THREE from "three";
import Common from "../Common";


export default class Image{
    constructor(){
        this.init();
    }

    init(){
        // const image = './assets/images/mage_1f9d9.jpg';
        // const loader = new THREE.ImageLoader().load(image, this.addObject(image));
        // this.geometry = new THREE.PlaneBufferGeometry(1,1)
        

    }

    addObject(image){

        this.material = new THREE.MeshBasicMaterial({map: image})
        this.mesh = new THREE.Mesh(this.geometry, this.material)

        Common.scene.add(this.mesh);    
    }

}