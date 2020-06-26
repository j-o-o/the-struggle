<template>
    <div class="dom">
        <section class="nav">
            <nuxt-link to="/" id="home"></nuxt-link>
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
    top: 0;
    left: 50%;
    padding: 20px 30px;
}
#home{
    right: 0;
    top: 0;
    position: fixed;
    width: 12px;
    height: 12px;
    margin: 6px;
    border-radius: 6px;
    background: #585858;
}
</style>