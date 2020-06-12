import * as THREE from "three";
import Common from "../Common";
import EventBus from "~/utils/event-bus"
import loadImage from 'image-promise';


export default class Image{
    constructor(){

        this.sectionWidth = 0
        this.init();

    }

    init(){
        this.addInstancedMesh()
        this.startAnimating(10);
    }

    addInstancedMesh() {

        let images = [
            // '../images/img1.jpg',
            // '../images/img2.jpg',
            '../images/img3.jpg',
            '../images/img4.jpg',
            '../images/img5.jpg',
            '../images/img6.jpg',
            // '../images/img7.jpg',
            // '../images/img8.jpg',
            // '../images/img9.jpg',
            // '../images/img10.jpg',
            // '../images/img11.jpg'
        ];

        this.mesh_ = [];

        for (let i=0; i<images.length; i++) {
            this.sectionWidth += 10;
            this.loadTexture(images[i]).then(texture => {
                
                let width = texture.image.naturalWidth
                let height = texture.image.naturalHeight
                let aspect = width/height

                this.mesh_[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(aspect*5,5), new THREE.MeshBasicMaterial({ map: texture }));
                this.mesh_[i].name = 'thumb'
                Common.scene.add(this.mesh_[i]);

            })
        }

    }

    loadTexture(url) {
        return new Promise(resolve => {
            new THREE.TextureLoader().load(url, resolve)
        })
    }
    
    startAnimating(fps) {
        this.fpsInterval = 1000 / fps;
        this.then = Date.now();
        this.startTime = this.then;
        this.update();
    }

    update(){

        requestAnimationFrame(this.update.bind(this));
        this.now = Date.now();
        this.elapsed = this.now - this.then;

        if (this.elapsed > this.fpsInterval) {
            this.then = this.now - (this.elapsed % this.fpsInterval);

            this.mesh_.forEach(function(item, i){
                
                let distance_ = Math.round((Common.camera.position.x - (i * 10)) / this.sectionWidth)
                let lsp = i+i
                if (distance_ !== lsp) {
                    lsp = distance_;
                    var x = this.sectionWidth * lsp;
                    var ran_x = Math.floor(Math.random()*2) + 1;
                    ran_x *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
                    item.position.set(x + (i * 10), 0, 0);
                }

            }, this)
        }
    }
}