<template>
    <div :class="theme === 'light' ? 'light-theme' : 'dark-theme'" class="theme">
        <StudentNavMenu v-if="user && user.role == 'Student'" :isMobile="isMobile" @closeMenu="closeMenu" @switchTheme="switchTheme" @switchLanguage="switchLanguage"/>
        <SSSNavMenu v-else-if="user && user.role == 'Sno_student'" :isMobile="isMobile" @closeMenu="closeMenu" @switchTheme="switchTheme" @switchLanguage="switchLanguage"/>
        <TeacherNavMenu v-else-if="user && user.role == 'Teacher'" :isMobile="isMobile" @closeMenu="closeMenu" @switchTheme="switchTheme" @switchLanguage="switchLanguage"/>
        <UnauthMenu v-else :isMobile="isMobile" @closeMenu="closeMenu" @switchTheme="switchTheme" @switchLanguage="switchLanguage"/>
        <div id="wrapper" :isMenuShown="isMenuShown" >  
            <section>
                <router-view @openMenu="openMenu" @closeMenu="closeMenu" :isMobile="isMobile" :isMenuShown="isMenuShown" />
            </section> 
        </div>
    </div>    
</template>
  
<script setup>
    import TeacherNavMenu from './TeacherNavMenu.vue'
    import StudentNavMenu from './StudentNavMenu.vue'
    import SSSNavMenu from './SSSNavMenu.vue'
    import UnauthMenu from './UnauthMenu.vue'
    import { ref, onMounted, watchEffect } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { useUserStore } from '@/stores/user'
    // import store from '@/stores/user'

    const i18n = useI18n()
    const userStore = useUserStore()

    let user = JSON.parse(userStore.$state.user)
    
    onMounted(async () => {
        await getDevice()
        if (localStorage.theme) {
            theme.value = localStorage.theme;
        }
        if (localStorage.language) {
            language.value = localStorage.language;
        }
    })    
    
    const theme = ref('light')
    const language = ref('ru')
    let isMobile = ref(false)
    let isMenuShown = ref(false)

    // watchEffect(() => {
    //     localStorage.theme = theme.value
    //     localStorage.language = language.value
    // })

    async function getDevice() {
        if (screen.width > 420) {
            isMobile.value = false
        }
        else { isMobile.value = true }
    }

    function switchTheme (newTheme) {
        theme.value = newTheme
        localStorage.setItem('theme', theme.value)
    }

    function switchLanguage (newLanguage) {
        language.value = newLanguage
        localStorage.setItem('language', language.value)
        if (language.value === 'ru') {
            i18n.locale.value = 'ru-RU'
        } else {
            i18n.locale.value = 'en-US'
        }
    }

    function closeMenu() {
        isMenuShown.value = false
        document.getElementsByClassName('side-menu')[0].style.display = 'none'
    }

    function openMenu() {
        isMenuShown.value = true
        document.getElementsByClassName('side-menu')[0].style.display = 'flex'
    }


</script>
  
<style lang="scss">
@import '@/../node_modules/bulma';
@import '@/assets/css/articlesAndNotes.css';
@import '@/assets/css/menu.css';

@font-face {
    font-family: "Raleway";
    font-weight: 200;
    src: url(@/assets/fonts/Raleway-ExtraLight.ttf) fomat("truetype");
}

::-webkit-scrollbar {
    width: 0;
}

#wrapper {
    width: calc(100% - 200px);
    padding: 0;
    margin-left: 200px;
    height: 100vh;
    font-family: Montserrat;
}

.light-theme {
    --phone-bg: #EBFFFD;
    --background:#F5F5F5;
    --menu-background: #EBFFFD;
    --menu-accent: #66D9D3;
    --menu-accent-darker: #44afaa;
    --card-color: #FFFFFF;
    --pages-color: #66D9D3; 
    --tags-color: #CDFFFA;
    --tags-text: #34D9D3;
    --text-color:#45666D;
    --text-extra: #81A3AA;
    --lines-color: #E0E0E0;
    --danger: #F65151;
}

.dark-theme {
    --phone-bg: #1C464F;
    --background:#1C464F;
    --menu-background: #185461;
    --menu-accent: #66D9D3;
    --menu-accent-darker: #44afaa;
    --card-color: #185461;
    --pages-color: #66D9D3; 
    --tags-color: #34D9D3;
    --tags-text: #45666D; 
    --text-color:#EBFFFD;
    --text-extra: #81A3AA;
    --lines-color: #81A3AA;
    --danger: #F65151;
}

@media (max-width: 420px) {
    #wrapper {
        width: 100%;
        margin-left: 0;
    }
}
</style>
  