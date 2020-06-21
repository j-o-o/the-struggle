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
      <li v-for="(user, index) in users" :key="user.id">
        <NuxtLink :to="'/exhibition/'+user.id" class="artists_url" :id="index">
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
import anime from 'animejs/lib/anime.es.js';

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
      isInGallery: true,
      artist: null
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
    },
    onImgHover(e){
      if(e != false){
        this.artist = e.object.uuid
        // var element = document.getElementById(this.artist);

        // for (let i = 0; i < element.children.length; i++) {
        //   element.children[i].classList.add("block")
        // }

      }
    },

    animateButton(el, scale, duration, elasticity) {
      anime.remove(el);
      anime({
        targets: el,
        scale: scale,
        duration: duration,
        elasticity: elasticity
      });
    },
  },




  mounted() {
    EventBus.$on("CLICKEDID", this.getID.bind(this))
    EventBus.$on("ISINGALLERY", this.isInGallery.bind(this))
    EventBus.$emit("SCROLLENABLED", true);
    EventBus.$on("RAYCASTERIMAGE", this.onImgHover);



    var urls = document.getElementsByClassName('artists_url');



    for (var i = 0; i < urls.length; i++) {

      var item = urls.item(i)
      
      item.innerHTML = urls.item(i).textContent.replace(/\S/g, "<span class='letter'>$&</span>");

      // console.log(urls.item(i).children)
      var spans = item.children



      function animateButton(el, scale, duration, elasticity) {
        anime.remove(el);
        anime({
          targets: el,
          scale: scale,
          duration: duration,
          elasticity: elasticity
        });
      }
      function enterButton(el) {
        animateButton(el, 1.2, 800, 400)
      }

      function leaveButton(el) {
        animateButton(el, 1.0, 600, 300)
      }

      item.addEventListener('mouseenter', function(e) {
        enterButton(e.target);
      }, false);
      
      item.addEventListener('mouseleave', function(e) {
        leaveButton(e.target)
      }, false); 



      for (var j = 0; j < spans.length; j++) {
        if(spans.item(j).innerHTML == spans.item(j).innerHTML.toLowerCase()){
          spans.item(j).classList.add("lowercase");
        }
        if(spans.item(j).innerHTML == spans.item(j).innerHTML.toUpperCase()){
          spans.item(j).classList.add("uppercase");
        }

      }






    }

      // var shorty = urls.item(i).innerHTML.replace(/[a-z]/g, '');
      // var old = str.replace(/[A-Z]/g, '');
      // console.log(shorty)

  }
}
</script>
<style>
html, body{
  overflow: hidden;
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
  text-align: center;
}
ul.artists li{
  margin: 0 14px;
}
ul.artists li .artist_url{
  display: flex;
}
.artists a{
  color: #585858;
  text-decoration: none;
  display: flex;
}

.lowercase{
  display: none;
}
.artists_url:hover .lowercase, .block{
  display: block
}
.artists_url:hover .uppercase{
  margin-left: 6px;
}


</style>
