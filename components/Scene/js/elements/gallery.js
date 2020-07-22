import * as THREE from "three";
import Common from "../Common";
import EventBus from "~/utils/event-bus"

class Gallery{
    constructor(){

        this.sectionHeight = 0
        this.globalHeight = 0
        this.gallery = []
        this.clicks = 0
        this.imageClicks = 0
        this.shouldBeTop = true

    }

    load(e){

        console.log(e)
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

        if(this.imageClicks == -10 && this.clicks == 10){
            this.imageClicks += 10
        }

        let images = []

        if(e.object.uuid == 0){
    
            images = [
                '../images/saudade/saudade1.png',
                '../images/saudade/saudade2.png',
                '../images/saudade/saudade3.png',
                '../images/saudade/saudade4.png',
                '../images/saudade/saudade5.png',
                '../images/saudade/saudade6.png',
                '../images/saudade/saudade7.png',
                '../images/saudade/saudade8.png',
                '../images/saudade/saudade9.png',
                '../images/saudade/saudade10.png',
                '../images/saudade/saudade11.png',
                '../images/saudade/saudade12.png'
            ];

        }
        if(e.object.uuid == 1){
    
            images = [
                '../images/img4.jpg',
                '../images/img5.jpg',
            ];

        }

        if(e.object.uuid == 2){
    
            images = [
                '../images/img4.jpg',
                '../images/img6.jpg',
                '../images/img7.jpg',
            ];

        }



        if(e.object.uuid == 3){
    
            images = [
                '../images/img8.jpg',
                '../images/img9.jpg',
                '../images/img10.jpg',
            ];

        }        
        
        if(e.object.uuid == 4){
    
            images = [
                '../images/img8.jpg',
                '../images/img9.jpg',
                '../images/img10.jpg',
            ];

        }

        if(e.object.uuid == 5){
    
            images = [
                '../images/img8.jpg',
                '../images/img9.jpg',
                '../images/img10.jpg',
            ];

        }

        if(e.object.uuid == 6){
    
            images = [
                '../images/img8.jpg',
                '../images/img9.jpg',
                '../images/img10.jpg',
            ];

        }

        if(e.object.uuid == 7){
    
            images = [
                '../images/img8.jpg',
                '../images/img9.jpg',
                '../images/img10.jpg',
            ];

        }

        if(e.object.uuid == 8){
    
            images = [
                '../images/img8.jpg',
                '../images/img9.jpg',
                '../images/img10.jpg',
            ];

        }

        if(e.object.uuid == 9){
    
            images = [
                '../images/img8.jpg',
                '../images/img9.jpg',
                '../images/img10.jpg',
            ];

        }

        if(e.object.uuid == 10){
    
            images = [
                '../images/img8.jpg',
                '../images/img9.jpg',
                '../images/img10.jpg',
            ];

        }

        if(e.object.uuid == 11){
    
            images = [
                '../images/img8.jpg',
                '../images/img9.jpg',
                '../images/img10.jpg',
            ];

        }


        if(e.object.uuid == 12){
    
            images = [
                '../images/img8.jpg',
                '../images/img9.jpg',
                '../images/img10.jpg',
            ];

        }



        if(e.object.uuid == 13){
    
            images = [
                '../images/img8.jpg',
                '../images/img9.jpg',
                '../images/img10.jpg',
            ];

        }
        EventBus.$emit("LOADINGGALLERY", false)
        this.manager = new THREE.LoadingManager( () => {
            EventBus.$emit("LOADINGGALLERY", true)
        });
        
        this.mesh_ = [];

        for (let i = 0; i < images.length; i++) {
            this.sectionHeight = images.length * 6 + 4;
            this.loadTexture(images[i]).then(texture => {
                
                var Ctexture = new THREE.CanvasTexture( texture );
                Ctexture.minFilter = THREE.LinearFilter;
                var material = new THREE.MeshBasicMaterial( { map: Ctexture } );

                let width = Ctexture.image.width
                let height = Ctexture.image.height
                let aspect = width/height

                this.mesh_[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry( aspect * 5, 5), material);
                this.mesh_[i].name = 'gallery';
                this.mesh_[i].position.y =-i * 6 - this.globalHeight + this.sectionHeight - this.clicks;
                this.mesh_[i].position.x = e.object.position.x;
                Common.scene.add(this.mesh_[i]);
                this.gallery.push(this.mesh_[i])

            })
        }

        this.globalHeight += this.sectionHeight;

        // text description
        let text = '../texts/' + e.object.uuid + '.txt'
        console.log(text)
        this.readTextFile(text)
        
    }

    loadTexture(url) {
        let loader = new THREE.ImageLoader(this.manager)
        // loader.setOptions({ imageOrientation: 'flipY' })
        return new Promise(resolve => { loader.load(url, resolve) })
    }

    readTextFile(file){
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function (){
            if(rawFile.readyState === 4){
                if(rawFile.status === 200 || rawFile.status == 0){
                    EventBus.$emit("TEXTCONTENT", rawFile.responseText)
                }
            }
        }
        rawFile.send(null);
    }

}


export default new Gallery();