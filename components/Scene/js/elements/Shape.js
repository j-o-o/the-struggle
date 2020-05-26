import * as THREE from "three";
import Common from "../Common";

import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
import SimplexNoise from '../glsl/simplexnoise.js';
// import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
// const ImprovedNoise = require('three/examples/jsm/math/ImprovedNoise.js')

import vertexShader from "../glsl/shape.vert";
import fragmentShader from "../glsl/shape.frag";
import { BoxBufferGeometry, DoubleSide } from "three";


export default class Shape{
    constructor(){
        this.init();
    }
    
    
    setupNoise() {
        // By zooming y more than x, we get the
        // appearence of flying along a valley
    }


    init(){
        // console.log(ImprovedNoise)
        // var data = this.generateHeight( 10, 10 );
        console.log(ImprovedNoise)
        this.xZoom = 9;
        this.yZoom = 9;
        this.noiseStrength = 1;
        this.simplex = new SimplexNoise();

        this.geometry = new THREE.PlaneGeometry(40,20,60,60)


        var texture = new THREE.TextureLoader().load( '../5D5854_1A1714_373330_2C2424-256px.png' );
        
        let material = new THREE.MeshMatcapMaterial({matcap:texture, side: DoubleSide})

        this.mesh = new THREE.Mesh(this.geometry, material)
        this.mesh.rotation.x = Math.PI/1.2
        Common.scene.add(this.mesh);

        this.referenceGeo = new BoxBufferGeometry(1,1,1)
        this.mesh1 = new THREE.Mesh(this.referenceGeo, material)
        Common.scene.add(this.mesh1);


    }


    
    adjustVertices(offset) {
        for (let i = 0; i < this.mesh.geometry.vertices.length; i++) {
            let vertex = this.mesh.geometry.vertices[i];
            let x = vertex.x / this.xZoom;
            let y = vertex.y / this.yZoom;
            let noise = this.simplex.noise2D(x + offset/10, y) * this.noiseStrength; 
            vertex.z = noise;
        }
        this.geometry.verticesNeedUpdate = true;
        this.geometry.computeVertexNormals();
    }

    loop(){

        // let offset = Date.now() * 0.0004;
        let offset = Common.camera.position.x
        this.mesh.position.x = Common.camera.position.x
        this.adjustVertices(offset);

    }
    // generateHeight( width, height ) {
    //     console.log(width)
    //     var size = width * height, data = new Uint8Array( size ),
    //         perlin = new ImprovedNoise(), quality = 1, z = Math.random() * 100;

    //     for ( var j = 0; j < 4; j ++ ) {

    //         for ( var i = 0; i < size; i ++ ) {

    //             var x = i % width, y = ~ ~ ( i / width );
    //             data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );

    //         }

    //         quality *= 5;

    //     }

    //     return data;

    // }

}