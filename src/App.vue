<template>
  <router-view />
</template>

<script>
  import axios from 'axios'
  import { useStore } from 'vuex'

  export default {
    name: 'App',
    setup() {
      const store = useStore()
      store.commit('initializeStore')

      const token = store.state.token

      if (token) {
          axios.defaults.headers.common['Authorization'] = "Token " + token
      } else {
          axios.defaults.headers.common['Authorization'] = ""
      }
    }
  }
</script>

<style lang="scss">
@import '../node_modules/bulma';
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,400;0,500;0,700;1,200;1,400;1,700&family=Raleway:wght@200&display=swap');
@font-face {
  font-family: "RalewayLight";
  font-weight: 200;
  src: url(@/assets/fonts/Raleway-ExtraLight.ttf) fomat("truetype");
}
</style>
