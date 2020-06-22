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
      artist: null,
      hoveredImg: null,
      mouseenter: false,
      element: null,
      childs: null
    }
  },
  mounted() {

    EventBus.$on("CLICKEDID", this.getID.bind(this))
    EventBus.$on("ISINGALLERY", this.isInGallery.bind(this))
    EventBus.$emit("SCROLLENABLED", true);
    EventBus.$on("RAYCASTERIMAGE", this.onImgHover.bind(this));



    this.urls = document.getElementsByClassName('artists_url');


    for (var i = 0; i < this.urls.length; i++) {

      var item = this.urls.item(i)
      
      item.innerHTML = this.urls.item(i).textContent.replace(/\S/g, "<span class='letter'>$&</span>");

      // console.log(urls.item(i).children)
      var spans = item.children

      item.addEventListener('mouseenter', this.animateButton.bind(this, item, 1.2, 800, 400))
      item.addEventListener('mouseleave', this.animateButton.bind(this, item, 1.0, 600, 300))


      for (var j = 0; j < spans.length; j++) {
        if(spans.item(j).innerHTML == spans.item(j).innerHTML.toLowerCase()){
          spans.item(j).classList.add("lowercase");
        }
        if(spans.item(j).innerHTML == spans.item(j).innerHTML.toUpperCase()){
          spans.item(j).classList.add("uppercase");
        }

      }
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
      if( e != false){

        if(!this.mouseenter) {
          this.hoveredImg = e.object.uuid
          this.element = document.getElementById(this.hoveredImg);
          this.animateButton(this.element, 1.2, 800, 400)

          this.childs_lower = this.element.querySelectorAll('.lowercase')
          this.childs_upper = this.element.querySelectorAll('.uppercase')
          for (var i = 0; i < this.childs_lower.length; i++) {
              this.childs_lower[i].style.display = 'block'
          }
          for (var i = 0; i < this.childs_upper.length; i++) {
              this.childs_upper[i].style.marginLeft = '6px'
          }

          this.mouseenter = true
        }

      } 
      else if( e == false){

        if(this.mouseenter) {

          for (var i = 0; i < this.urls.length; i++) {
            this.animateButton(this.element, 1, 800, 400)
            for (var j = 0; j < this.childs_lower.length; j++) {
                this.childs_lower[j].style.display = 'none'
            }
            for (var g = 0; g < this.childs_upper.length; g++) {
                this.childs_upper[g].style.marginLeft = '0px'
            }
          }

          this.mouseenter = false

        }
      //   // if(this.mouseenter) {
      //     if(!this.mouseenter) {
      //       console.log('out')
      //       this.animateButton(element, 1, 800, 400)
      //       this.mouseenter = true
      //     }
      //     // this.mouseenter = true
      //   // }
      }
    },


    enterButton(el) {
      this.animateButton.bind(el, 1.2, 800, 400)
    },
    leaveButton(el) {
      this.animateButton.bind(el, 1.0, 600, 300)
    } ,

    animateButton(el, scale, duration, elasticity) {
      this.mouseenter = false
      anime.remove(el);
      anime({
        targets: el,
        scale: scale,
        duration: duration,
        elasticity: elasticity
      });
    },
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
