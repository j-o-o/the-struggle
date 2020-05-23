import * as THREE from "three";
import Common from "../Common";


export default class Model_1{
    constructor(){
        this.init();
    }

    init(){

        var amount = parseInt( window.location.search.substr( 1 ) ) || 2;
        var count = Math.pow( amount, 3 );
            
        const loader = new THREE.BufferGeometryLoader();
        loader.load("/models/geometry.json", function ( obj ) {
            
            const material = new THREE.MeshNormalMaterial();
            const mesh = new THREE.InstancedMesh( obj, material, count );
            
            Common.scene.add( mesh );

            var i = 0;
            var offset = ( amount - 1 ) / 2;

            var transform = new THREE.Object3D();

            for ( var x = 0; x < amount; x ++ ) {

                for ( var y = 0; y < amount; y ++ ) {

                    for ( var z = 0; z < amount; z ++ ) {

                        transform.position.set( offset - x, offset - y, offset - z );
                        transform.updateMatrix();

                        mesh.setMatrixAt( i ++, transform.matrix );

                    }

                }

            }
        });
    }

}