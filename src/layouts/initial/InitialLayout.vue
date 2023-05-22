<template>
    <div :class="theme === 'light' ? 'light-theme' : 'dark-theme'">
        <div id="initial-wrapper">
            <div class="content-block">
                <InitialMenu v-if="!isMobile" @switchTheme="switchTheme" @switchLanguage="switchLanguage"/>
                <router-view :isMobile="isMobile" @switchTheme="switchTheme" @switchLanguage="switchLanguage" />
            </div>      
        </div>
    </div>
</template>
  
<script setup>
    import InitialMenu from '@/layouts/initial/InitialMenu.vue'
    import { ref, onMounted, watchEffect } from 'vue'
    import { useI18n } from 'vue-i18n'

    const i18n = useI18n()
    
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

    async function getDevice() {
        if (screen.width > 420) {
            isMobile.value = false
        }
        else { isMobile.value = true }
    }

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
    font-family: "Raleway";
    font-weight: 200;
    src: url(@/assets/fonts/Raleway-ExtraLight.ttf) fomat("truetype");
}

#initial-wrapper {
    width: 100%;
    height: 100vh;
    background: var(--background);
    display: flex;
    justify-content: center;
    align-items: center;
}

.content-block {
    width: 1152px;
    height: 648px;
    background: var(--card-color);
    position: relative;
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
}

.initial-page {
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    min-width: 480px;
    height: 100%;
    background: var(--card-color);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: Montserrat;
}

.logo-name {
    font-family: "Raleway";
    color: var(--menu-accent);
    font-size: 24px;
    font-weight: 200;
    letter-spacing: 0.1em;
}

.initial-form {
    width: 400px;
}

.initial-title {
    font-size: 28px;
    color: var(--text-color);
    text-align: center;
    padding-bottom: 30px;
    font-weight: 500;
}

.initial-field {
    width: 400px;
    display: flex;
    flex-direction: column;
    padding-bottom: 16px;
}

.initial-field-label {
    color: var(--text-extra);
    font-size: 20px;
    padding-left: 2px;
}

.initial-input {
    width: 400px;
    border: none;
    border-bottom: 1px solid var(--lines-color);
    height: 26px;
    font-size: 18px;
    outline: none;
    color: var(--text-color);
    background: var(--card-color);
}

.initial-input::placeholder {
    font-size: 18px;
    color: var(--lines-color)
}

#student {
    margin: 8px 10px 24px 0;
}

.student-label {
    color: var(--text-extra);
    font-size: 14px;
}

.initial-btn {
    width: 400px;
    height: 60px;
    color: var(--card-color);
    background: var(--menu-accent);
    font-size: 24px;
    border: none;
    border-radius: 16px;    
    margin-bottom: 12px;
    text-align: center;
    line-height: 56px;
    transition: 0.3s;
    margin-top: 24px;
}

.initial-btn:hover{
    cursor: pointer;
    background: var(--menu-accent-darker);
}

.initial-link {
    font-size: 16px;
    color: var(--text-extra);
    text-align: center;
}

@media (max-width: 420px) {
    .initial-page {
        flex-direction: column;
        width: calc(100% - 40px);
        height: calc(100% - 24px);
        background: var(--phone-bg);
        justify-content: flex-start;
        min-width: auto;
        margin: 12px 20px;
    }

    .content-block {
        width: 100%;
        height: 100%;
        background: var(--phone-bg);
    }

    .initial-mobile-menu {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }

    .initial-mobile-menu .logo-block img{
        margin-top: 0;
    }

    .initial-form {
        background: var(--card-color);
        padding: 30px 20px;
        border-radius: 20px;
        width: 100%;
        margin: auto;
    }

    .initial-title {
        font-size: 24px;
    }

    .initial-field {
        width: 100%;
    }

    .initial-field-label {
        font-size: 16px;
    }

    .initial-input {
        width: 100%;
        height: 20px;
        font-size: 16px;
    }

    .initial-btn {
        width: 100%;
        height: 45px;
        font-size: 16px;
        border-radius: 20px;
        margin-bottom: 24px;
        line-height: 45px;
        margin-top: 16px;
    }

    .initial-link {
        font-size: 14px;
    }
}
</style>
  