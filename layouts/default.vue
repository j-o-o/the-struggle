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
    console.info('%c%s', 'color: green; font-size: 18px', '𝒲𝑒𝒷𝓈𝒾𝓉𝑒 𝒷𝓎 𝐸𝓇𝒾𝓀 𝒮𝒶𝒸𝒽𝓈𝑒')
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
    Loading,
  }
}
</script>

<style>
html, body{ 
  overflow: hidden
}
</style>
