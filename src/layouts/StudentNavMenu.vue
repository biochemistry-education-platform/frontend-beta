<template>
    <div class="side-menu">
        <div class="logo-block">
            <img src="@/assets/icons/logo.png">
            <p class="logo-name">plateaumed</p>
        </div>
        <div class="menu-items">
            <router-link :to="{name: 'Profile'}" class="menu-item profile-block" :class="current_item == 'Profile' ? 'active' : ''">
                <svg class="profile-icon menu-svg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 575q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160 896v-94q0-38 19-65t49-41q67-30 128.5-45T480 636q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800 764 800 802v94H160Zm60-60h520v-34q0-16-9.5-30.5T707 750q-64-31-117-42.5T480 696q-57 0-111 11.5T252 750q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570 425q0-39-25.5-64.5T480 335q-39 0-64.5 25.5T390 425q0 39 25.5 64.5T480 515Zm0-90Zm0 411Z"/></svg>
                <div class="item-text profile-item-text">{{ $t('profile') }}</div>
            </router-link>
            <router-link :to="{name: 'Articles'}" class="menu-item feed-block" :class="current_item == 'Articles' ? 'active' : ''">
                <svg class="feed-icon menu-svg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M140 936q-24.75 0-42.375-17.625T80 876V216l67 67 66-67 67 67 67-67 66 67 67-67 67 67 66-67 67 67 67-67 66 67 67-67v660q0 24.75-17.625 42.375T820 936H140Zm0-60h310V596H140v280Zm370 0h310V766H510v110Zm0-170h310V596H510v110ZM140 536h680V416H140v120Z"/></svg>
                <div class="item-text feed-item-text">{{ $t('feed') }}</div>
            </router-link>
            <router-link :to="{name: 'Notes'}" class="menu-item my-notes-block" :class="current_item == 'Notes' ? 'active' : ''">
                <svg class="my-article-icon menu-svg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M277 777h275v-60H277v60Zm0-171h406v-60H277v60Zm0-171h406v-60H277v60Zm-97 501q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z"/></svg>
                <div class="item-text my-article-item-text">{{ $t('myNotes') }}</div>
            </router-link>
            <div class="menu-item check-articles-block">
                <svg class="check-articles-icon menu-svg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M517 525 353 361l43-43 121 122 234-233 42 41-276 277Zm49 469-311-89v57H40V568h309l255 96q27 10 45.5 32.5T668 761h114q42 0 70 30t28 81v26l-314 96Zm-466-92h94V628h-94v274Zm462 30 256-78q-6-19-15-26t-21-7H575q-30 0-55.5-4T471 806l-81-25 22-58 73 24q25 8 47.5 11t71.5 3q0-12-4.5-23.5T584 721l-245-93h-84v214l307 90ZM194 765Zm410-4Zm-410 4Zm61 0Z"/></svg>
                <p class="item-text check-articles-item-text">{{ $t('myArticles') }}</p>
            </div>
            <div class="menu-item create-article-block">
                <svg class="create-article-icon menu-svg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M453 776h60V610h167v-60H513V376h-60v174H280v60h173v166Zm27.266 200q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
                <!-- <router-link :to="{name: 'StudentAddArticle'}" class="item-text create-article-item-text">{{ $t('createArticle') }}</router-link> -->
                <p class="item-text create-article-item-text">{{ $t('createArticle') }}</p>
            </div>
            <div class="menu-item favorite-block">
                <svg class="favorite-icon menu-svg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m323 851 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z"/></svg>
                <p class="item-text favorite-item-text">{{ $t('favorites') }}</p>
            </div>
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
.side-menu {
    width: 200px;
    height: 100vh;
    background: var(--menu-background);
    position: absolute;
    left: 0;
    top: 0;
}

.logo-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.logo-block img {
    margin-top: 20px;
    margin-bottom: 5px;
}

.logo-name {
    font-family: "RalewayLight";
    color: var(--menu-accent);
    font-size: 24px;
    font-weight: 200;
    letter-spacing: 0.1em;
}

.menu-svg, .menu-switches-svg {
    fill: var(--text-color);
    width: 27px;
    height: auto;
}

.menu-switches-svg:hover {
    fill: var(--text-extra);
    cursor: pointer;
}

.menu-items {
    display: flex;
    flex-direction: column;
    margin-top: calc((100vh - 149px - (97px * 6)) / 7);
    align-items: center;
    text-align: center;
}

.menu-item{
    margin-bottom: calc((100vh - 149px - (97px * 6)) / 7);
    width: calc(100% - 32px);
    padding-top: 20px;
    padding-bottom: 20px;
    color: var(--text-color);
}

.menu-item.active {
    background: var(--menu-accent);
    border-radius: 20px;
    color: var(--card-color);
}

.menu-item.active .item-text:visited, .item-text:link {
    color: var(--card-color);
}

.menu-item.active svg{
    fill: var(--card-color);
    width: 27px;
    height: auto;
}

.item-text {
    font-size: 16px;
    display: block;
}

.item-text:visited, .item-text:link {
    color: var(--text-color);
}

.menu-switches {
    width: calc(100% - 40px);
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.language-block {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.language-block:hover {
    cursor: pointer;    
}

.language-block:hover svg{
    fill: var(--text-extra);
}

.language-block:hover .language-name{
    color: var(--text-extra);
}

.language-name{
    padding-left: 5px;
    font-size: 16px;
    color: var(--text-color);
}

.themes-block {
    position: relative;
}

.theme-checkbox {
    position: absolute;
    width: 50px;
    height: 50px;
    right: -10px;
    bottom: -10px;
    opacity: 0;
    z-index: -1;
    /* z-index обязательно изменить на большое значение */
}
</style>
