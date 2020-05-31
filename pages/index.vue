<template>
  <main>

    <logo />

    <div id="intro">

    <div class="intro-container">
      <div class="title">
        <div class="title_1">
          The struggle is 
        </div>
        <div class="title_2">
          part of the story
        </div>
      </div>
      <div id="info">
        <ul>
          <li>
            Digitale Ausstellung
          </li>
          <li>
            Klasse Julia Albrecht
          </li>
          <li>
            Fotografisches Storytelling
          </li>
          <li>
            Bauhaus-University Weimar
          </li>
          <li>
            SS 2020
          </li>
        </ul>
      </div>
      
    </div>





    <div id="intro-text-grid">
      <p>
      Geschichten werden durch viele verschiedene Ausdrucksformen erzählt 
      und dabei haben sich viele Möglichkeiten etabliert, mit denen man reale 
      oder abstrakte Ereignisse erzählen kann. Wenn man diesen Aspekt rein in 
      der Fotografie betrachtet, finden sich auch hier die Möglichkeiten, sich 
      selbst die nüchternsten Sachinformationen in das&nbsp;Gedächtnis&nbsp;zu&nbsp;prägen. <br>
      Dabei&nbsp;erzählt&nbsp;sich eine Geschichte am einfachsten in einer Bildserie, 
      gleich ob stringent oder abstrakt. The&nbsp;concept&nbsp;sells&nbsp;the&nbsp;story. 
      In manchen Fällen reicht sogar nur eine Fotografie aus, um eine ganze 
      Geschichte zu erzählen. Je mehr Bilder hinzugefügt werden, umso umfangreicher kann diese werden.</p>
      <p>
      Oftmals brennt in uns eine ganz eigene Geschichte, die uns fesselt 
      und wir gerne befreien möchten. Eine&nbsp;Passion,&nbsp;die&nbsp;uns hilft, 
      oftmals die besten fotografischen Geschichten zu erzählen. <br>
      Doch wie erkenne ich den richtigen Augenblick für meine Geschichte? 
      Es&nbsp;erfordert&nbsp;manchmal&nbsp;eine gewisse Ausdauer und Ambition für die Thematik. 
      Es ist Geduld gefragt und die sorgfältige Beobachtung der eigenen Umwelt. 
      Man muss lernen, die Geschichte im Alltag zu erkennen, oder man plant diese 
      und setzt Sie im entsprechendem Setting&nbsp;in&nbsp;Szene.</p>
      </div>
      <hr>
      <div class="intro-container">
        <div id="enter">
          <nuxt-link to="exhibition">
            <div class="letter_1">Enter</div>
            <div class="letter_2">Exhibition</div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import EventBus from "~/utils/event-bus";

import Logo from '~/components/Logo.vue'
import anime from 'animejs/lib/anime.es.js';
import { lerp } from 'math-toolbox'


export default {
  name: 'index',

  components: {
    Logo
  },
  data () {
    return {
      mouse: {x: null, y: null},
      posX: null
    }
  },
  methods: {
    mouseMove(e){
      this.mouse.x = lerp(this.mouse.x, ( e.x / window.innerWidth ) * 2 - 1, 0.1);
      this.mouse.y = lerp(this.mouse.y, -( e.y / window.innerHeight ) * 2 + 1, 0.1);
      let scale_1 = -this.mouse.y + 1.2
      let scale_2 = this.mouse.y + 1.2
      this.t_1.style.transform = "translate(" + this.mouse.x * 40 + 'px, ' + this.mouse.y * 40 + 'px) scaleY(' + scale_1 + ')'
      this.t_2.style.transform = "translate(" + this.mouse.x * 40 + 'px, ' + this.mouse.y * 40 + 'px) scaleY(' + scale_2 + ')'
      // this.t_1.style.transform = 'scaleY(' + scale_1 + ')'
      // this.t_2.style.transform = 'scaleY(' + scale_2 + ')'
    },
  },
  mounted() {

    EventBus.$on("MOUSEMOVELOOP", this.mouseMove);
    this.intro = document.querySelector('.intro-container')

    this.t_1 = document.querySelector('.title_1');
    this.t_1.style.display = 'block'
    this.t_1.innerHTML = this.t_1.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    this.t_2 = document.querySelector('.title_2');
    this.t_2.style.display = 'block'
    this.t_2.innerHTML = this.t_2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");



    let t_3 = document.querySelector('.letter_1');
    t_3.style.display = 'block'
    t_3.innerHTML = t_3.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    let t_4 = document.querySelector('.letter_2');
    t_4.style.display = 'block'
    t_4.innerHTML = t_4.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: false})
      .add({
        targets: '.title_1 .letter',
        scale: [0.2, 1],
        scaleX: [1, 0.9],
        opacity: [0, 1],
        rotate: ['10deg', '0deg'],
        easing: "easeOutCirc",
        duration: 950,
        delay: (el, i) => 70*i,
        complete: function(anim) {
          anime.timeline({loop: true})
          .add({
            delay: 800
          })
          .add({
            targets: '.title_1 .letter',
            scale: 1,
            scaleX: [0.9, 1.2],
            easing: "easeInOutQuad",
            duration: 2000,
            delay: (el, i) => 70*i + 70
          })
          .add({
            delay: 800
          })
          .add({
            targets: '.title_1 .letter',
            scaleX: [1.2, 0.9],
            easing: "easeInOutQuad",
            duration: 2000,
            delay: (el, i) => 70*i + 70
          })
        }
      })


      


      anime.timeline({loop: false})
        .add({
            delay: 900
        })
        .add({  
          targets: '.title_2 .letter',
          scale: [0.2,1],
          opacity: [0,1],
          scaleX: [1.2, 0.9],
          rotate: ['10deg', '0deg'],
          easing: "easeOutCirc",
          duration: 950,
          delay: (el, i) => 70*i,


          complete: function(anim) {
            anime.timeline({loop: true})
            .add({
              delay: 800
            })
            .add({
              targets: '.title_2 .letter',
              scale: 1,
              scaleX: [0.9, 1.2],
              easing: "easeInOutQuad",
              duration: 2000,
              delay: (el, i) => 70*i
            })
            .add({
              delay: 800
            })
            .add({
              targets: '.title_2 .letter',
              scaleX: [1.2, 0.9],
              easing: "easeInOutQuad",
              duration: 2000,
              delay: (el, i) => 70*i
            })
          }

        })


  },
}
</script>

<style scoped>
#intro{
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(255,255,255,0.8);
  z-index: 2;
  overflow: scroll;
  height: 100%;
}
.intro-container{
  font-weight: inherit;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  position: relative;
  overflow: hidden;
}
.title{

  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  text-align: center;
  font-family: 'font2';
  font-size: 18vw;
  color: #313131;

}.title_1{
  display: none;
}.title_2{
  display: none;
}


#info{
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 24px;
  font-size: inherit;
  width: calc(100% - 48px);
  text-transform: uppercase;
}
#info ul{
  padding: 0;
  margin: 0;
  list-style: none;
  justify-content: space-between;
  display: flex;
  text-align: center;
}
#info li{
  /* display: inline-block; */
}


/* */
#intro-text-grid{
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 24px;
  grid-gap: 12px;
  background: white;
}
hr{
  border: none;
  margin: 0 0;
}
p {
  /* text-indent: 52px; */
} 



#enter{
  text-align: center;
  font-family: 'font2';
  font-size: 18vw;
  
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 90vw;

  border-radius: 12px;
  
  padding: 12px;
  height: 80vh;
}

#enter a{
  color: #313131;
  text-decoration: none;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 80vw;
}


</style>
