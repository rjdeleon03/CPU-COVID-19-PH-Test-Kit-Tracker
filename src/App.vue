<template>
  <v-app>
    <Navbar />
    <v-content>
      <router-view />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Navbar from "./components/layout/Navbar.vue";
import Footer from "./components/layout/Footer.vue";

export default {
  name: "App",
  components: {
    // HelloWorld
    Navbar,
    Footer
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Heebo&display=swap");
#app {
  font-family: "Heebo", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
