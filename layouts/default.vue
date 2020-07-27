<template>
  <div>
    <Scene />
    <nuxt />
  </div>
</template>

<script>

import Scene from "~/components/Scene";
// import Common from "~/components/Common";
import EventBus from "~/utils/event-bus";
export default {

  Data (){
    return{
      isInGallery: null,
      isScroll: null
    }
  },
  mounted(){
    EventBus.$on("RAYCASTERIMAGE", this.onImg);

  },
  methods: {
    onImg(e){
      if(e != false){
        document.getElementsByTagName("body")[0].style.cursor = "pointer";
      } else {
        document.getElementsByTagName("body")[0].style.cursor = "inherit";
      }
    }
  },
  components: {
    Scene,
  }
}
</script>

<style>
html, body{ 
  overflow: hidden
}
</style>
