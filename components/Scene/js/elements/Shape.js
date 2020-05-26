import * as THREE from "three";
import Common from "../Common";

import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
// const ImprovedNoise = require('three/examples/jsm/math/ImprovedNoise.js')

import vertexShader from "../glsl/shape.vert";
import fragmentShader from "../glsl/shape.frag";


export default class Shape{
    constructor(){
        this.init();
    }

    init(){

        var data = this.generateHeight( 10, 10 );


        let geometry = new THREE.PlaneBufferGeometry(10,10,20,20);
        var vertices = geometry.attributes.position.array;
        let material = new THREE.MeshNormalMaterial({wireframe:true})
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.rotation.x = -0.5;
        Common.scene.add(this.mesh);

    }

    generateHeight( width, height ) {

        var size = width * height, data = new Uint8Array( size ),
            perlin = new ImprovedNoise(), quality = 1, z = Math.random() * 100;

        for ( var j = 0; j < 4; j ++ ) {

            for ( var i = 0; i < size; i ++ ) {

                var x = i % width, y = ~ ~ ( i / width );
                data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );

            }

            quality *= 5;

        }

        return data;

    }

}