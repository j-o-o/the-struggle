<template>
  <section class="scene">
    <canvas class="scene__canvas" ref="canvas"></canvas>
  </section>
</template>

<script>
import Scene from "./js/Scene";
import EventBus from "~/utils/event-bus";


export default {
  name: 'scene',
  data () {
    return {
    }
  },
  mounted () {
    if(!this.scene) this.scene = new Scene({
      $canvas: this.$refs.canvas,
    });
    EventBus.$emit("TRANSITION", this.$route.name);

  },
  watch: {
    "$route.name": function(_new, _old){
      EventBus.$emit("TRANSITION", _new);
    }
  },
};
</script>
<style>
  .scene{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
