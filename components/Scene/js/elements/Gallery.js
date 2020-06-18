import * as THREE from "three";
import Common from "../Common";
import Camera from "../Camera";
import Image from "./Image";
import EventBus from "~/utils/event-bus"
import loadImage from 'image-promise';
import { Int8Attribute } from "three";


class Gallery{
    constructor(){

        this.sectionHeight = 0
        this.globalHeight = 0
        this.gallery = []
        this.clicks = 0;
        // this.imageClicks = 0
        this.imageClicks = 0
        this.shouldBeTop = true
        this.topped = 0;



    }

    load(e){


        if(this.imageClicks >= 10){
            this.imageClicks += 10
        }

        if(this.clicks <= 0){
            this.clicks += 10
        } 
        else if(this.clicks == 10){
            this.imageClicks += 10
            this.clicks += 10
        }
        else if(this.clicks >= 20){
            this.clicks += 10
        }

        // if (this.clicks == 20){
        //     this.topped -= 10
        // }

        if(this.imageClicks == -10 && this.clicks == 10){
            console.log('this script right here took me 3 days to debug, you are welcome')
            this.imageClicks += 10
        }

        // images position: 10 image clicks: -10, gallery clicks: 10
        // images position: -40 image clicks: 10, gallery clicks: 20

    
        let images = [
            // '../images/img1.jpg',
            // '../images/img2.jpg',
            '../images/img3.jpg',
            '../images/img4.jpg',
            '../images/img5.jpg',
            // '../images/img6.jpg',
            // '../images/img7.jpg',
            // '../images/img8.jpg',
            // '../images/img9.jpg',
            // '../images/img10.jpg',
            // '../images/img11.jpg'
        ];
        

        this.mesh_ = [];

        for (let i = 0; i < images.length; i++) {
            this.sectionHeight = images.length * 10;
            this.loadTexture(images[i]).then(texture => {
                
                var Ctexture = new THREE.CanvasTexture( texture );
                Ctexture.minFilter = THREE.LinearFilter;
                var material = new THREE.MeshBasicMaterial( { map: Ctexture } );

                let width = Ctexture.image.width
                let height = Ctexture.image.height
                let aspect = width/height

                this.mesh_[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry( aspect * 5, 5), material);
                this.mesh_[i].name = 'gallery';
                this.mesh_[i].position.y =-i * 10 - this.globalHeight + this.sectionHeight - this.clicks;
                this.mesh_[i].position.x = e.object.position.x;
                Common.scene.add(this.mesh_[i]);
                this.gallery.push(this.mesh_[i])

            })
        }

        // if(this.shouldBeTop == 'false') {
            this.globalHeight += this.sectionHeight;
        // }
        
    }

    loadTexture(url) {
        var loader = new THREE.ImageBitmapLoader()
        loader.setOptions({ imageOrientation: 'flipY' })
        return new Promise(resolve => { loader.load(url, resolve) })
    }

}


export default new Gallery();