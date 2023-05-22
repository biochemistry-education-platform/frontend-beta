<template>
    <div class="my-account-page">
        <div v-if="!isMobile" class="my-account__header">
            <h1 class="my-account__title">{{ $t('profileTitle') }}</h1>
            <button @click="logout()" class="logout-btn">{{ $t('logOut') }}</button>
        </div>
        <div v-if="isMenuShown" class="darker-bg" @click="emit('closeMenu')"></div>
        <div v-if="isMobile" class="mobile-header">
            <div class="logo-block">
                <img src="@/assets/icons/logo.png">
                <p class="logo-name">plateaumed</p>
            </div>
            <div class="mobile-profile-actions">
                <svg @click="logout()" class="logout-icon" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 96 960 960" width="16"><path d="M489 936v-60h291V276H489v-60h291q24 0 42 18t18 42v600q0 24-18 42t-42 18H489Zm-78-185-43-43 102-102H120v-60h348L366 444l43-43 176 176-174 174Z"/></svg>
                <svg @click="switchMenuDisplay" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 96 960 960" width="16"><path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>
            </div>
        </div>
        <hr v-if="!isMobile" class="my-account__hr">
        <div class="my-account__content">
            <div class="my-account__info">
                <img class="my-account__img" src="@/assets/icons/profile_img.png">
                <h2 class="my-account-name">{{ user.surname }} {{ user.name }} {{ user.patronymic }}</h2>
                <p class="my-account-role">{{ user.role == 'Teacher' ? $t('roleTeacher') : (user.role == 'Sno_student' ? $t('roleSSS') : $t('roleStudent')) }}</p>
                <p class="my-account-mail">{{ user.email }}</p>
                <button class="my-account-password-btn">{{ $t('changePassword') }}</button>
                <hr v-if="!isMobile" class="my-account-info-hr">
                <div class="my-account-channels">
                    <div class="my-account-channel">
                        <img src="@/assets/icons/mail-icon.png">
                        <p class="my-account-channel-filled">{{ user.email }}</p>
                    </div>
                    <div class="my-account-channel">
                        <img src="@/assets/icons/vk-icon.png">
                        <input class="my-account-channel-empty" type="text" placeholder="vk.com/id123456">
                    </div>
                    <div class="my-account-channel">
                        <img src="@/assets/icons/telegram-icon.png">
                        <input class="my-account-channel-empty" type="text" placeholder="t.me/Example">
                    </div>
                </div>
            </div>
            <div class="my-account__subscriptions">                    
                <div class="tags-subscriptions">
                    <h2 class="subscription-title">{{ $t('tagsSubscriptions') }}</h2>
                    <div class="tags-subscriptions-content">
                        <div v-for="tag, index in tags" :key="index" class="subscription-tag"><p>{{ tag }}</p><svg class="delete-tag-sub-btn" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 96 960 960" width="18"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></div>
                        <svg class="add-tag-subscription" xmlns="http://www.w3.org/2000/svg" height="27" viewBox="0 96 960 960" width="27"><path d="M453 776h60V610h167v-60H513V376h-60v174H280v60h173v166Zm27.266 200q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
                    </div>    
                </div>

                <div class="authors-subscriptions">
                    <h2 class="subscription-title">{{ $t('authorsSubscriptions') }}</h2>
                    <div class="authors-subscriptions-content">
                        <div v-for="author, index in authors" :key="index">
                            <div class="subscription-author">
                                <p v-if="!isMobile" class="subscription-author-number">{{ index + 1 }}</p>
                                <hr v-if="!isMobile" class="vertical-hr">
                                <div class="subscription-author-content">
                                    <img class="subscription-author-img" src="@/assets/icons/profile_img.png">
                                    <div class="subscription-author-info">
                                        <p class="subscription-author-name">{{ author.surname }} {{ author.name }} {{ author.patronymic }}</p>
                                        <p class="subscription-author-role">{{ author.role == 'Teacher' ? $t('roleTeacher') : (author.role == 'Sno_student' ? $t('roleSSS') : $t('roleStudent')) }}</p>
                                    </div>                  
                                </div>
                                <hr v-if="!isMobile" class="vertical-hr">
                                <div class="delete-subscription-author"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></div>
                            </div>
                            <hr v-if="!isMobile" class="authors-subscription-hr">
                        </div>
                        <div class="add-author-subscription">
                            <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36"><path d="M453 776h60V610h167v-60H513V376h-60v174H280v60h173v166Zm27.266 200q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
                        </div>  
                    </div>
                </div>
                
                <div v-if="user.role == 'Teacher'" class="my-account-sss">
                    <h2 class="my-account-sss-title">{{ $t('sssLeads') }}</h2>
                    <div class="my-account-sss-content">
                        <div v-for="sss_user, index in sss" :key="index">
                            <div class="my-account-sss-user">
                                <p class="my-account-sss-user-number">{{ index + 1 }}</p>
                                <hr v-if="!isMobile" class="vertical-hr">
                                <div class="my-account-sss-user-name">
                                    <img src="@/assets/icons/profile_img.png">
                                    <p>{{ sss_user.surname }} {{ sss_user.name }} {{ sss_user.patronymic }}</p>
                                </div>
                                <hr v-if="!isMobile" class="vertical-hr">
                                <p class="my-account-delete-sss-user"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></p>
                            </div>
                            <hr v-if="!isMobile" class="my-account-sss-hr">
                        </div>
                        <div class="my-account-sss-add-user">
                            <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36"><path d="M453 776h60V610h167v-60H513V376h-60v174H280v60h173v166Zm27.266 200q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
                        </div>  
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'Profile',
}
</script>

