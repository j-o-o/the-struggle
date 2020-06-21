
import * as THREE from "three";
import Common from "../Common"

export default class Ground{

    constructor(){
        
        this.init();
    }

    init(){

        const position = -2;

        this.cubeCamera = new THREE.CubeCamera(0.01, 100, 1240); 
        this.cubeCamera.position.y = position;
        Common.scene.add(this.cubeCamera);

        var geometry = new THREE.BoxBufferGeometry(1,1,1)
        var material = new THREE.MeshBasicMaterial()
        material.map = this.cubeCamera.renderTarget.texture;
        var mirror = new THREE.Mesh(geometry,material)
        mirror.position.y = position;
        Common.scene.add(mirror)


    }

    render(){
        this.cubeCamera.update(Common.renderer, Common.scene);
    }
}