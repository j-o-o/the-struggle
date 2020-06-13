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
export default {
  
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
