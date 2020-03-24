<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Navbar from "./components/layout/Navbar.vue";
import "material-design-icons-iconfont/dist/material-design-icons.css";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
