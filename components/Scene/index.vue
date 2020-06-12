<template>
  <section class="scene">
    <div id="stats"></div>
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
      images: [],
    }
  },
  mounted () {
    if(!this.scene) this.scene = new Scene({
      $canvas: this.$refs.canvas,
    });
    // this.importAll(require.context('../../assets/images/', true, /\.jpg$/));
    // console.log(this.images)
    
    EventBus.$emit("TRANSITION", this.$route);

  },

  methods: {
    // importAll(r) {
    //   r.keys().forEach(key => (this.images.push({ key: key })));
    // },
  },

  watch: {
    "$route": function(_new, _old){
      EventBus.$emit("TRANSITION", _new);
    }
  },

};
</script>
<style>
#stats{
  position: fixed;
  z-index: 3;
  top:0;
  left: 0;
}
  .scene{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
