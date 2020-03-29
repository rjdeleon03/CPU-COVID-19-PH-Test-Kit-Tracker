<template>
  <v-app>
    <!-- <meta property="og:site_name" content="Your Website Name Here" />
    <meta property="og:title" content="Yourtitle goes here, about 90 characters in length." />
    <meta
      property="og:description"
      content="description of URL that is about 300 characters in length."
    />
    <meta property="og:image" content />
    <meta property="og:url" content="http://192.168.254.138:8083/" />-->
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
    />
    <Navbar />
    <v-content id="main-container">
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
}
#main-container {
  background-color: #fafafa !important;
}
</style>
