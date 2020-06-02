import * as THREE from "three";
import Common from "../Common";
import EventBus from "~/utils/event-bus"
import loadImage from 'image-promise';



export default class Image{
    constructor(){
        this.sectionWidth = 50;
        this.loopSectionPosition_1 = 0;
        this.loopSectionPosition_2 = 2;
        this.loopSectionPosition_3 = 4;
        this.loopSectionPosition_4 = 6;
        this.loopSectionPosition_5 = 8;
        this.loopSectionPosition_6 = 10;
        this.loopSectionPosition_7 = 12;
        this.loopSectionPosition_8 = 14;
        this.loopSectionPosition_9 = 16;
        this.loopSectionPosition_10 = 18;
        this.loopSectionPosition_11 = 20;
        this.init();

        this.textureKeys = ['map', 'normalMap']; 

    }

    init(){
        // this.loadImages()
        this.addInstancedMesh()
        EventBus.$on("WHEELED", this.onWheel.bind(this));

    }

    addInstancedMesh() {
        this.loadTexture('../images/img1.jpg').then(texture => {
            console.log('loaded')
            let width = texture.image.naturalWidth
            let height = texture.image.naturalHeight
            let aspect = width/height
            console.log(aspect)
            this.mesh_1 = new THREE.Mesh(new THREE.PlaneBufferGeometry(aspect*3,3), new THREE.MeshBasicMaterial({ map: texture }));
            Common.scene.add(this.mesh_1);
            this.mesh_1.name = "image"
        })
        this.loadTexture('../images/img2.jpg').then(texture => {
            let width = texture.image.naturalWidth
            let height = texture.image.naturalHeight
            let aspect = width/height
            this.mesh_2 = new THREE.Mesh(new THREE.PlaneBufferGeometry(aspect*3,3), new THREE.MeshBasicMaterial({ map: texture }));
            Common.scene.add(this.mesh_2);
            this.mesh_2.name = "image"
        })
        this.loadTexture('../images/img3.jpg').then(texture => {
            let width = texture.image.naturalWidth
            let height = texture.image.naturalHeight
            let aspect = width/height
            this.mesh_3 = new THREE.Mesh(new THREE.PlaneBufferGeometry(aspect*3,3), new THREE.MeshBasicMaterial({ map: texture }));
            Common.scene.add(this.mesh_3);
            this.mesh_3.name = "image"
        })
        this.loadTexture('../images/img4.jpg').then(texture => {
            let width = texture.image.naturalWidth
            let height = texture.image.naturalHeight
            let aspect = width/height
            this.mesh_4 = new THREE.Mesh(new THREE.PlaneBufferGeometry(aspect*3,3), new THREE.MeshBasicMaterial({ map: texture }));
            Common.scene.add(this.mesh_4);
            this.mesh_4.name = "image"
        })

        this.loadTexture('../images/img5.jpg').then(texture => {
            let width = texture.image.naturalWidth
            let height = texture.image.naturalHeight
            let aspect = width/height
            this.mesh_5 = new THREE.Mesh(new THREE.PlaneBufferGeometry(aspect*3,3), new THREE.MeshBasicMaterial({ map: texture }));
            Common.scene.add(this.mesh_5);
            this.mesh_5.name = "image"
        })

        // this.loadTexture('../images/img6.jpg').then(texture => {
        //     let width = texture.image.naturalWidth
        //     let height = texture.image.naturalHeight
        //     let aspect = width/height
        //     this.mesh_6 = new THREE.Mesh(new THREE.PlaneBufferGeometry(3,aspect*3), new THREE.MeshBasicMaterial({ map: texture }));
        //     Common.scene.add(this.mesh_6);
        //     this.mesh_6.name = "image"
        // })

        // this.loadTexture('../images/img7.jpg').then(texture => {
        //     let width = texture.image.naturalWidth
        //     let height = texture.image.naturalHeight
        //     let aspect = width/height
        //     this.mesh_7 = new THREE.Mesh(new THREE.PlaneBufferGeometry(3,aspect*3), new THREE.MeshBasicMaterial({ map: texture }));
        //     Common.scene.add(this.mesh_7);
        //     this.mesh_7.name = "image"
        // })

        // this.loadTexture('../images/img8.jpg').then(texture => {
        //     let width = texture.image.naturalWidth
        //     let height = texture.image.naturalHeight
        //     let aspect = width/height
        //     this.mesh_8 = new THREE.Mesh(new THREE.PlaneBufferGeometry(3,aspect*3), new THREE.MeshBasicMaterial({ map: texture }));
        //     Common.scene.add(this.mesh_8);
        //     this.mesh_8.name = "image"
        // })

        // this.loadTexture('../images/img9.jpg').then(texture => {
        //     let width = texture.image.naturalWidth
        //     let height = texture.image.naturalHeight
        //     let aspect = width/height
        //     this.mesh_9 = new THREE.Mesh(new THREE.PlaneBufferGeometry(3,aspect*3), new THREE.MeshBasicMaterial({ map: texture }));
        //     Common.scene.add(this.mesh_9);
        //     this.mesh_9.name = "image"
        // })
        // this.loadTexture('../images/img10.jpg').then(texture => {
        //     let width = texture.image.naturalWidth
        //     let height = texture.image.naturalHeight
        //     let aspect = width/height
        //     this.mesh_10 = new THREE.Mesh(new THREE.PlaneBufferGeometry(3,aspect*3), new THREE.MeshBasicMaterial({ map: texture }));
        //     Common.scene.add(this.mesh_10);
        //     this.mesh_10.name = "image"
        // })
        // this.loadTexture('../images/img11.jpg').then(texture => {
        //     let width = texture.image.naturalWidth
        //     let height = texture.image.naturalHeight
        //     let aspect = width/height
        //     this.mesh_11 = new THREE.Mesh(new THREE.PlaneBufferGeometry(3,aspect*3), new THREE.MeshBasicMaterial({ map: texture }));
        //     Common.scene.add(this.mesh_11);
        //     this.mesh_11.name = "image"
        // })

        
    }

