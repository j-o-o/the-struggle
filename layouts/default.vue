<template>
  <div>
    <Scene />
    <nuxt />
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
</style>
