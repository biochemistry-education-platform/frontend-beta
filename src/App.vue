<template>
  <div id="wrapper">  
    <section>
        <router-view/>
    </section> 
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'App',
    beforeCreate() {
      this.$store.commit('initializeStore')

      const token = this.$store.state.token

      if (token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
      } else {
        axios.defaults.headers.common['Authorization'] = ""
      }
    },
    data() {
      return {
        themeLight: true
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
