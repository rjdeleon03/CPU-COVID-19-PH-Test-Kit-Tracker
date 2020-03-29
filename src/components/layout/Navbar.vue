<template>
  <div id="navbar">
    <v-app-bar app color="pink darken-4" dark>
      <v-app-bar-nav-icon @click="isDrawerVisible = true"></v-app-bar-nav-icon>
      <!-- <div class="d-flex align-center"> -->
      <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
      />-->

      <v-toolbar-title>COVID-19 PH ATM Tracker</v-toolbar-title>
      <!-- </div> -->
      <v-spacer></v-spacer>

      <!-- <v-btn icon @click="goToEditStats">
        <v-icon>mdi-chart-line</v-icon>
      </v-btn>

      <v-btn icon @click="login">
        <v-icon>mdi-login</v-icon>
      </v-btn>-->

      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="isDrawerVisible" absolute temporary :width="325">
      <div class="navbar-header">
        <img src="@/assets/cpu.png" />
        <p>COVID-19 PH ATM Tracker</p>
        <p id="sub">by Computer Professionals' Union</p>
      </div>
      <v-list nav>
        <v-list-item-group active-class="pink--text darken-4 text--accent-4">
          <v-list-item @click="redirectToHome">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="drawer-text">Home</v-list-item-title>
          </v-list-item>
          <v-list-item @click="login">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="drawer-text">Login with Google</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="drawer-text">Logout</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goToEditStats">
            <v-list-item-icon>
              <v-icon>mdi-chart-line</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="drawer-text">Update Statistics</v-list-item-title>
          </v-list-item>
          <v-list-item href="http://covid19phstatus.cp-union.com" target="_blank">
            <v-list-item-icon>
              <v-icon>mdi-map-marker</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="drawer-text">#COVID19PHReport</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { firebase } from "@firebase/app";
import { auth } from "@/firebase/init";
export default {
  name: "Navbar",
  data() {
    return {
      isDrawerVisible: false
    };
  },
  methods: {
    redirectToHome() {
      this.$router.push("/").catch(() => {
        this.isDrawerVisible = false;
      });
    },
    goToEditStats() {
      this.$router.push("/stats/update").catch(() => {
        this.isDrawerVisible = false;
      });
    },
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth
        .signInWithPopup(provider)
        .then(function(result) {
          var userData = JSON.parse(result);
          console.log(userData);

          // TODO: Show dialog that user is logged in
        })
        .catch(function(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
          console.log(errorCode, errorMessage, email, credential);
          // TODO: Show dialog that user failed to log in
        });
    },
    logout() {
      auth
        .signOut()
        .then(function() {
          // TODO: Show dialog that user is logged out
        })
        .catch(function(error) {
          // TODO: Show dialog that user failed to log in
          console.log(error);
        });
    }
  }
};
</script>

<style>
div#navbar {
  background-color: #581845;
}
div#navbar h3 {
  text-align: start;
}
div#navbar .navbar-header {
  height: 230px;
  background-image: url("~@/assets/header_bg_400h.png");
  background-position: center center;
  background-size: cover;
  color: white;
  font-size: 1.4em;
}
div#navbar img {
  height: 150px;
}
div#navbar #sub {
  margin-top: -20px;
  font-size: 0.7em;
}
div#navbar .drawer-text {
  text-align: left;
}
</style>