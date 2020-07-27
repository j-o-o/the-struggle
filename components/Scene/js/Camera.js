import * as THREE from 'three'
import Common from "./Common"
import Gallery from "./elements/gallery"

import {
    lerp
} from 'math-toolbox'

import EventBus from "~/utils/event-bus"

class Camera {

    constructor() {

        this.slant = -3;
        this.camPosTransitionY = 0;
        this.camPos = new THREE.Vector3(0, 0, 0);
        this.camLookAt = new THREE.Vector3();
        this.mouse = new THREE.Vector2();
        this.transition = false;
        this.direction = 'top';
        this.autoScroll = 0.02;
        this.autoScrollEnabled = null;

        this.init();

    }

    init() {

        EventBus.$on("WHEELSPEED", this.onWheel.bind(this));
        EventBus.$on("PANNED", this.onPan.bind(this));
        EventBus.$on("MOUSEMOVE", this.mouseMove.bind(this));
        EventBus.$on("SCROLLENABLED", this.isScrollEnabled.bind(this));
        EventBus.$on("RAYCASTERIMAGE", this.isOnImg.bind(this));
        EventBus.$on("RAYCASTERIMAGECLICK", this.onClickImage.bind(this));

        if (Common.isTouch == true) {
            this.autoScrollEnabled = false;
        } else {
            this.autoScrollEnabled = true;
        }


    }

    isOnImg(e) {


        // pan camera if thumb hover
        if (Common.isInGallery == false) {
            if (e == false) {
                this.slant = -3;
                if (this.autoScrollEnabled) {
                    this.autoScroll = 0.02;
                }
            } else {
                if (this.camPos.x >= e.object.position.x - 3) {
                    this.slant = -1;
                    if (this.autoScrollEnabled) {
                        this.autoScroll = 0.001;
                    }
                }
            }
        }
    }

    isScrollEnabled(e) {
        this.scrollEnabled = e;
    }


    onClickImage(e) {

        if (Common.isInGallery == false) {

            this.autoScrollEnabled = false;

            this.transition = true;
            this.camPos.x = e.object.position.x;
            this.slant = 0;

        }
    }


    onPan(e) {


        if (Common.isInGallery == true) {
            this.slant = 0;
            if (this.scrollEnabled == true) {
                this.camPos.y += e / 2;
            }
        } else {
            if (this.scrollEnabled == true) {
                this.camPos.x += e / 2;
            }
        }


        if (Common.isInGallery == true) {
            if (this.camPos.y >= -Gallery.globalHeight + Gallery.sectionHeight - Gallery.imageClicks) {
                EventBus.$emit("ISINGALLERY", false);
                Gallery.clicks = Gallery.clicks - 10;
                Gallery.imageClicks = Gallery.imageClicks - 10;

                Gallery.globalHeight = Gallery.globalHeight - Gallery.sectionHeight;
            } else if (this.camPos.y <= -Gallery.globalHeight - Gallery.clicks) {
                EventBus.$emit("ISINGALLERY", false);
            }
        }
    }




    onWheel(e) {
        if (Common.isInGallery == true) {
            this.slant = 0;
            if (this.scrollEnabled == true) {
                this.camPos.y -= e / 200;
            }
        } else {
            this.autoScrollEnabled = true
            // this.slant = -3;
            if (this.scrollEnabled == true) {
                this.camPos.x += e / 200;
            }
        }




        if (Common.isInGallery == true) {
            
            // this is to check if the camera has entered the thumbnails
            if (this.camPos.y >= -Gallery.globalHeight + Gallery.sectionHeight - Gallery.imageClicks) {
                // coming in from top
                EventBus.$emit("ISINGALLERY", false);
                Gallery.clicks = Gallery.clicks - 10;
                Gallery.imageClicks = Gallery.imageClicks - 10;
                Gallery.globalHeight = Gallery.globalHeight - Gallery.sectionHeight;
            } else if (this.camPos.y <= -Gallery.globalHeight - Gallery.clicks) {
                EventBus.$emit("ISINGALLERY", false);
            }
        }




    }
    mouseMove(e) {

        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    }


 

    loop() {

        let breathing = Math.sin(Date.now() * 0.0012) * Math.PI * 0.02;
        // console.log(this.camPos.y, Common.camera.position.y)
        if (this.autoScrollEnabled == true) {
            this.camPos.x += this.autoScroll;
        }

        if (this.scrollEnabled == true) {
            this.camPos.z = 15;
            if (Common.isInGallery == false) {
                if (this.transition == false) {
                    Common.camera.position.x = lerp(Common.camera.position.x, this.camPos.x + this.mouse.x / 2 + this.slant, 0.08);
                    Common.camera.position.y = lerp(Common.camera.position.y, this.mouse.y + breathing + this.camPos.y, 0.08);
                    this.camLookAt.x = lerp(this.camLookAt.x, this.camPos.x + this.mouse.x * 6, 0.1);
                    this.camLookAt.y = lerp(this.camLookAt.y, this.camPos.y + this.mouse.y * 6, 0.1);
                }
            } else {
                if (this.transition == false) {
                    Common.camera.position.y = lerp(Common.camera.position.y, this.camPos.y + this.mouse.y / 2 + breathing, 0.08);
                    Common.camera.position.x = lerp(Common.camera.position.x, this.camPos.x + this.mouse.x / 2 + this.slant, 0.08);
                } else {
                    Common.camera.position.x = lerp(Common.camera.position.x, this.camPos.x + this.slant, 0.08);
                }
            }
        }

        // this is for the intro page
        else {
            this.camPos.z = 30;
            // this.camPos.x = 10;
            Common.camera.position.x = lerp(Common.camera.position.x, this.camPos.x + this.mouse.x / 2 + - 60, 0.08);
            Common.camera.position.y = lerp(Common.camera.position.y, this.camPos.y + this.mouse.y / 2 + breathing + 40, 0.08);
            // Common.camera.position.y = lerp(Common.camera.position.y, this.mouse.y / 2 + breathing + this.camPos.y, 0.08);
            this.camLookAt.y = lerp(this.camLookAt.y, this.camPos.y, 0.1);
            if (Common.isInGallery == false) {
                this.camLookAt.x = lerp(this.camLookAt.x, this.camPos.x + this.mouse.x * 1.8 - 30, 0.3);
            }
        }




        // slow the transition between thumbnails and gallery
        // position the camera on thumb click
        if (this.transition == true) {
            this.camPos.y = -Gallery.globalHeight + Gallery.sectionHeight - Gallery.clicks;
            Common.camera.position.y = lerp(Common.camera.position.y, this.camPos.y, 0.07);

            this.camLookAt.y = lerp(this.camLookAt.y, this.camPos.y, 0.1);
            this.camLookAt.x = lerp(this.camLookAt.x, this.camPos.x, 0.1);
            if (this.transition) {
                setTimeout(() => {
                    this.transition = false;
                }, 1000);
            }
        }




        Common.camera.position.z = lerp(Common.camera.position.z, this.camPos.z, 0.08);

        if (Common.isInGallery == false) {
            this.camLookAt.y = lerp(this.camLookAt.y, this.mouse.y * 1.8 + breathing + this.camPos.y, 0.3);
        }
        //scroll lookat in gallery
        else if (Common.isInGallery == true) {
            if (this.transition == false) {
                this.camLookAt.y = lerp(this.camLookAt.y, this.camPos.y, 0.3);
            }
        }

        Common.camera.lookAt(this.camLookAt.x, this.camLookAt.y, 0);
        // Common.camera.rotation.z = lerp(Common.camera.rotation.z, this.mouse.x / (-2), 0.08);

    }
}



export default new Camera();