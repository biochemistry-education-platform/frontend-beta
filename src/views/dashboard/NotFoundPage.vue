<template>
    <div class="page-404">
        <div class="sign-404">
            <p>4</p>
            <div class="logo-404">
                <svg width="160" height="160" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="45" cy="45" r="41.25" stroke="#66D9D3" stroke-width="7.5"/>
                <path d="M12 22.5H49.5C49.5 22.5 57.375 23.625 57.375 31.875C57.375 40.125 49.5 40.5 49.5 40.5H42.375C42.3592 48.1005 40.1076 50.1496 33 50.625L6 49.875" stroke="#66D9D3" stroke-width="7.5"/>
                <path d="M68.625 78.75H54C54 78.75 46.5 79.875 46.5 71.625C46.5 63.375 54.75 63 54.75 63C54.75 57 58.5 53.25 63.375 53.25H85.875" stroke="#66D9D3" stroke-width="7.5"/>
                </svg>
            </div>
            <p>4</p>
        </div>
        <p class="text-404">{{ $t('page404') }}<router-link :to="{ name: 'Articles'}">{{ $t('onFeed') }}</router-link></p>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
}
</script>

<style>
@font-face {
    font-family: "Raleway";
    font-weight: 200;
    src: url(@/assets/fonts/Raleway-ExtraLight.ttf) fomat("truetype");
}

.page-404 {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #EBFFFD;
}

.sign-404 {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.sign-404 p{
    font-size: 200px;
    line-height: 200px;
    margin-top: -50px;
    color: #66D9D3;
    font-family: Raleway;
    font-weight: bold;
}

.sign-404 p:first-child{
    margin-right: 20px;
}

.sign-404 p:last-child{
    margin-left: 20px;
}

.text-404 {
    margin-top: 40px;
    font-family: Raleway;
    font-size: 20px;
    color: #45666D;
    font-weight: 500;
}

.text-404 a {
    font-family: Raleway;
    font-size: 20px;
    color: #45666D;
    text-decoration: underline;
    font-weight: 500;
}
</style>