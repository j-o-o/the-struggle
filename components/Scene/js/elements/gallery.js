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
        this.random = true

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
            this.random = false;
    
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
            this.random = true;
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
            this.random = true;

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
    
            this.w_width = clamp( 2, 5, Common.size.windowW / 200);
            this.random = true;
            images = [
                '../images/absent/absent1.jpg',
                '../images/absent/absent2.jpg',
                '../images/absent/absent3.jpg',
                '../images/absent/absent4.jpg',
                '../images/absent/absent5.jpg',
                '../images/absent/absent6.jpg',
                '../images/absent/absent7.jpg',
                '../images/absent/absent8.jpg',
                '../images/absent/absent9.jpg',
                '../images/absent/absent10.jpg',
                '../images/absent/absent11.jpg',
                '../images/absent/absent12.jpg',
                '../images/absent/absent13.jpg',
                '../images/absent/absent14.jpg',
                '../images/absent/absent15.jpg',
                '../images/absent/absent16.jpg',
                '../images/absent/absent17.jpg',
                '../images/absent/absent18.jpg',
                '../images/absent/absent19.jpg',
                '../images/absent/absent20.jpg',
                '../images/absent/absent21.jpg',
                '../images/absent/absent22.jpg',
                '../images/absent/absent23.jpg',
                '../images/absent/absent24.jpg',
                '../images/absent/absent25.jpg',
                '../images/absent/absent26.jpg',
            ];

        }        
        
        if(e.object.uuid == 4){
    
            this.w_width = clamp( 2, 5, Common.size.windowW / 200);
            this.random = true;
            images = [
                '../images/masks/masks1.jpg',
                '../images/masks/masks2.jpg',
                '../images/masks/masks3.jpg',
                '../images/masks/masks4.jpg',
                '../images/masks/masks5.jpg',
                '../images/masks/masks6.jpg',
                '../images/masks/masks7.jpg',
                '../images/masks/masks8.jpg',
                '../images/masks/masks9.jpg',
                '../images/masks/masks10.jpg',
                '../images/masks/masks11.jpg',
                '../images/masks/masks12.jpg',
                '../images/masks/masks13.jpg',
                '../images/masks/masks14.jpg',
                '../images/masks/masks15.jpg',
                '../images/masks/masks16.jpg',
            ];

        }

        if(e.object.uuid == 5){
    
            this.w_width = clamp( 2, 5, Common.size.windowW / 200);
            this.random = true;
            images = [
                '../images/dazwischen/dazwischen1.jpg',
                '../images/dazwischen/dazwischen2.jpg',
                '../images/dazwischen/dazwischen3.jpg',
                '../images/dazwischen/dazwischen4.jpg',
                '../images/dazwischen/dazwischen5.jpg',
                '../images/dazwischen/dazwischen6.jpg',
                '../images/dazwischen/dazwischen7.jpg',
                '../images/dazwischen/dazwischen8.jpg',
                '../images/dazwischen/dazwischen9.jpg',
                '../images/dazwischen/dazwischen10.jpg',
                '../images/dazwischen/dazwischen11.jpg',
                '../images/dazwischen/dazwischen12.jpg',
                '../images/dazwischen/dazwischen13.jpg',
                '../images/dazwischen/dazwischen14.jpg',
                '../images/dazwischen/dazwischen15.jpg',
                '../images/dazwischen/dazwischen16.jpg',
                '../images/dazwischen/dazwischen17.jpg',
                '../images/dazwischen/dazwischen18.jpg',
                '../images/dazwischen/dazwischen19.jpg',
            ];

        }

        if(e.object.uuid == 6){
    
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
                if(this.random == true){
                    let random =  Math.random() * (3 - (-3)) + (-3);
                    this.mesh_[i].position.x = e.object.position.x + random;
                } else {
                    this.mesh_[i].position.x = e.object.position.x;
                }
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