<script setup>
import axios from 'axios'
import store from '@/store'
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'

const router = useRouter()

const emit = defineEmits(['openMenu', 'closeMenu'])

const props = defineProps({
    isMenuShown: Boolean,
    isMobile: Boolean
})

let user = reactive({
    id: '',
    email: '',
    role: '',
    surname: '',
    name: '',
    patronymic: ''
})
let tags = ref(['белки', 'липиды', 'гормоны'])
let authors = ref([{
                surname: 'Иванов',
                name: 'Иван',
                patronymic: 'Иванович',
                role: 'Teacher'
            },
            {
                surname: 'Константинопольская',
                name: 'Анастасия',
                patronymic: 'Александровна',
                role: 'Teacher'
            },
            {
                surname: 'Фамилия',
                name: 'Имя',
                patronymic: 'Отчество',
                role: 'Student'
            }])
let sss = ref([{
                surname: 'Иванов',
                name: 'Иван',
                patronymic: 'Иванович',
            },
            {
                surname: 'Константинопольская',
                name: 'Анастасия',
                patronymic: 'Александровна',
            },
            {
                surname: 'Фамилия',
                name: 'Имя',
                patronymic: 'Отчество',
            }])

onMounted(async () => {
    await getMyInfo()
})

function logout() {
    // axios
    //     .post('/api/v1/token/logout/')
    //     .then(response => {
    //         axios.defaults.headers.common["Authorization"] = ""
    //         localStorage.removeItem('email')
    //         localStorage.removeItem('userid')
    //         localStorage.removeItem('token')
    //         this.$store.commit('removeToken')
    //         this.$router.push('/log-in')
    //     })
    //     .catch(error => {
    //             if (error.response) {
    //                 console.log(JSON.stringify(error.response.data))
    //             } else if (error.message) {
    //                 console.log(JSON.stringify(error.message))
    //             } else {
    //                 console.log(JSON.stringify(error))
    //             }
    //         })
    store.commit('changeUser')
    router.push({name: 'LogIn'})
}

function getMyInfo() {
    user.id = store.state.user.id
    user.email = store.state.user.email
    user.name = store.state.user.name
    user.surname = store.state.user.surname
    user.patronymic = store.state.user.patronymic
    user.role = store.state.user.role
    // axios
    //     .get('/api/v1/clients')
    //     .then(response => {
    //         for (const property in response.data) {
    //             if (response.data[property].email == store.state.user.email) {
    //                 store.state.user.surname = response.data[property].surname
    //                 store.state.user.name = response.data[property].name
    //                 store.state.user.patronymic = response.data[property].patronymic
    //                 store.state.user.role = response.data[property].role
    //             }
    //         }
    //     })
    //     .catch(error => {
    //         console.log(JSON.stringify(error))
    //     })
}

