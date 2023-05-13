<template>
    <div class="side-menu">
        <div class="logo-block">
            <img src="@/assets/icons/logo.png">
            <p class="logo-name">plateaumed</p>
        </div>
        <div class="unauth-menu-items">
            <router-link :to="{name: 'Articles'}" class="unauth-menu-item feed-block" :class="current_item == 'Articles' ? 'active' : ''">
                <svg class="feed-icon menu-svg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M140 936q-24.75 0-42.375-17.625T80 876V216l67 67 66-67 67 67 67-67 66 67 67-67 67 67 66-67 67 67 67-67 66 67 67-67v660q0 24.75-17.625 42.375T820 936H140Zm0-60h310V596H140v280Zm370 0h310V766H510v110Zm0-170h310V596H510v110ZM140 536h680V416H140v120Z"/></svg>
                <div class="item-text feed-item-text">{{ $t('feed') }}</div>
            </router-link>
            <router-link :to="{name: 'SignUp'}" class="unauth-menu-item signup-block">
                <svg class="login-icon menu-svg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M140 896q-24 0-42-18t-18-42V667h60v169h680V316H140v171H80V316q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm319-143-43-43 103-103H80v-60h439L416 444l43-43 176 176-176 176Z"/></svg>
                <div class="item-text profile-item-text">{{ $t('toSignUp') }}</div>
            </router-link>
            <router-link :to="{name: 'LogIn'}" class="unauth-menu-item login-block">
                <svg class="signup-icon menu-svg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M489 936v-60h291V276H489v-60h291q24 0 42 18t18 42v600q0 24-18 42t-42 18H489Zm-78-185-43-43 102-102H120v-60h348L366 444l43-43 176 176-174 174Z"/></svg>
                <div class="item-text feed-item-text">{{ $t('toLogIn') }}</div>
            </router-link>
        </div>
        <div class="menu-switches">
            <div class="language-block" @click="switchLanguage">
                <svg class="menu-switches-svg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 976q-84 0-157-31.5T196 859q-54-54-85-127.5T80 574q0-84 31-156.5T196 291q54-54 127-84.5T480 176q84 0 157 30.5T764 291q54 54 85 126.5T880 574q0 84-31 157.5T764 859q-54 54-127 85.5T480 976Zm0-58q35-36 58.5-82.5T577 725H384q14 60 37.5 108t58.5 85Zm-85-12q-25-38-43-82t-30-99H172q38 71 88 111.5T395 906Zm171-1q72-23 129.5-69T788 725H639q-13 54-30.5 98T566 905ZM152 665h159q-3-27-3.5-48.5T307 574q0-25 1-44.5t4-43.5H152q-7 24-9.5 43t-2.5 45q0 26 2.5 46.5T152 665Zm221 0h215q4-31 5-50.5t1-40.5q0-20-1-38.5t-5-49.5H373q-4 31-5 49.5t-1 38.5q0 21 1 40.5t5 50.5Zm275 0h160q7-24 9.5-44.5T820 574q0-26-2.5-45t-9.5-43H649q3 35 4 53.5t1 34.5q0 22-1.5 41.5T648 665Zm-10-239h150q-33-69-90.5-115T565 246q25 37 42.5 80T638 426Zm-254 0h194q-11-53-37-102.5T480 236q-32 27-54 71t-42 119Zm-212 0h151q11-54 28-96.5t43-82.5q-75 19-131 64t-91 115Z"/></svg>
                <p v-if="language === 'ru'" class="language-name">RU</p>
                <p v-else class="language-name">EN</p>
            </div>
            <div class="themes-block">
                <input type="checkbox" class="theme-checkbox" :checked="!themeLight">
                <div v-if="theme === 'light'" @click="switchTheme">
                    <svg class="menu-switches-svg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M479.765 716Q538 716 579 675.235q41-40.764 41-99Q620 518 579.235 477q-40.764-41-99-41Q422 436 381 476.765q-41 40.764-41 99Q340 634 380.765 675q40.764 41 99 41Zm.235 60q-83 0-141.5-58.5T280 576q0-83 58.5-141.5T480 376q83 0 141.5 58.5T680 576q0 83-58.5 141.5T480 776ZM70 606q-12.75 0-21.375-8.675Q40 588.649 40 575.825 40 563 48.625 554.5T70 546h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T170 606H70Zm720 0q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T790 546h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890 606H790ZM479.825 296Q467 296 458.5 287.375T450 266V166q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510 166v100q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Zm0 720q-12.825 0-21.325-8.62-8.5-8.63-8.5-21.38V886q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510 886v100q0 12.75-8.675 21.38-8.676 8.62-21.5 8.62ZM240 378l-57-56q-9-9-8.629-21.603.37-12.604 8.526-21.5 8.896-8.897 21.5-8.897Q217 270 226 279l56 57q8 9 8 21t-8 20.5q-8 8.5-20.5 8.5t-21.5-8Zm494 495-56-57q-8-9-8-21.375T678.5 774q8.5-9 20.5-9t21 9l57 56q9 9 8.629 21.603-.37 12.604-8.526 21.5-8.896 8.897-21.5 8.897Q743 882 734 873Zm-56-495q-9-9-9-21t9-21l56-57q9-9 21.603-8.629 12.604.37 21.5 8.526 8.897 8.896 8.897 21.5Q786 313 777 322l-57 56q-8 8-20.364 8-12.363 0-21.636-8ZM182.897 873.103q-8.897-8.896-8.897-21.5Q174 839 183 830l57-56q8.8-9 20.9-9 12.1 0 20.709 9Q291 783 291 795t-9 21l-56 57q-9 9-21.603 8.629-12.604-.37-21.5-8.526ZM480 576Z"/></svg>
                </div>
                <div v-else @click="switchTheme">
                    <svg class="menu-switches-svg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 936q-150 0-255-105T120 576q0-150 105-255t255-105q8 0 17 .5t23 1.5q-36 32-56 79t-20 99q0 90 63 153t153 63q52 0 99-18.5t79-51.5q1 12 1.5 19.5t.5 14.5q0 150-105 255T480 936Zm0-60q109 0 190-67.5T771 650q-25 11-53.667 16.5Q688.667 672 660 672q-114.689 0-195.345-80.655Q384 510.689 384 396q0-24 5-51.5t18-62.5q-98 27-162.5 109.5T180 576q0 125 87.5 212.5T480 876Zm-4-297Z"/></svg>
                </div>
            </div>
        </div>   
    </div>
</template>

<script setup>
import { defineEmits, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const theme = ref('light')
const language = ref('ru')
let current_item = ref('Articles')

const emit = defineEmits(['switchTheme', 'switchLanguage'])

function switchTheme () {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    emit('switchTheme', theme.value)
}

function switchLanguage () {
    language.value = language.value === 'ru' ? 'en' : 'ru'
    emit('switchLanguage', language.value)
}

watch(() => route.name, () => {
    current_item.value = route.name
})
</script>

<style>


.unauth-menu-items {
    display: flex;
    flex-direction: column;
    margin-top: calc((100vh - 149px - (97px * 3)) / 4);
    align-items: center;
    text-align: center;
}

.unauth-menu-item{
    margin-bottom: calc((100vh - 149px - (97px * 3)) / 4);
    width: calc(100% - 32px);
    padding-top: 20px;
    padding-bottom: 20px;
    color: var(--text-color);
}
</style>
