<template>
  <main>

    <Menu />
    <!-- <logo /> -->

    <ul class="artists">
      <li v-for="(user, index) in users" :key="user.id">
        <NuxtLink :to="'/exhibition/'+user.id" class="artists_url" :id="index" >
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
      childs: null,
      mobile: null
    }
  },
  mounted() {

    EventBus.$on("CLICKEDID", this.getID.bind(this))
    EventBus.$on("ISINGALLERY", this.isInGallery.bind(this))
    EventBus.$emit("SCROLLENABLED", true);
    EventBus.$on("RAYCASTERIMAGE", this.onImgHover.bind(this));


    var w = window.innerWidth;
    if(w <= 710){
      this.mobile = true
    } else {
      this.mobile = false
    }
    window.addEventListener("resize", this.resize.bind(this));


    this.urls = document.getElementsByClassName('artists_url');


    for (var i = 0; i < this.urls.length; i++) {

      var item = this.urls.item(i)
      
      item.innerHTML = this.urls.item(i).textContent.replace(/\S/g, "<span class='letter'>$&</span>");
      var spans = item.children

      item.addEventListener('mouseenter', this.hoverArtistTitle.bind(item))
      item.addEventListener('mouseleave', this.hoverOutArtistTitle.bind(item))
      // this.enterButton(this.element) 

      //add classes to each menu artist
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

    hoverArtistTitle(e){
      this.element = e.target
      this.childs_lower = this.element.querySelectorAll('.lowercase')
      this.childs_upper = this.element.querySelectorAll('.uppercase')
      this.enterButton(this.element)
    },
    hoverOutArtistTitle(e){
      this.element = e.target
      this.childs_lower = this.element.querySelectorAll('.lowercase')
      this.childs_upper = this.element.querySelectorAll('.uppercase')
      this.leaveButton(this.element)
    },




    getID(e){

      //update URL 
      if(this.isInGallery == true){
        history.replaceState('', '', window.location.protocol + '//' + window.location.host + '/exhibition/' + e);
      } else {
        e = ''
        history.replaceState('', '', window.location.protocol + '//' + window.location.host + '/exhibition/' + e);
      }

    },



    onImgHover(e){
      if( e != false){
        if(!this.mouseenter) {
          this.hoveredImg = e.object.uuid
          this.element = document.getElementById(this.hoveredImg);
          this.childs_lower = this.element.querySelectorAll('.lowercase')
          this.childs_upper = this.element.querySelectorAll('.uppercase')
          this.enterButton(this.element)

          this.mouseenter = true
        }
      } 




      else if( e == false){

        if(this.mouseenter) {

          for (var i = 0; i < this.urls.length; i++) {
            this.animateButton(this.element, 1, 0, 800, 400)
            for (var j = 0; j < this.childs_lower.length; j++) {
              this.childs_lower[j].classList.remove('visible')
            }
            for (var g = 0; g < this.childs_upper.length; g++) {
              this.childs_upper[g].classList.remove('margin6')
            }
          }

          this.mouseenter = false

        }
      }
    },


    enterButton(el) {
      this.animateButton( el, 1.2, 12, 800, 400)
      
      for (var i = 0; i < this.childs_lower.length; i++) {
          this.childs_lower[i].classList.add('visible')
      }
      for (var i = 0; i < this.childs_upper.length; i++) {
          this.childs_upper[i].classList.add('margin6')
      }
    },
    leaveButton(el) {
      this.animateButton( el, 1, 0, 800, 400)
      // el.classList.remove('highlight')
      for (var i = 0; i < this.childs_lower.length; i++) {
          this.childs_lower[i].classList.remove('visible')
      }
      for (var i = 0; i < this.childs_upper.length; i++) {
          this.childs_upper[i].classList.remove('margin6')
      }
    },

    animateButton(el, scale, margin, duration, elasticity) {
      this.mouseenter = false
      anime.remove(el);
      anime({
        targets: el,
        scale: scale,
        marginLeft: margin,
        marginRight: margin,
        duration: duration,
        elasticity: elasticity
      });
    },


    isInGallery(e){
      this.isInGallery = e
      this.getID()
    },



resize(e){
    var w = window.innerWidth;
    if(w <= 710){
      this.mobile = true
      console.log('mobile')
    } else {
      this.mobile = false
      console.log('desktop')
    }
}



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
  width: calc(100% - 24px);
  display: flex;
  justify-content: space-between;

  list-style: none;
  padding: 0;
  text-align: center;
  margin: 12px;
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
  transform-origin: bottom;
}

.lowercase{
  display: none;
}
/* .artists_url:hover .lowercase, .block{
  display: block
} */
/* .artists_url:hover .uppercase{
  margin-left: 6px;
} */

.visible{
  display: block
}
.margin6{
  margin-left: 6px;
}
.white_name{
  display: none;
}


@media screen and (max-width: 710px){

  ul.artists{
    
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    display: inherit;
    left: 0;
    width: inherit;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 12px;
  }
}


</style>
