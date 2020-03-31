<template>
  <v-app>
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
/* unvisited link */
.v-application a:link {
  color: #ffd740;
}

/* visited link */
.v-application a:visited {
  color: #ffab00;
}

/* mouse over link */
.v-application a:hover {
  color: #fb8c00;
}

/* selected link */
.v-application a:active {
  color: #e65100;
}
</style>
