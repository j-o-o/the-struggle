import * as THREE from "three";
import Common from "../Common";
import EventBus from "~/utils/event-bus";
import {clamp} from "math-toolbox"

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
        this.w_width = 0;
        if(e.object.uuid == 0){

            this.w_width = clamp( 2, 6, Common.size.windowW / 200);
    
            images = [
                '../images/saudade/saudade1.jpeg',
                '../images/saudade/saudade2.jpeg',
                '../images/saudade/saudade3.jpeg',
                '../images/saudade/saudade4.jpeg',
                '../images/saudade/saudade5.jpeg',
                '../images/saudade/saudade6.jpeg',
                '../images/saudade/saudade7.jpeg',
                '../images/saudade/saudade8.jpeg',
                '../images/saudade/saudade9.jpeg',
                '../images/saudade/saudade10.jpeg',
                '../images/saudade/saudade11.jpeg',
                '../images/saudade/saudade12.jpeg'
            ];

        }
        if(e.object.uuid == 1){
            this.w_width = clamp( 2, 6, Common.size.windowW / 200);
            images = [
                '../images/perception/perception2.jpeg',
                '../images/perception/perception3.jpeg',
                '../images/perception/perception4.jpeg',
                '../images/perception/perception5.jpeg',
                '../images/perception/perception6.jpeg',
                '../images/perception/perception7.jpeg',
                '../images/perception/perception8.jpeg',
                '../images/perception/perception9.jpeg',
                '../images/perception/perception10.jpeg',
                '../images/perception/perception11.jpeg',
                '../images/perception/perception12.jpeg',
                '../images/perception/perception13.jpeg',
                '../images/perception/perception14.jpeg',
                '../images/perception/perception15.jpeg',
            ];

        }

        if(e.object.uuid == 2){
    
            this.w_width = clamp( 2, 5, Common.size.windowW / 200);

            images = [
                '../images/vergessen/vergessen2.jpg',
                '../images/vergessen/vergessen3.jpg',
                '../images/vergessen/vergessen4.jpg',
                '../images/vergessen/vergessen5.jpg',
                '../images/vergessen/vergessen6.jpg',
                '../images/vergessen/vergessen7.jpg',
                '../images/vergessen/vergessen8.jpg',
                '../images/vergessen/vergessen9.jpg',
                '../images/vergessen/vergessen10.jpg',
                '../images/vergessen/vergessen11.jpg',
                '../images/vergessen/vergessen12.jpg',
                '../images/vergessen/vergessen13.jpg',
                '../images/vergessen/vergessen14.jpg',
                '../images/vergessen/vergessen15.jpg',
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

                this.mesh_[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry( aspect * this.w_width, this.w_width), material);
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