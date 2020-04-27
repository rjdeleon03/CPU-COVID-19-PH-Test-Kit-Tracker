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
const Navbar = () => import("./components/layout/Navbar.vue");
const Footer = () => import("./components/layout/Footer.vue");

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
