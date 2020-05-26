<template>
  <main>
    <Menu />
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

import Menu from "~/components/Menu";

export default {
  components: {
    Menu
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
