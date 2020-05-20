import * as THREE from "three";
import Common from "../Common";


export default class Shape{
    constructor(){
        this.init();
    }

    init(){

        this.amount = 2;
        this.count = Math.pow( this.amount, 3 );

        console.log(this.amount, this.count)
        this.geometry = new THREE.SphereBufferGeometry( 0.5 );
        this.material = new THREE.MeshNormalMaterial();
        this.mesh = new THREE.InstancedMesh( this.geometry, this.material, this.count );
        

        var i = 0;
        var offset = ( this.amount - 1 ) / 2;
        var transform = new THREE.Object3D();
        for ( var x = 0; x < this.amount; x ++ ) {
            for ( var y = 0; y < this.amount; y ++ ) {
                for ( var z = 0; z < this.amount; z ++ ) {
                    transform.position.set( offset - x, offset - y, offset - z );
                    transform.updateMatrix();
                    this.mesh.setMatrixAt( i ++, transform.matrix );
                }
            }
        }
        Common.scene.add(this.mesh);

    }

}