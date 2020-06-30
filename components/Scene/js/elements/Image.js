import * as THREE from "three";
import Common from "../Common";
import EventBus from "~/utils/event-bus"
import Camera from "../Camera"
import Gallery from "./gallery"


export default class Image{
    constructor(){
        this.sectionWidth = 0;
        this.positionY = 0;
        
        this.init();
    }

    init(){
        this.bgMesh = null;
        this.bgDummy = new THREE.Object3D();
        this.addInstancedMesh();
        this.startAnimating(10);

        this.thumbs = [];
    }

    addInstancedMesh() {

        let images = [
            '../images/img1.jpg',
            '../images/img2.jpg',
            '../images/img3.jpg',
            '../images/img4.jpg',
            '../images/img5.jpg',
            '../images/img6.jpg',
            '../images/img7.jpg',
            '../images/img8.jpg',
            '../images/img9.jpg',
            '../images/img10.jpg',
            '../images/img11.jpg'
        ];
        
        // used for the each loop
        this.mesh_ = [];
        // remove loading after all images are loaded
        this.manager = new THREE.LoadingManager( () => {
            this.loadingScreen = document.getElementById( 'loading-screen' );
            this.loadingScreen.addEventListener( 'transitionend', loaded() );
            function loaded(){EventBus.$emit("IMAGESLOADED", true)};
        });

        // display all thumbnails an ddisplace them
        for (let i = 0; i < images.length; i++) {
            this.sectionWidth += 10;

            this.loadTexture(images[i]).then(texture => {
                
                var Ctexture = new THREE.CanvasTexture( texture );
                Ctexture.minFilter = THREE.LinearFilter;
                var material = new THREE.MeshBasicMaterial( { map: Ctexture } );

                let width = Ctexture.image.width;
                let height = Ctexture.image.height;
                let aspect = width/height;

                if(aspect >= 1){
                    this.mesh_[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(aspect*5,5), material);
                } else {
                    this.mesh_[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(aspect*7,7), material);
                }

                this.mesh_[i].name = 'thumb';
                this.mesh_[i].uuid = i;
                Common.scene.add(this.mesh_[i]);
                this.thumbs.push(this.mesh_[i]);

            })
        }

        // add boxes
        this.bgMesh = new THREE.InstancedMesh(new THREE.BoxBufferGeometry(9, 9, 1, 2, 2, 1), new THREE.MeshBasicMaterial({color: 0xdbdbdb, wireframe: true}), 10);
        Common.scene.add(this.bgMesh);
        this.setInstancedMeshPositions(this.bgMesh);

    }

    loadTexture(url) {
        var loader = new THREE.ImageLoader(this.manager);
        // loader.setOptions({ imageOrientation: 'flipY' })
        return new Promise(resolve => { loader.load(url, resolve) });
    }

    // positioning the boxes
    setInstancedMeshPositions(mesh, loopSectionPosition) {
        for ( var i = 0; i < mesh.count; i ++ ) {
            var xStaticPosition = -10 * (i - 4);
            var xSectionPosition = 10 * loopSectionPosition;
            var x = xStaticPosition + xSectionPosition;
            this.bgDummy.position.set(x, this.positionY, 0);
            this.bgDummy.updateMatrix();
            this.bgMesh.setMatrixAt( i, this.bgDummy.matrix );
        }
        this.bgMesh.instanceMatrix.needsUpdate = true;
    }

    // throttle the animation
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
                let x = this.sectionWidth * distance_;
                item.position.set((i * 10) + x, this.positionY, 0);

            }, this);

            // set the boxes X
            var bgDistance = Math.round(Common.camera.position.x / 10);
            if (bgDistance !== this.loopSectionPosition) {
                this.loopSectionPosition = bgDistance;
                this.setInstancedMeshPositions(this.bgMesh, this.loopSectionPosition);
            }
            // set the boxes Y
            var bgDistanceY = Math.round(Common.camera.position.y / 10);
            if (bgDistanceY !== this.loopSectionPosition) {
                this.loopSectionPosition = bgDistance;
                this.setInstancedMeshPositions(this.bgMesh, this.loopSectionPosition);
            }
        }

        // are the thumbs top or bottom? (looking for 1/2 scroll-position in gallery)
        if(Common.isInGallery == true){
            if (Camera.camPos.y >= - Gallery.globalHeight + Gallery.sectionHeight/2 - Gallery.clicks) {
                // top
                Gallery.shouldBeTop = true;
                this.positionY = - Gallery.globalHeight + Gallery.sectionHeight - Gallery.imageClicks;

            } else if(Camera.camPos.y <= - Gallery.globalHeight + Gallery.sectionHeight/2 - Gallery.clicks){
                // bottom
                Gallery.shouldBeTop = false;
                this.positionY = - Gallery.globalHeight - Gallery.clicks;
            }
        }
    }
}