    loadTexture(url) {
        return new Promise(resolve => {
            new THREE.TextureLoader().load(url, resolve)
        })
    }

    onWheel(){
        let distance_1 = Math.round((Common.camera.position.x) / this.sectionWidth) 
        let distance_2 = Math.round((Common.camera.position.x-10) / this.sectionWidth) 
        let distance_3 = Math.round((Common.camera.position.x-20) / this.sectionWidth) 
        let distance_4 = Math.round((Common.camera.position.x-30) / this.sectionWidth) 
        let distance_5 = Math.round((Common.camera.position.x-40) / this.sectionWidth) 
        // let distance_6 = Math.round((Common.camera.position.x+1) / this.sectionWidth) 
        // let distance_7 = Math.round((Common.camera.position.x) / this.sectionWidth) 
        // let distance_8 = Math.round((Common.camera.position.x-1) / this.sectionWidth) 
        // let distance_9 = Math.round((Common.camera.position.x-2) / this.sectionWidth) 
        // let distance_10 = Math.round((Common.camera.position.x-3) / this.sectionWidth) 
        // let distance_11 = Math.round((Common.camera.position.x-4) / this.sectionWidth) 
        

        if (distance_1 !== this.loopSectionPosition_1 ) {
            this.loopSectionPosition_1 = distance_1
            var x = this.sectionWidth * this.loopSectionPosition_1;
            this.mesh_1.position.set(x+0, 0, 0)
        }
        if (distance_2 !== this.loopSectionPosition_2) {
            this.loopSectionPosition_2 = distance_2
            var x = this.sectionWidth * this.loopSectionPosition_2;
            this.mesh_2.position.set(x+10, 0, 0)
        }
        if (distance_3 !== this.loopSectionPosition_3 ) {
            this.loopSectionPosition_3 = distance_3
            var x = this.sectionWidth * this.loopSectionPosition_3;
            this.mesh_3.position.set(x+20, 0, 0)
        }
        if (distance_4 !== this.loopSectionPosition_4) {
            this.loopSectionPosition_4 = distance_4
            var x = this.sectionWidth * this.loopSectionPosition_4;
            this.mesh_4.position.set(x+30, 0, 0)
        }

        if (distance_5 !== this.loopSectionPosition_5) {
            this.loopSectionPosition_5 = distance_5
            var x = this.sectionWidth * this.loopSectionPosition_5;
            this.mesh_5.position.set(x+40, 0, 0)
        }

        // if (distance_6 !== this.loopSectionPosition_6) {
        //     this.loopSectionPosition_6 = distance_6
        //     var x = this.sectionWidth * this.loopSectionPosition_6;
        //     this.mesh_6.position.set(x+10, 0, 0)
        // }
        // if (distance_7 !== this.loopSectionPosition_7) {
        //     this.loopSectionPosition_7 = distance_7
        //     var x = this.sectionWidth * this.loopSectionPosition_7;
        //     this.mesh_7.position.set(x, 0, 0)
        // }
        // if (distance_8 !== this.loopSectionPosition_8) {
        //     this.loopSectionPosition_8 = distance_8
        //     var x = this.sectionWidth * this.loopSectionPosition_8;
        //     this.mesh_8.position.set(x-10, 0, 0)
        // }
        // if (distance_9 !== this.loopSectionPosition_9) {
        //     this.loopSectionPosition_9 = distance_9
        //     var x = this.sectionWidth * this.loopSectionPosition_9;
        //     this.mesh_9.position.set(x-20, 0, 0)
        // }
        // if (distance_10 !== this.loopSectionPosition_10) {
        //     this.loopSectionPosition_10 = distance_10
        //     var x = this.sectionWidth * this.loopSectionPosition_10;
        //     this.mesh_10.position.set(x-30, 0, 0)
        // }
        // if (distance_11 !== this.loopSectionPosition_11) {
        //     this.loopSectionPosition_11 = distance_11
        //     var x = this.sectionWidth * this.loopSectionPosition_11;
        //     this.mesh_11.position.set(x-40, 0, 0)
        // }




    }
}