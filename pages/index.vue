<template>
  <main>


    <div id="intro">
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
      <div id="enter">
        <nuxt-link to="exhibition">
          …Enter Exhibition…
        </nuxt-link>
      </div>

    </div>
  </main>
</template>

<script>
import EventBus from "~/utils/event-bus";

export default {
  name: 'index',

  components: {

  },
  data () {
    return {
      wheeled: null,
    }
  },
  methods: {
    init() {
    },

    onWheeled(e){
    },
  },
  mounted() {
    this.init();
    // EventBus.$on("WHEELED", this.onWheeled);
  },
}
</script>

<style scoped>

#intro{
  padding: 36px;
  font-family: 'font';
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(255,255,255,0.8);
  z-index: 2;
  overflow: scroll;
  height: 100%;
  font-size: 36px;
  text-indent: 52px;
  color: #585858;
}
#enter{
  text-align: center;
  margin: 46px 0; 
  font-weight: 100;
  font-size: 46px;
}
#enter a{
  color: #6d6dff;
  text-decoration: none;
}

</style>
