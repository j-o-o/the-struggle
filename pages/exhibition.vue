<template>
  <main>
    <Menu />
    <logo />
    <div id="pages">

      <div id="title">
        Teilnehmer
      </div>

      <ul class="players">
        <li v-for="user in users" :key="user.id">
        <NuxtLink :to="'/exhibition/'+user.id">
          {{ user.name }}
        </NuxtLink>
        </li>
      </ul>

      <div class="right">
        <NuxtChild :key="$route.params.id" />
      </div>

    </div>
  </main>
</template>

<script>

import Menu from "~/components/Menu"
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Menu,
    Logo
  },  
  name: 'deprecated',
  asyncData ({ env }) {
    return { users: env.users }
  },
}
</script>
<style>
html, body{
  overflow: hidden
}
#pages{
  position: fixed;
  z-index: 2;
  top: 0;
  left: 50%;
}
</style>
