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
        this.xZoom = 16;
        this.yZoom = 16;
        this.noiseStrength = 1;
        this.simplex = new SimplexNoise();

        this.geometry = new THREE.PlaneGeometry(40,40,12,12)

        var light = new THREE.AmbientLight( 0xffffff ); // soft white light
        Common.scene.add( light );

        
        let material = new THREE.MeshNormalMaterial({ side: DoubleSide, wireframe: true})

        this.mesh = new THREE.Mesh(this.geometry, material)
        this.mesh.rotation.x = Math.PI/1.1
        this.mesh.position.y = -5;
        this.mesh.position.z = -10;
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

}