function switchMenuDisplay() {
    if (props.isMenuShown == false) {
        emit('openMenu', true)
    }
}
</script>

<style>
.my-account-page {
    width: 100%;
    height: 100vh;
    background: var(--background);
    padding: 0;
}

.my-account__header {
    padding-top: 20px;
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between
}

.my-account__title {
    font-size: 32px;
    color: var(--text-color);
    font-weight: 500;
}

.my-account__hr {
    background: var(--lines-color);
    height: 2px;
    width: 80%;
    margin: 20px auto;
}

.my-account__content {
    width: 80%;
    height: calc(100vh - 170px);
    margin: 40px auto;
    display: flex;
    flex-direction: row;
    padding: 0;
}

.my-account__info {
    width: 500px;
    height: 628px;
    background: var(--card-color);
    box-shadow: 0px 3.2375px 3.2375px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0;
}

.my-account__img{
    margin: 40px 0 20px 0;
}

.my-account-name {
    color: var(--text-color);
    font-size: 28px;
    font-weight: 500;
    margin: 0;
    letter-spacing: normal;
}

.my-account-role, .my-account-mail {
    font-size: 16px;
    color: var(--text-extra);
    margin: 0;
    letter-spacing: normal;
}

.my-account-password-btn {
    background: var(--pages-color);
    width: 400px;
    height: 40px;
    color: var(--card-color);
    font-size: 16px;
    line-height: 16px;
    padding: 12px 0;
    text-align: center;
    border: none;
    border-radius: 10px;
    margin: 24px 0 0 0;
}

.my-account-info-hr {
    background: var(--lines-color);
    height: 1px;
    width: 400px;
    margin: 20px auto;
}

.my-account-channels {
    display: flex;
    flex-direction: column;
    width: 400px;
    margin-bottom: 24px;
    margin-top: 0;
}

.my-account-channel {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    margin-bottom: 20px;
}

.my-account-channel img{
    margin-right: 20px;
}

.my-account-channel-filled {
    font-size: 20px;
    color: var(--text-color);
}

.my-account-channel-empty {
    width: 340px;
    border: none;
    border-bottom: 1px solid var(--lines-color);
    height: 26px;
    font-size: 18px;
    outline: none;
    color: var(--text-color);
    background: var(--card-color);
}

.my-account-channel-empty::placeholder {
    font-size: 18px;
    color: var(--lines-color)
}

.my-account__subscriptions {
    width: calc(100% - 500px - 40px);
    margin-left: 40px;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}

.my-account__subscriptions::-webkit-scrollbar {
  display: none;
}
 .my-account__subscriptions {
  scrollbar-width: none;
}

.subscription-title, .my-account-sss-title {
    font-size: 28px;
    color: var(--text-color);
    padding: 20px 0 0 40px;
}

.tags-subscriptions, .authors-subscriptions, .my-account-sss {
    width: 100%;
    background: var(--card-color);
    box-shadow: 0px 3.2375px 3.2375px rgba(0, 0, 0, 0.25);
    margin-bottom: 40px;
    margin-top: 0;
    border-radius: 0;
}

.tags-subscriptions-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 40px;
}

.subscription-tag {
    background: var(--tags-color);
    color: var(--tags-text);
    font-size: 18px;
    border-radius: 16px;
    padding: 6px 12px;
    margin-right: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.delete-tag-sub-btn {
    margin-left: 8px;
    fill: var(--tags-text);
}

.add-tag-subscription {
    fill: var(--pages-color);
}
.authors-subscriptions-content, .my-account-sss-content {
    width: calc(100% - 80px);
    margin: auto;
    padding-top: 20px;
}

.subscription-author, .my-account-sss-user {
    display: flex;
    flex-direction: row;
}

.subscription-author-number, .my-account-sss-user-number {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-color);
}

.vertical-hr {
    border: none;
    border-right: 1px solid var(--lines-color);
    height: 40px;
    width: 1px;
    margin: 0;
}

.subscription-author-content {
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
    padding: 0 34px 0 12px;
    align-items: center;
    font-size: 16px;
    color: var(--text-color);
}

.subscription-author-info {
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
    align-items: center;
}

