<template>
  <div id="navbar">
    <v-app-bar app color="pink darken-4" dark>
      <div class="d-flex align-center">
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />-->

        <h2>COVID-19 PH ATM</h2>
        <v-btn justify="right" v-if="!authenticated" dark class="mb-2" @click="login()" color="amber darken-4">Login</v-btn>
        <v-btn justify="right" v-else dark class="mb-2" @click="logout()" color="amber darken-4">Logout</v-btn>
      </div>

      <v-spacer></v-spacer>

      <!-- <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>-->
    </v-app-bar>
  </div>
</template>

<script>
import { auth } from "@/firebase/init";
import { firebase } from "@firebase/app";
export default {
  name: "Navbar",
  data() {
    return {
      // User
      user: {
        loggedIn: false,
        data: {}
      }
    }
  },
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth
        .signInWithPopup(provider)
        .then(function(result) {
          var userData = JSON.parse(result);
          console.log(userData);
        })
        .catch(function(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
          console.log(errorCode, errorMessage, email, credential);
        });
    },
    logout() {
      auth
        .signOut()
        .then(function() {})
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.user.loggedIn = true;
        this.user.data = user;
      } else {
        this.user.loggedIn = false;
        this.user.data = {};
      }
      });
  },
  computed: {
    authenticated() {
      return this.user.loggedIn;
    }
  }
};
</script>

<style>
div#navbar {
  background-color: #581845;
}
</style>