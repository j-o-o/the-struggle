<template>
  <div>
    <Loading />
    <Scene />
    <nuxt />
  </div>
</template>

<script>

import Scene from "~/components/Scene";
import Loading from "~/components/loading";
import EventBus from "~/utils/event-bus";
export default {

  mounted(){
    EventBus.$on("RAYCASTERIMAGE", this.onImg);
    EventBus.$on("SCROLLENABLED", this.isScroll);
  },
  methods: {
    onImg(e){
      if(this.isScroll == true){
        if(e != false){
          document.getElementsByTagName("body")[0].style.cursor = "pointer";
        } else {
          document.getElementsByTagName("body")[0].style.cursor = "inherit";
        }
      }
    },
    isScroll(e){
      this.isScroll = e
    }
  },
  components: {
    Scene,
    Loading,
  }
}
</script>

<style>
html, body{ 
  overflow: hidden
}
</style>
