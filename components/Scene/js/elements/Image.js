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

        this.thumbs = []
        // Common.scene.traverse(function(thumb){
        //     if (thumb.name == 'thumb') thumbs.push(thumb);
        // })
    }

    addInstancedMesh() {

        let images = [
            // '../images/img1.jpg',
            // '../images/img2.jpg',
            '../images/img3.jpg',
            '../images/img4.jpg',
            '../images/img5.jpg',
            '../images/img6.jpg',
            '../images/img7.jpg',
            '../images/img8.jpg',
            // '../images/img9.jpg',
            // '../images/img10.jpg',
            // '../images/img11.jpg'
        ];

        this.mesh_ = [];


        //
        this.manager = new THREE.LoadingManager( () => {
	
            const loadingScreen = document.getElementById( 'loading-screen' );
            loadingScreen.classList.add( 'fade-out' );
            
            // optional: remove loader from DOM via event listener
            loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
            
        } 
        );
        this.manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
            console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };
        this.manager.onLoad = function ( ) {
            console.log( 'Loading complete!');
        };
        //

        for (let i = 0; i < images.length; i++) {
            this.sectionWidth += 10;

            this.loadTexture(images[i]).then(texture => {
                
                let width = texture.image.naturalWidth
                let height = texture.image.naturalHeight
                let aspect = width/height

                this.mesh_[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(aspect*5,5), new THREE.MeshBasicMaterial({ map: texture }));
                this.mesh_[i].name = 'thumb';
                Common.scene.add(this.mesh_[i]);
                this.thumbs.push(this.mesh_[i])

            })
        }

    }

    loadTexture(url) {
        
        return new Promise(resolve => {
            
            new THREE.TextureLoader(this.manager).load(url, resolve)
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

                let lsp = i * 10

                lsp = distance_;
                let x = this.sectionWidth * lsp;
                item.position.set((i * 10) + x, 0, 0);

            }, this)
        }
    }
}