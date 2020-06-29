<template>
    <div class="dom">
        <section class="nav">
            <nuxt-link to="/" >The Struggle <br>is Part of <br>the Story</nuxt-link>
        </section>
    </div>
</template>
<script>

import EventBus from "~/utils/event-bus";

export default {
    name: 'scene',
    asyncData ({ env }) {
        return { users: env.users }
    },
    data () {
        return {
            current: this.$nuxt.$route.params.id,
            artist: false,
            isInGallery: true
        }
    },

    mounted () {
        EventBus.$on("RAYCASTERIMAGE", this.onImgHover);
        EventBus.$on("CLICKEDID", this.getID.bind(this))
        EventBus.$on("ISINGALLERY", this.isItInGallery.bind(this))
    },

    watch: {
        // "$route.params.id": function(_new, _old){
        //     if(isInGallery != true){
        //         this.current = _new
        //     }
        // }
    },
    methods: {
        onImgHover(e){
            if(e != false){
                this.artist = e.object.uuid
            } 
        },
        getID(e){
            if(this.isInGallery == true){
                this.current = e
            } else {
                this.current = ''
            }
        },
        isItInGallery(e){
            this.isInGallery = e
            this.getID()
        }
    }
};
</script>
<style lang="scss">
div.dom{
    position: fixed;
    font-family: 'font2';
    font-size: 28px;
    top: 0;
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px;
    text-align: center;
    transition: transform .4s ease;
    transform-origin: top;
    line-height: 28px;
}
div.dom:hover{
    transform: translateX(-50%) scale(1.1);
}
div.dom a{
    text-decoration: none;
    color: #585858;
}
</style>