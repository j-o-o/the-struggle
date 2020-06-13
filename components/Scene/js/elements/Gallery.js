import * as THREE from "three";
import Common from "../Common";
import EventBus from "~/utils/event-bus"
import loadImage from 'image-promise';



export default class Gallery{
    constructor(){

        this.sectionWidth = 0
        this.init();

    }

    init(){
        let images = [
            // '../images/img1.jpg',
            // '../images/img2.jpg',
            // '../images/img3.jpg',
            // '../images/img4.jpg',
            // '../images/img5.jpg',
            // '../images/img6.jpg',
            '../images/img7.jpg',
            '../images/img8.jpg',
            '../images/img9.jpg',
            // '../images/img10.jpg',
            // '../images/img11.jpg'
        ];
        this.mesh_ = [];

        for (let i = 0; i < images.length; i++) {
            this.sectionWidth += 10;
            this.loadTexture(images[i]).then(texture => {
                
                let width = texture.image.naturalWidth
                let height = texture.image.naturalHeight
                let aspect = width/height
                console.log(texture)

                this.mesh_[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(aspect*5,5), new THREE.MeshBasicMaterial({ map: texture }));
                this.mesh_[i].name = 'thumb';
                Common.scene.add(this.mesh_[i]);
                this.thumbs.push(this.mesh_[i])

            })
        }

        Common.camera.position.y += 5

    }

}