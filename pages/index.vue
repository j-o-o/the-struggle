<template>
  <main>

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
            Digital Exhibition
          </li>
          <li>
            Klasse Julia Albrecht
          </li>
          <li>
            Photographic storytelling
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
      <div class="left">
      <p>
      Geschichten werden durch viele verschiedene Ausdrucksformen erzählt 
      und dabei haben sich viele Möglichkeiten etabliert, mit denen man reale 
      oder abstrakte Ereignisse erzählen kann. Wenn man diesen Aspekt rein in 
      der Fotografie betrachtet, finden sich auch hier die Möglichkeiten, sich 
      selbst die nüchternsten Sachinformationen in das&nbsp;Gedächtnis&nbsp;zu&nbsp;prägen. </p><p>
      Dabei&nbsp;erzählt&nbsp;sich eine Geschichte am einfachsten in einer Bildserie, 
      gleich ob stringent oder abstrakt. The&nbsp;concept&nbsp;sells&nbsp;the&nbsp;story. 
      In manchen Fällen reicht sogar nur eine Fotografie aus, um eine ganze 
      Geschichte zu erzählen. Je mehr Bilder hinzugefügt werden, umso umfangreicher kann diese werden.</p>
      </div>
      <div class="right">
      <p>
      Oftmals brennt in uns eine ganz eigene Geschichte, die uns fesselt 
      und wir gerne befreien möchten. Eine&nbsp;Passion,&nbsp;die&nbsp;uns hilft, 
      oftmals die besten fotografischen Geschichten zu erzählen. </p><p>
      Doch wie erkenne ich den richtigen Augenblick für meine Geschichte? 
      Es&nbsp;erfordert&nbsp;manchmal&nbsp;eine gewisse Ausdauer und Ambition für die Thematik. 
      Es ist Geduld gefragt und die sorgfältige Beobachtung der eigenen Umwelt. 
      Man muss lernen, die Geschichte im Alltag zu erkennen, oder man plant diese 
      und setzt Sie im entsprechendem Setting&nbsp;in&nbsp;Szene.</p>
      </div>
    </div>
    <hr>


      <div class="intro-container">
  
        <svg version="1.1" id="svg1" class="enter_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 595.28 595.28" style="enable-background:new 0 0 595.28 595.28;" xml:space="preserve">
        <style type="text/css">
          .st5{fill:none;stroke:#313131;stroke-width:70;stroke-miterlimit:10;stroke-dasharray:1,12;}
        </style>
        <g>
          <circle class="st5" cx="297.64" cy="297.64" r="209.83"/>
        </g>
        </svg>
        <svg version="1.1" id="svg2" class="enter_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 595.28 595.28" style="enable-background:new 0 0 595.28 595.28;" xml:space="preserve">
        <style type="text/css">
          .st6{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;stroke-dasharray:1, 30;}
        </style>
        <circle class="st6" cx="297.64" cy="297.64" r="129.42"/>
        </svg>


        <div id="enter">
          <nuxt-link to='exhibition' id="expired"> <div class='letter_1'>Enter</div> <div class='letter_2'>Exhibition</div> </nuxt-link>
          <div id='countdown'></div>
        </div>



      </div>
  <hr>
    <div id="footer">
        <ul>
          <li>
            Class provided by <a href="https://www.uni-weimar.de/bauhausmodule/" target="_blank">Bauhaus.Module</a> 
            </li><li>
            Led by <a href="http://albrechtjulia.de/" target="_blank">Julia Albrecht</a>
            </li><li>
            Website by <a href="http://eriksachse.com/" target="_blank">Erik Sachse</a>
            </li><li>
            <nuxt-link to="privacypolicy">Privacy Policy and Imprint</nuxt-link>
            </li>
          </ul>
    </div>
    </div>
  </main>
</template>

<script>
import EventBus from "~/utils/event-bus";

import anime from 'animejs/lib/anime.es.js';
import { lerp } from 'math-toolbox'


export default {
  name: 'index',
  asyncData () {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve({})
      }, 100)
    })
  },
  data () {
    return {
      mouse: {x: null, y: null},
      posX: null,
      isItTouch: null
    }
  },
  methods: {
    isTouch(e){
      this.isItTouch = e
      console.log(e)
    },
    mouseMove(e){
      if(this.isItTouch == false){
        this.mouse.x = lerp(this.mouse.x, ( e.x / window.innerWidth ) * 2 - 1, 0.1);
        this.mouse.y = lerp(this.mouse.y, -( e.y / window.innerHeight ) * 2 + 1, 0.1);
        let scale_1 = -this.mouse.y/1.2 + 1.4
        let scale_2 = this.mouse.y/1.2 + 1.4
        // this.t_1.style.transform = "translate(" + this.mouse.x * 40 + 'px, ' + this.mouse.y * 40 + 'px) scaleY(' + scale_1 + ')'
        // this.t_2.style.transform = "translate(" + this.mouse.x * 40 + 'px, ' + this.mouse.y * 40 + 'px) scaleY(' + scale_2 + ')'
        // this.t_1.style.transform = 'scaleY(' + scale_1 + ')'
        // this.t_2.style.transform = 'scaleY(' + scale_2 + ')'
        this.t_1.style.transform = "translate(" + this.mouse.x * 40 + 'px, ' + ( - this.mouse.y * 40) + 'px) scaleY(' + scale_1 + ')'
        this.t_2.style.transform = "translate(" + this.mouse.x * 40 + 'px, ' + ( - this.mouse.y * 40) + 'px) scaleY(' + scale_2 + ')' 
      }
    },
    // handleOrientation(e){
    //   let scale_1 = (e.beta - 10)/16
    //   this.t_1.style.transform = "translate(" + e.gamma + 'px, ' + ( - e.beta - 20 ) + 'px) scaleY(' + scale_1 + ')'
    //   this.t_2.style.transform = "translate(" + e.gamma + 'px, ' + ( - e.beta - 20 ) + 'px) scaleY(' + scale_1 + ')' 
    // }

    countdown(){
      let exp = document.getElementById("expired");
      console.log(exp)
      var countDownDate = new Date("jul 30, 2020 00:00").getTime();
      var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);



        // If the count down is finished, write some text

        if (distance < 0) {
          clearInterval(x);
          exp.style.display = "block"

        } else {
          exp.style.display = "none"
          document.getElementById("countdown").innerHTML = "" + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        }
      }, 1000);
    }
  },
  beforeLeave: function(el) {
  },



  mounted() {

    EventBus.$emit("SCROLLENABLED", false)
    EventBus.$on("MOUSEMOVELOOP", this.mouseMove)
    EventBus.$on("ISTOUCH", this.isTouch.bind(this))
    // window.addEventListener("deviceorientation", this.handleOrientation, true);

    this.intro = document.querySelector('.intro-container')


    this.countdown()

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

    anime.timeline({loop:!1}).add({targets:".title_1 .letter",scale:[.2,1],scaleX:[1,.9],opacity:[0,1],rotate:["10deg","0deg"],easing:"easeOutCirc",duration:950,delay:(e,a)=>70*a,complete:function(e){anime.timeline({loop:!0}).add({delay:800}).add({targets:".title_1 .letter",scale:1,scaleX:[.9,1.2],easing:"easeInOutQuad",duration:2e3,delay:(e,a)=>70*a+70}).add({delay:800}).add({targets:".title_1 .letter",scaleX:[1.2,.9],easing:"easeInOutQuad",duration:2e3,delay:(e,a)=>70*a+70})}}),anime.timeline({loop:!1}).add({delay:900}).add({targets:".title_2 .letter",scale:[.2,1],opacity:[0,1],scaleX:[1.2,.9],rotate:["10deg","0deg"],easing:"easeOutCirc",duration:950,delay:(e,a)=>70*a,complete:function(e){anime.timeline({loop:!0}).add({delay:800}).add({targets:".title_2 .letter",scale:1,scaleX:[.9,1.2],easing:"easeInOutQuad",duration:2e3,delay:(e,a)=>70*a}).add({delay:800}).add({targets:".title_2 .letter",scaleX:[1.2,.9],easing:"easeInOutQuad",duration:2e3,delay:(e,a)=>70*a})}});
    anime.timeline({loop:!0}).add({delay:800}).add({targets:".letter_1 .letter",rotate:[-40,40],easing:"easeInOutQuad",duration:2150,delay:anime.stagger(300)}).add({delay:800}).add({targets:".letter_1 .letter",rotate:[40,-40],easing:"easeInOutQuad",duration:2150,delay:anime.stagger(300)});
    anime.timeline({loop:!1}).add({delay:400,complete:function(e){anime.timeline({loop:!0}).add({delay:400}).add({targets:".letter_2 .letter",rotate:[-40,40],easing:"easeInOutQuad",duration:2e3,delay:anime.stagger(150)}).add({delay:400}).add({targets:".letter_2 .letter",rotate:[40,-40],easing:"easeInOutQuad",duration:2e3,delay:anime.stagger(150)})}});
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
  width: 100%;
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
#footer{
  bottom: 0;
  left: 0;
  margin: 24px;
  font-size: inherit;
  width: calc(100% - 48px);
  text-transform: uppercase;
}
#info ul, #footer ul{
  padding: 0;
  margin: 0;
  list-style: none;
  justify-content: space-between;
  display: flex;
  text-align: center;
}


