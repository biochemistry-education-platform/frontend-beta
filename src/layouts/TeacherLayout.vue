<template>
    <div :class="theme === 'light' ? 'light-theme' : 'dark-theme'">
        <NavMenu @switchTheme="switchTheme" @switchLanguage="switchLanguage"/>
        <div id="wrapper">  
            <section>
                <router-view/>
            </section> 
        </div>
    </div>
    
</template>
  
<script>
    import axios from 'axios'
    import NavMenu from '@/layouts/TeacherNavMenu.vue'
  
    export default {
        name: 'App',
        beforeCreate() {
            this.$store.commit('initializeStore')
  
            const token = this.$store.state.token
  
            if (token) {
                axios.defaults.headers.common['Authorization'] = "Token " + token
            } else {
                axios.defaults.headers.common['Authorization'] = ""
            }
        },
        components: {
            NavMenu
        },
        data() {
            return {
                theme: 'light',
                language: 'ru'
            }
        },
        methods: {
            switchTheme(theme) {
                this.theme = theme
            },
            switchLanguage(language) {
                this.language = language
            }
        }
    }
</script>
  
<style lang="scss">
@import '@/../node_modules/bulma';
@font-face {
    font-family: "RalewayLight";
    font-weight: 200;
    src: url(@/assets/fonts/Raleway-ExtraLight.ttf) fomat("truetype");
}

#wrapper {
    width: calc(100% - 200px);
    margin-left: 200px;
    height: 100vh;
}

.light-theme {
    --background:#F5F5F5;
    --menu-background: #EBFFFD;
    --menu-accent: #66D9D3;
    --card-color: #FFFFFF;
    --pages-color: #66D9D3; 
    --tags-color: #CDFFFA;
    --tags-text: #34D9D3;
    --text-color:#45666D;
    --text-extra: #81A3AA;
    --lines-color: #E0E0E0;
}

.dark-theme {
    --background:#1C464F;
    --menu-background: #185461;
    --menu-accent: #66D9D3;
    --card-color: #34565D;
    --pages-color: #66D9D3; 
    --tags-color: #34D9D3;
    --tags-text: #45666D; 
    --text-color:#EBFFFD;
    --text-extra: #81A3AA;
    --lines-color: #81A3AA;
}
</style>
  