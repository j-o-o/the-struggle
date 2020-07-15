<template>
    <div class="audio">
        <audio :src="require('@/assets/bg_struggle.mp3')" controls></audio>
    </div>
</template>
<script>

import EventBus from "~/utils/event-bus";

export default {


    data () {
        return {
            isInGallery: true
        }
    },
    mounted() {
        EventBus.$on("ISINGALLERY", this.isItInGallery.bind(this))
    },

    methods: {

        isItInGallery(e){
            this.isInGallery = e
            if(e == true){

            }
        }
    }
}

</script>