#intro-text-grid{
  padding: 24px;
  display: inline-block;
}
#intro-text-grid p{
  margin: 0;
  text-indent: 48px;
  /* float: left; */
}
#footer a{

  color: #313131;
  text-decoration: none;
}
.left{
  padding-right: 12px;
  border-right: 1px solid #585858;
  width: calc(50% - 15px);
  display: inline-block;   
  vertical-align: top;
}
.right{
  padding-left: 12px;
  width: calc(50% - 15px);
  display: inline-block;   
  vertical-align: top;
  float: right;
}
hr{

  border: none;
  display: block;
  width: calc(100% - 48px);
  margin: auto;
  border-top: 1px solid #585858;
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
.enter_svg{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: inline-block;
  margin: auto;
}
#svg1{
  animation: spin1 160s linear infinite;
}
#svg2{
  animation: spin2 130s linear infinite;
}
@keyframes spin1{
  from{transform: rotate(0deg)}
  to{transform:rotate(360deg)}
}
@keyframes spin2{
  from{transform: rotate(0deg)}
  to{transform:rotate(-360deg)}
}
#enter:hover .st5{
  stroke-width: 120;
}

@media screen and (max-width: 710px) and (orientation: portrait){
  .title{
    line-height: 80px;
    font-size: 16vw;
  }
  #enter{
    font-size: 20vw;
  }
  #info ul, #footer ul{
    display: inherit;
  }
  .left{
    border-right: none;
  }
  .right{
    padding-left: 0px;
  }
  .left, .right{
    display: block;
    width: inherit;
  }
  #intro-text-grid{
    padding: 24px 24px;
  }
  #intro-text-grid p{
    text-indent: 0px;
  }
}



#countdown{

    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
}
</style>
