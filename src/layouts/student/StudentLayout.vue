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
  
<script setup>
    import NavMenu from '@/layouts/student/StudentNavMenu.vue'
    import { ref, onMounted, watchEffect } from 'vue'
    import { useI18n } from 'vue-i18n'

    const i18n = useI18n()
    
    onMounted(() => {
        if (localStorage.theme) {
            theme.value = localStorage.theme;
        }
        if (localStorage.language) {
            language.value = localStorage.language;
        }
    })    
    
    const theme = ref('light')
    const language = ref('ru')

    watchEffect(() => {
        localStorage.theme = theme.value
        localStorage.language = language.value
    })

    function switchTheme (newTheme) {
        theme.value = newTheme
        localStorage.theme = theme.value
    }

    function switchLanguage (newLanguage) {
        language.value = newLanguage
        localStorage.language = language.value
        if (language.value === 'ru') {
            i18n.locale.value = 'ru-RU'
        } else {
            i18n.locale.value = 'en-US'
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
    font-family: Montserrat;
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
  