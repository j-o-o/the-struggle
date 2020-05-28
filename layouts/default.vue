<template>
  <div>
    <Scene />
    <nuxt />
    <img src="LOGO_simple.svg" id="logo_simple">
  </div>
</template>

<script>

import Scene from "~/components/Scene";
export default {
  components: {
      Scene,
  }
}
</script>

<style>
html, body{
  overflow: hidden
}
#logo_simple{
  position: fixed;
  top: 0;
  right: 0;
  width: 120px;
  z-index: 10;
  margin: 12px;
}
</style>
