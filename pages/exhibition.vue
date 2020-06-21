<template>
  <main>

    <Menu />
    <logo />


    <div id="pages">

      <div id="title">
        Teilnehmer
      </div>



      <div class="right">
        <NuxtChild :key="$route.params.id" />
      </div>

    </div>



    <ul class="artists">
      <li v-for="user in users" :key="user.id">
      <NuxtLink :to="'/exhibition/'+user.id" class="artists_url">
        {{ user.name }}
      </NuxtLink>
      </li>
    </ul>




  </main>

</template>

<script>

import Menu from "~/components/Menu"
import Logo from '~/components/Logo.vue'
import EventBus from "~/utils/event-bus"

export default {
  transition: 'fade',
  components: {
    Menu,
    Logo
  },  
  name: 'deprecated',
  asyncData ({ env }) {
    return { users: env.users }
  },
  Data (){
    return{

    isInGallery: true
    }
  },
  methods: {


    getID(e){

      //update URL 
      if(this.isInGallery == true){
        history.replaceState('', '', window.location.protocol + '//' + window.location.host + '/exhibition/' + e);
      } else {
        e = ''
        history.replaceState('', '', window.location.protocol + '//' + window.location.host + '/exhibition/' + e);
      }


    },
    isInGallery(e){
      this.isInGallery = e
      this.getID()
    }
  },
  mounted() {
    EventBus.$on("CLICKEDID", this.getID.bind(this))
    EventBus.$on("ISINGALLERY", this.isInGallery.bind(this))
    EventBus.$emit("SCROLLENABLED", true);

    this.a_1 = document.querySelector('.artists_url');
    this.a_1.innerHTML = this.a_1.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  }
}
</script>
<style>
html, body{
  overflow: hidden
}


ul.artists{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: space-between;

  list-style: none;
  padding: 0;
}
ul li{
  margin: 0 24px
}
.artists a{
    color: #585858;
    text-decoration: none;
}
</style>