.subscription-author-name {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.my-account-sss-user-name {
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: flex-start;
    padding: 0 34px 0 12px;
    align-items: center;
    font-size: 16px;
    color: var(--text-color);
}

.subscription-author-img, .my-account-sss-user-name img{
    width: 40px;
    height: 40px;
    margin-right: 12px;
}

.subscription-author-name {
    margin-right: auto;
}

.subscription-author-role {
    font-size: 12px;
    color: var(--text-extra);
}

.delete-subscription-author, .my-account-delete-sss-user {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.delete-subscription-author svg, .my-account-delete-sss-user svg{
    fill: var(--danger);
    width: 24px;
    height: auto;
}

.authors-subscription-hr, .my-account-sss-hr {
    width: 100%;
    height: 1px;
    background: var(--lines-color);
}

.add-author-subscription, .my-account-sss-add-user {
    text-align: center;
}

.add-author-subscription svg, .my-account-sss-add-user svg{
    fill: var(--pages-color);
    transform: translateY(-20%);
}

.logout-btn {
    background: var(--danger);
    border-radius: 10px;
    padding: 0px 16px;
    font-size: 16px;
    color: #FFFFFF;
    border: none;
    line-height: 40px;
    height: 40px;
}

@media (max-width: 420px) {
    .my-account-page {
        background: var(--phone-bg);
        height: auto;
        padding: 12px 20px;
    }

    .mobile-profile-actions {
        display: flex;
        flex-direction: row;
        width: 62px;
        justify-content: space-between;
    }

    .logout-icon {
        fill: var(--danger) !important;
    }

    .my-account__content {
        width: 100%;
        height: auto;
        margin: 0;
        display: flex;
        flex-direction: column;
        margin-top: 74px;
    }

    .my-account__info {
        width: 100%;
        height: 355px;
        box-shadow: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 20px;        
        padding: 20px;
    }

    .my-account__img {
        width: 100px;
        height: 100px;
        margin: 0;
        margin-top: -70px;
    }

    .my-account-name {
        font-size: 16px;
        margin: 16px 0;
        letter-spacing: -0.05em;
    }

    .my-account-role, .my-account-mail {
        font-size: 12px;
        margin: 0;
        letter-spacing: normal;
    }

    .my-account-role {
        margin-bottom: 8px;
    }

    .my-account-mail {
        margin-bottom: 12px;
    }

    .my-account-password-btn {
        width: 100%;
        height: 45px;
        font-size: 16px;
        border-radius: 20px;
        margin: 0 auto;
        line-height: 45px;
        padding: 0;
    }

    .my-account-channels {
        width: 100%;
        margin-bottom: 0;
        margin-top: 16px;
    }

    .my-account-channel {
        height: 24px;
    }

    .my-account-channel img {
        margin-right: 12px;
        height: auto;
        width: 24px;
    }

    .my-account-channel-filled {
        font-size: 12px;
    }

    .my-account-channel-empty {
        width: 100%;
        height: 24px;
        font-size: 12px;
    }

    .my-account-channel-empty::placeholder {
        font-size: 12px;
    }

    .my-account__subscriptions {
        width: 100%;
        margin-left: 0;
        height: auto;
    }

    .tags-subscriptions, .authors-subscriptions, .my-account-sss {
        width: 100%;
        padding: 16px 20px;
        margin-top: 16px;
        margin-bottom: 0;
        border-radius: 16px;
        box-shadow: none;
    }

    .subscription-title {
        font-size: 16px;
        padding: 0 0 16px 0;
    }

    .tags-subscriptions-content {
        padding: 0;
    }

    .subscription-tag {
        font-size: 13px;
        padding: 4px 6px;
        margin-right: 8px;
    }

    .delete-tag-sub-btn {
        margin-left: 4px;
        width: 16px;
        height: 16px;
    }

    .authors-subscriptions-content, .my-account-sss-content {
        width: 100%;
        margin: 0;
        padding-top: 0;
    }

    .subscription-author {
        margin-bottom: 12px;
    }

    .subscription-author-content {
        padding: 0;
        font-size: 12px;
    }

    .subscription-author-info {
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }

    .subscription-author-role {
        font-size: 10px;
    }

    .add-author-subscription svg, .my-account-sss-add-user svg {
        width: 27px;
        height: 27px;
        transform: none;
    }

    .delete-subscription-author, .my-account-delete-sss-user {
        width: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>