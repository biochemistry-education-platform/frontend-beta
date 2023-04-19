<template>
  <router-view/>
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
@font-face {
  font-family: "RalewayLight";
  font-weight: 200;
  src: url(@/assets/fonts/Raleway-ExtraLight.ttf) fomat("truetype");
}
</style>
