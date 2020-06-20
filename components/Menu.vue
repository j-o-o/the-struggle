<template>
    <div class="dom">
        <section class="title">
            <ul>
                <li>
                    Current page: {{ current }}
                </li>
            </ul>
        </section>
        <section class="nav">
            <ul>
                <li>
                    <nuxt-link to="/">Index</nuxt-link>
                </li>
            </ul>
        </section>
        <section class="artist">
            {{ artist }}
        </section>
        

    </div>
</template>
<script>

import EventBus from "~/utils/event-bus";

export default {
    name: 'scene',
    asyncData ({ env }) {
        return { users: env.users }
    },
    data () {
        return {
            current: this.$nuxt.$route.params.id,
            artist: null
        }
    },


    mounted () {
        // EventBus.$on("RAYCASTERIMAGE", this.onImgHover);
    },

    watch: {
        "$route.params.id": function(_new, _old){
            this.current = _new
        }
    },
    methods: {
        onImgHover(e){
            if(e != false){
                console.log(e.object.uuid)
            }
        }

    }
};
</script>
<style lang="scss">
div.dom{
    position: fixed;
    top: 0;
    left: 50%;
    padding: 20px 30px;

    h1{
        font-size: 20px;
        margin-bottom: 40px;
    }

    ul{
        padding: 0;
        li{
            list-style: none;
            
            a{
                color: #000;
                text-decoration: none;
                opacity: 0.5;
                &.nuxt-link-exact-active{
                    opacity: 1;
                }

                &:hover{
                    opacity: 1;
                }
            }

            
        }
    }
}
</style>