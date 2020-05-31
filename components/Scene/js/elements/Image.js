import * as THREE from "three";
import Common from "../Common";
import EventBus from "~/utils/event-bus"
import loadImage from 'image-promise';


export default class Image{
    constructor(){
        this.mesh = null;
        this.dummy = new THREE.Object3D();
        this.sectionWidth = 20;
        this.loopSectionPosition;
        this.init();

        this.textureKeys = ['map', 'normalMap']; 

    }

    init(){
        // this.loadImages()
        this.addInstancedMesh()
    }

    addInstancedMesh() {
        this.loadTexture('../images/img7.jpg').then(texture => {
            console.log(texture)
            let width = texture.image.naturalWidth
            let height = texture.image.naturalHeight
            let aspect = width/height
            this.mesh_1 = new THREE.InstancedMesh(new THREE.PlaneBufferGeometry(3,aspect*3), new THREE.MeshBasicMaterial({ map: texture }), 4);
            Common.scene.add(this.mesh_1);

            this.setInstancedMeshPositions(this.mesh_1);
        })
        this.loadTexture('../images/img8.jpg').then(texture => {
            console.log(texture)
            let width = texture.image.naturalWidth
            let height = texture.image.naturalHeight
            let aspect = width/height
            this.mesh_2 = new THREE.InstancedMesh(new THREE.PlaneBufferGeometry(3,aspect*3), new THREE.MeshBasicMaterial({ map: texture }), 4);
            this.mesh_2.position.x = 10;
            Common.scene.add(this.mesh_2);

            this.setInstancedMeshPositions(this.mesh_2);
        })

        
    }
      
    setInstancedMeshPositions(mesh, section) {
        for ( var i = 0; i < mesh.count; i ++ ) {
            var xStaticPosition = -this.sectionWidth * (i - 1);
            var xSectionPosition = this.sectionWidth * section;
            var x = xStaticPosition + xSectionPosition;
            this.dummy.position.set(x, 0, 0);
            this.dummy.updateMatrix();
            mesh.setMatrixAt( i, this.dummy.matrix );
        }
        mesh.instanceMatrix.needsUpdate = true;
    }

    loadTexture(url) {
        return new Promise(resolve => {
            new THREE.TextureLoader().load(url, resolve)
        })
    }
    
    update(){
        var distance = Math.round(Common.camera.position.x / this.sectionWidth)
        if (distance !== this.loopSectionPosition) {
            if(this.mesh_1){
                this.mesh_1.instanceMatrix.needsUpdate = true;
                this.loopSectionPosition = distance
                this.setInstancedMeshPositions(this.mesh_1, this.loopSectionPosition)
            }
            if(this.mesh_2){
                this.mesh_2.instanceMatrix.needsUpdate = true;
                this.loopSectionPosition = distance
                this.setInstancedMeshPositions(this.mesh_2, this.loopSectionPosition)
            }
        }
    }

}