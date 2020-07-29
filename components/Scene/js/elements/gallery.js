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
        this.bigi = false

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
            if(Common.isTouch == true){
                this.w_width = clamp( 5, 10, Common.size.windowW / 200);
            } else if(Common.isTouch == false) {
                this.w_width = clamp( 2, 6, Common.size.windowW / 200);
            }
            this.bigi = false
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

        } else if(e.object.uuid == 1){
            this.bigi = true            
            if(Common.isTouch == true){
                this.w_width = clamp( 5, 10, Common.size.windowW / 200);
            } else if(Common.isTouch == false) {
                this.w_width = clamp( 2, 6, Common.size.windowW / 160);
            }
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

        }else if(e.object.uuid == 2){
            if(Common.isTouch == true){
                this.w_width = clamp( 5, 10, Common.size.windowW / 200);
            } else if(Common.isTouch == false) {
                this.w_width = clamp( 2, 5, Common.size.windowW / 200);
            }
            this.bigi = false
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

        }else if(e.object.uuid == 3){
            if(Common.isTouch == true){
                this.w_width = clamp( 5, 10, Common.size.windowW / 200);
            } else if(Common.isTouch == false) {
                this.w_width = clamp( 2, 5, Common.size.windowW / 200);
            }
            this.bigi = false
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

        } else if(e.object.uuid == 4){
    
            this.bigi = false            
            if(Common.isTouch == true){
                this.w_width = clamp( 5, 10, Common.size.windowW / 200);
            } else if(Common.isTouch == false) {
                this.w_width = clamp( 2, 5, Common.size.windowW / 200);
            }
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

        } else if(e.object.uuid == 5){
    
            this.bigi = false
            if(Common.isTouch == true){
                this.w_width = clamp( 5, 10, Common.size.windowW / 200);
            } else if(Common.isTouch == false) {
                this.w_width = clamp( 2, 5, Common.size.windowW / 200);
            }
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

        } else if(e.object.uuid == 6){
            if(Common.isTouch == true){
                this.w_width = clamp( 5, 10, Common.size.windowW / 200);
            } else if(Common.isTouch == false) {
                this.w_width = clamp( 2, 5, Common.size.windowW / 200);
            }
            this.bigi = true
            this.random = true;
    
            images = [
                '../images/ivco/ivco1.jpg',
                '../images/ivco/ivco2.jpg',
                '../images/ivco/ivco3.jpg',
                '../images/ivco/ivco4.jpg',
                '../images/ivco/ivco5.jpg',
                '../images/ivco/ivco6.jpg',
                '../images/ivco/ivco7.jpg',
                '../images/ivco/ivco8.jpg',
                '../images/ivco/ivco9.jpg',
            ];

        } else if(e.object.uuid == 7){
            if(Common.isTouch == true){
                this.w_width = clamp( 5, 10, Common.size.windowW / 200);
            } else if(Common.isTouch == false) {
                this.w_width = clamp( 2, 5, Common.size.windowW / 200);
            }
            this.bigi = false
            this.random = true;
            images = [
                '../images/blue/blue3.jpeg',
                '../images/blue/blue4.jpeg',
                '../images/blue/blue5.jpeg',
                '../images/blue/blue6.jpeg',
                '../images/blue/blue7.jpeg',
                '../images/blue/blue8.jpeg',
                '../images/blue/blue9.jpeg',
                '../images/blue/blue10.jpeg',
                '../images/blue/blue11.jpeg',
                '../images/blue/blue12.jpeg',
                '../images/blue/blue13.jpeg',
                '../images/blue/blue14.jpeg',
                '../images/blue/blue15.jpeg',
                '../images/blue/blue16.jpeg',
                '../images/blue/blue17.jpeg',
                '../images/blue/blue18.jpeg',
                '../images/blue/blue19.jpeg',
                '../images/blue/blue20.jpeg',
                '../images/blue/blue21.jpeg',
            ];

        } else if(e.object.uuid == 8){
            this.bigi = true;
            if(Common.isTouch == true){
                this.w_width = clamp( 5, 10, Common.size.windowW / 200);
            } else if(Common.isTouch == false) {
                this.w_width = clamp( 2, 5, Common.size.windowW / 200);
            }
            this.random = true;
            images = [
                '../images/dystopie/dystopie2.jpg',
                '../images/dystopie/dystopie3.jpg',
                '../images/dystopie/dystopie4.jpg',
                '../images/dystopie/dystopie5.jpg',
                '../images/dystopie/dystopie6.jpg',
                '../images/dystopie/dystopie7.jpg',
                '../images/dystopie/dystopie8.jpg',
                '../images/dystopie/dystopie9.jpg',
                '../images/dystopie/dystopie10.jpg',
                '../images/dystopie/dystopie11.jpg',
                '../images/dystopie/dystopie12.jpg',
                '../images/dystopie/dystopie13.jpg',
                '../images/dystopie/dystopie14.jpg',
                '../images/dystopie/dystopie15.jpg',
                '../images/dystopie/dystopie16.jpg',
            ];

        } else if(e.object.uuid == 9){
    
            this.w_width = clamp( 2, 5, Common.size.windowW / 200);
            this.bigi = false
            this.random = true;
            images = [
                '../images/into/into1.jpg',
                '../images/into/into2.jpg',
                '../images/into/into3.jpg',
                '../images/into/into4.jpg',
                '../images/into/into5.jpg',
                '../images/into/into6.jpg',
                '../images/into/into7.jpg',
                '../images/into/into8.jpg',
                '../images/into/into9.jpg',
                '../images/into/into10.jpg',
                '../images/into/into11.jpg',
                '../images/into/into12.jpg',
                '../images/into/into13.jpg',
                '../images/into/into14.jpg',
                '../images/into/into15.jpg',
            ];

        } else if(e.object.uuid == 10){
            if(Common.isTouch == true){
                this.w_width = clamp( 5, 10, Common.size.windowW / 200);
            } else if(Common.isTouch == false) {
                this.w_width = clamp( 2, 5, Common.size.windowW / 200);
            }
            this.bigi = false
            this.random = true;
            images = [
                '../images/bliznak/bliznak1.jpeg',
                '../images/bliznak/bliznak2.jpeg',
                '../images/bliznak/bliznak3.jpeg',
                '../images/bliznak/bliznak4.jpeg',
                '../images/bliznak/bliznak5.jpeg',
                '../images/bliznak/bliznak6.jpeg',
                '../images/bliznak/bliznak7.jpeg',
                '../images/bliznak/bliznak8.jpeg',
                '../images/bliznak/bliznak9.jpeg',
                '../images/bliznak/bliznak10.jpeg',
                '../images/bliznak/bliznak11.jpeg',
                '../images/bliznak/bliznak12.jpeg',
                '../images/bliznak/bliznak13.jpeg',
                '../images/bliznak/bliznak14.jpeg',
                '../images/bliznak/bliznak15.jpeg',
                '../images/bliznak/bliznak16.jpeg',
                '../images/bliznak/bliznak17.jpeg',
                '../images/bliznak/bliznak18.jpeg',
                '../images/bliznak/bliznak19.jpeg',
            ];

        } else if(e.object.uuid == 11){
            if(Common.isTouch == true){
                this.w_width = clamp( 5, 10, Common.size.windowW / 200);
            } else if(Common.isTouch == false) {
                this.w_width = clamp( 2, 5, Common.size.windowW / 200);
            }
            this.bigi = false;
            this.random = true;
            images = [
                '../images/gemeinsam/gemeinsam2.jpg',
                '../images/gemeinsam/gemeinsam3.jpg',
                '../images/gemeinsam/gemeinsam4.jpg',
                '../images/gemeinsam/gemeinsam5.jpg',
                '../images/gemeinsam/gemeinsam6.jpg',
                '../images/gemeinsam/gemeinsam7.jpg',
                '../images/gemeinsam/gemeinsam8.jpg',
                '../images/gemeinsam/gemeinsam9.jpg',
                '../images/gemeinsam/gemeinsam10.jpg',
                '../images/gemeinsam/gemeinsam11.jpg',
                '../images/gemeinsam/gemeinsam12.jpg',
                '../images/gemeinsam/gemeinsam13.jpg',
                '../images/gemeinsam/gemeinsam14.jpg',
                '../images/gemeinsam/gemeinsam15.jpg',
            ];

        }   


        EventBus.$emit("LOADINGGALLERY", false)
        this.manager = new THREE.LoadingManager( () => {
            EventBus.$emit("LOADINGGALLERY", true)
        });
        
        this.mesh_ = [];


        


        
        console.log(this.bigi)
        

        for (let i = 0; i < images.length; i++) {
            if (this.bigi == true){
                console.log(' big img')
                this.sectionHeight = images.length * 10 + 4;
            } else {
                this.sectionHeight = images.length * 6 + 4;
            }

            this.loadTexture(images[i]).then(texture => {
                
                var Ctexture = new THREE.CanvasTexture( texture );
                Ctexture.minFilter = THREE.LinearFilter;
                var material = new THREE.MeshBasicMaterial( { map: Ctexture } );

                let width = Ctexture.image.width
                let height = Ctexture.image.height
                let aspect = width/height

                this.mesh_[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry( aspect * this.w_width, this.w_width), material);
                this.mesh_[i].name = 'gallery';


                if (this.bigi == true){
                    
                    this.mesh_[i].position.y =-i * 10 - this.globalHeight + this.sectionHeight - this.clicks;
                } else  if(this.bigi == false){

                    this.mesh_[i].position.y =-i * 6 - this.globalHeight + this.sectionHeight - this.clicks;
                }

                if(Common.isTouch == true){
                    this.random = false
                }
                console.log(this.random, this.bigi)
                if(this.random == true){
                    let random =  Math.random() * (Common.size.windowW/500 - (-Common.size.windowW/500)) + (-Common.size.windowW/500);
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