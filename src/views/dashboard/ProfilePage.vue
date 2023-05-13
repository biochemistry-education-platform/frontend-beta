<template>
    <div class="my-account-page">
        <div class="my-account__header">
            <h1 class="my-account__title">{{ $t('profileTitle') }}</h1>
            <button @click="logout()" class="logout-btn">{{ $t('logOut') }}</button>
        </div>
        <hr class="my-account__hr">
        <div class="my-account__content">
            <div class="my-account__info">
                <img class="my-account__img" src="@/assets/icons/profile_img.png">
                <h2 class="my-account-name">{{ user.surname }} {{ user.name }} {{ user.patronymic }}</h2>
                <p class="my-account-role">{{ user.role == 'Teacher' ? $t('roleTeacher') : (user.role == 'Sno_student' ? $t('roleSSS') : $t('roleStudent')) }}</p>
                <p class="my-account-mail">{{ user.email }}</p>
                <button class="my-account-password-btn">{{ $t('changePassword') }}</button>
                <hr class="my-account-info-hr">
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
                                <p class="subscription-author-number">{{ index + 1 }}</p>
                                <hr class="vertical-hr">
                                <div class="subscription-author-content">
                                    <div class="subscription-author-name">
                                        <img src="@/assets/icons/profile_img.png">
                                        <p>{{ author.surname }} {{ author.name }} {{ author.patronymic }}</p>
                                    </div>
                                    
                                    <p class="subscription-author-role">{{ author.role == 'Teacher' ? $t('roleTeacher') : (author.role == 'Sno_student' ? $t('roleSSS') : $t('roleStudent')) }}</p>
                                </div>
                                <hr class="vertical-hr">
                                <div class="delete-subscription-author"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></div>
                            </div>
                            <hr class="authors-subscription-hr">
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
                                <hr class="vertical-hr">
                                <div class="my-account-sss-user-name">
                                    <img src="@/assets/icons/profile_img.png">
                                    <p>{{ sss_user.surname }} {{ sss_user.name }} {{ sss_user.patronymic }}</p>
                                </div>
                                <hr class="vertical-hr">
                                <p class="my-account-delete-sss-user"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></p>
                            </div>
                            <hr class="my-account-sss-hr">
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
import { ref, reactive, onMounted } from 'vue'

const router = useRouter()

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
</script>

<style>
.my-account-page {
    width: 100%;
    height: 100vh;
    background: var(--background);
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

.my-account-info-hr, .my-account__hr {
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
}

.my-account__info {
    width: 500px;
    height: 628px;
    background: var(--card-color);
    box-shadow: 0px 3.2375px 3.2375px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.my-account__img{
    margin: 40px 0 20px 0;
}

.my-account-name {
    color: var(--text-color);
    font-size: 28px;
    font-weight: 500;
}

.my-account-role, .my-account-mail {
    font-size: 16px;
    color: var(--text-extra);
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
}

.my-account-channels {
    display: flex;
    flex-direction: column;
    width: 400px;
    margin-bottom: 24px;
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

.subscription-author-name img, .my-account-sss-user-name img{
    width: 40px;
    height: 40px;
    margin-right: 12px;
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
</style>