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
<hr>
    <div id="intro-text-grid">
      <p>
      Geschichten werden durch viele verschiedene Ausdrucksformen erzählt 
      und dabei haben sich viele Möglichkeiten etabliert, mit denen man reale 
      oder abstrakte Ereignisse erzählen kann. Wenn man diesen Aspekt rein in 
      der Fotografie betrachtet, finden sich auch hier die Möglichkeiten, sich 
      selbst die nüchternsten Sachinformationen in das Gedächtnis zu prägen. 
      Dabei erzählt sich eine Geschichte am einfachsten in einer Bildserie, 
      gleich ob stringent oder abstrakt. The concept sells the story. 
      In manchen Fällen reicht sogar nur eine Fotografie aus, um eine ganze 
      Geschichte zu erzählen. Je mehr Bilder hinzugefügt werden, umso umfangreicher kann diese werden.</p>
      <p>
      Oftmals brennt in uns eine ganz eigene Geschichte, die uns fesselt 
      und wir gerne befreien möchten. Eine Passion, die uns hilft, 
      oftmals die besten fotografischen Geschichten zu erzählen. 
      Doch wie erkenne ich den richtigen Augenblick für meine Geschichte? 
      Es erfordert manchmal eine gewisse Ausdauer und Ambition für die Thematik. 
      Es ist Geduld gefragt und die sorgfältige Beobachtung der eigenen Umwelt. 
      Man muss lernen, die Geschichte im Alltag zu erkennen, oder man plant diese 
      und setzt Sie im entsprechendem Setting in Szene.</p>
      </div>
      <hr>
      <div class="intro-container">
        <div id="enter">
          <nuxt-link to="exhibition">
            <div id="letter_1">Enter</div>
            <div id="letter_2">Exhibition</div>
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


export default {
  name: 'index',

  components: {
    Logo
  },
  data () {
    return {
      wheeled: null,
    }
  },
  methods: {
    init(){

    }
  },
  mounted() {
      let t_1 = document.querySelector('.title_1');
      t_1.style.display = 'block'
      t_1.innerHTML = t_1.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
      anime.timeline({loop: false})
        .add({  
          targets: '.title_1 .letter',
          scale: [0.2,1],
          opacity: [0,1],
          rotate: ['-10deg', '0deg'],
          easing: "easeOutCirc",
          duration: 950,
          delay: (el, i) => 70*i
        }).add({
          targets: '.ml2',
          opacity: 0,
          duration: 1000,
          easing: "easeOutCirc",
          delay: 1000
        });


      let t_2 = document.querySelector('.title_2');
      t_2.style.display = 'block'
      t_2.innerHTML = t_2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
      anime.timeline({loop: false})
        .add({
            delay: 900
        })
        .add({  
          targets: '.title_2 .letter',
          scale: [0.2,1],
          opacity: [0,1],
          rotate: ['-10deg', '0deg'],
          easing: "easeOutCirc",
          duration: 950,
          delay: (el, i) => 70*i,
        }).add({
          targets: '.ml2',
          opacity: 0,
          duration: 1000,
          easing: "easeOutCirc",
          delay: 1000
        });




      let t_3 = document.querySelector('#letter_1');
      t_3.style.display = 'block'
      t_3.innerHTML = t_3.textContent.replace(/\S/g, "<span class='letter'>$&</span>");


      let t_4 = document.querySelector('#letter_2');
      t_4.style.display = 'block'
      t_4.innerHTML = t_4.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
      anime.timeline({loop: true})

        .add({  
            targets: '#letter_1 .letter',
            translateY: [1000,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1400,
            delay: anime.stagger(50, {start: 250}),
          })

        .add({  
            targets: '#letter_1 .letter',
            translateY: [0,-1000],
            opacity: [1,0],
            easing: "easeInExpo",
            duration: 1200,
            delay: anime.stagger(50, {start: 250}),
          })

        anime.timeline({loop: true})
        .add({  
            targets: '#letter_2 .letter',
            translateY: [1000,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1400,
            delay: anime.stagger(50),
          })
        .add({  
            targets: '#letter_2 .letter',
            translateY: [0,-1000],
            opacity: [1,0],
            easing: "easeInExpo",
            duration: 1200,
            delay: anime.stagger(50),
          })
  },
}
</script>

<style scoped>
#intro{
  font-family: 'font';
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(255,255,255,0.8);
  z-index: 2;
  overflow: scroll;
  height: 100%;
  color: #585858;
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
  font-family: Helvetica, Arial, sans-serif;
  font-size: inherit;
}
#info ul{
  padding: 0;
  margin: 0;
  list-style: none;
}

#intro-text-grid{
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 24px;
  grid-gap: 12px;
}
hr{
  border: none;
  border-top: 1px solid #585858;
  margin: 0 0;
}
p {
  text-indent: 52px;
  font-family: Helvetica, Arial, sans-serif;
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
