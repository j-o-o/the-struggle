import * as THREE from "three";
import Common from "../Common";
import EventBus from "~/utils/event-bus"


export default class Image{
    constructor(){
        this.mesh = null;
        this.dummy = new THREE.Object3D();
        this.sectionWidth = 2;
        this.loopSectionPosition;
        this.init();

    }

    init(){
        EventBus.$on("IMAGES", this.loadImages.bind(this));
        this.addInstancedMesh()
    }

    addInstancedMesh() {
        // An InstancedMesh of 4 cubes
        this.mesh = new THREE.InstancedMesh(new THREE.BoxBufferGeometry(1,1,1), new THREE.MeshNormalMaterial(), 4);
        Common.scene.add(this.mesh);
        this.setInstancedMeshPositions(this.mesh);
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


    loadImages(e){
        console.log(e)

        e.forEach(function(element){ 
            var jsonsd = JSON.parse(JSON.stringify(element))
            console.log(jsonsd)
        });
    }

    update(){
        var distance = Math.round(Common.camera.position.x / this.sectionWidth)
        if (distance !== this.loopSectionPosition) {
            this.mesh.instanceMatrix.needsUpdate = true;
            this.loopSectionPosition = distance
            this.setInstancedMeshPositions(this.mesh, this.loopSectionPosition)
        }
    }

}