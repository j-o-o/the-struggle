<template>
  <main>

    <Menu />
    <!-- <audio /> -->
    <ul id="artists">
      <li v-for="(user, index) in users" :key="user.id">
        <NuxtLink :to="'/exhibition/'+user.id" class="artists_url" :id="index" >
          {{ user.name }}
        </NuxtLink>
      </li>
    </ul>

    <div id="textcontainer">
      <div id="textcontent">
        
      </div>
    </div>




  </main>

</template>

<script>

import Menu from "~/components/Menu"
import EventBus from "~/utils/event-bus"
import anime from 'animejs/lib/anime.es.js';

export default {
  transition: 'fade',
  components: {
    Menu
  },  
  name: 'deprecated',
  asyncData ({ env }) {
    return { 
      users: env.users 
    }
  },
  Data (){
    return{
      isInGallery: true,
      artist: null,
      artists: null,
      hoveredImg: null,
      mouseenter: false,
      element: null,
      childs: null,
      mobile: null,
      textContainer: null,


      text: null
    }
  },
  mounted() {

    EventBus.$on("CLICKEDID", this.getID.bind(this))
    EventBus.$on("ISINGALLERY", this.isInGallery.bind(this))
    EventBus.$emit("SCROLLENABLED", true)
    EventBus.$on("RAYCASTERIMAGE", this.onImgHover.bind(this))

    EventBus.$on("TEXTCONTENT", this.textContent.bind(this))

    this.textContainer = document.getElementById('textcontent')
    this.artists = document.getElementById('artists')

    let w = window.innerWidth;
    if(w <= 710){
      this.mobile = true
    } else {
      this.mobile = false
    }
    window.addEventListener("resize", this.resize.bind(this));

    this.urls = document.getElementsByClassName('artists_url');

    for (let i = 0; i < this.urls.length; i++) {

      let item = this.urls.item(i)
      
      item.innerHTML = this.urls.item(i).textContent.replace(/\S/g, "<span class='letter'>$&</span>");
      let spans = item.children


      item.addEventListener('mouseenter', this.hoverArtistTitle.bind(item))
      item.addEventListener('mouseleave', this.hoverOutArtistTitle.bind(item))

      //add classes to each menu artist
      for (let j = 0; j < spans.length; j++) {
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

    textContent(e){
      this.textContainer.innerHTML = e
      this.textContainer.style.visibility = "visible"
      this.textContainer.style.opacity = "1"
    },

    hoverArtistTitle(e){
      this.element = e.target
      this.childs_lower = this.element.querySelectorAll('.lowercase')
      this.childs_upper = this.element.querySelectorAll('.uppercase')
      this.enterButton(this.element)
    },
    hoverOutArtistTitle(e){
      this.element = e.target
      // this.element.classList.remove('active');
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

          for (let i = 0; i < this.urls.length; i++) {
            // this.element.classList.remove('active');
            this.animateButton(this.element, 1, 0, 800, 400)
            for (let j = 0; j < this.childs_lower.length; j++) {
              this.childs_lower[j].classList.remove('visible')
            }
            for (let g = 0; g < this.childs_upper.length; g++) {
              this.childs_upper[g].classList.remove('margin6')
            }
          }

          this.mouseenter = false

        }
      }
    },


    enterButton(el) {
      this.animateButton( el, 1.2, 12, 800, 400)

      // el.classList.add('active');
      
      for (let i = 0; i < this.childs_lower.length; i++) {
          this.childs_lower[i].classList.add('visible')
      }
      for (let i = 0; i < this.childs_upper.length; i++) {
          this.childs_upper[i].classList.add('margin6')
      }
    },
    leaveButton(el) {
      this.animateButton( el, 1, 0, 800, 400)

      // el.classList.remove('active');

      // el.classList.remove('highlight')
      for (let i = 0; i < this.childs_lower.length; i++) {
          this.childs_lower[i].classList.remove('visible')
      }
      for (let i = 0; i < this.childs_upper.length; i++) {
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

      if(this.isInGallery == false){

        //delete text description if scrolled out of gallery
          this.textContainer.style.visibility = "hidden"

        this.textContainer.style.opacity = "0"

        //hide artists bar
        this.artists.style.display = 'flex'
      } else if(this.isInGallery == true){
          this.artists.style.display = 'none'
      }
    },



resize(e){
    let w = window.innerWidth;
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


ul#artists{
  position: fixed;
  bottom: 0;
  left: 0;
  width: calc(100% - 24px);
  display: flex;
  justify-content: space-between;
  transition: opacity .4s;

  list-style: none;
  padding: 0;
  text-align: center;
  margin: 12px;
}
ul#artists li{
  margin: 0 14px;
}
ul#artists li .artist_url{
  display: flex;
}
#artists a{
  color: #585858;
  text-decoration: none;
  display: flex;
  transform-origin: bottom;
}

.lowercase{
  display: none;
}
/* #artists_url:hover .lowercase, .block{
  display: block
} */
/* #artists_url:hover .uppercase{
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

/* .active:after{
  content: '';
  position: absolute;

  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);

  border-radius: 3px;
  z-index: -2;
  width: 100%;
  height: 100%;
  filter: blur(4px);
  padding: 4px;
  margin-right: 4px;
  border-radius: 8px;
  animation: blink 4s ease infinite

} */

/* .active{
  border-bottom: 1px solid red;
} */

.lol{
  display: inline-block;
}


@keyframes blink{
  0%{ opacity: .1 }
  50%{ opacity: .3 }
  100%{ opacity: .1 }
}




@media screen and (max-width: 710px) and (orientation: portrait){
  ul#artists{
    display: none!important;
  }
}


#textcontainer{
  width: 100%;
  max-width: 600px;
  height: 320px;
  /* overflow: scroll; */
  position: fixed;
  bottom: 0px;
  left: 12px;

}



#textcontent{
  position:relative;
  width: 100%;
  height: 100%;
  letter-spacing: 0;
  /* transition: opacity .6s ease; */
  overflow: scroll;

  visibility: hidden;
  opacity: 0;
  transition: visibility 0.5s, opacity 0.5s linear;
}
</style>
