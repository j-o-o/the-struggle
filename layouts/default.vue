<template>
  <div>
    <Scene />
    <nuxt />
    <Menu />
  </div>
</template>

<script>
import Scene from "~/components/Scene";
import Menu from "~/components/Menu";

export default {
  components: {
    Scene,
    Menu
  }
}
</script>

<style>
html, body{
  overflow: hidden
}
</style>
