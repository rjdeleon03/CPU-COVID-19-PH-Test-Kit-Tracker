<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to COVID-19 PH Test Kit Tracker</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <button v-if="!authenticated" @click="login">Login</button>
        <div v-if="authenticated">
          <button @click="logout">Logout</button>
          <h1>Hi {{ firstName }}!</h1>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { firebase } from "@firebase/app";
import { auth } from "@/firebase/init";
export default {
  name: "Login",
  data() {
    return {
      user: {
        loggedIn: false,
        data: {}
      }
    };
  },
  computed: {
    authenticated() {
      return this.user.loggedIn;
    },
    firstName() {
      if (this.user.data.displayName) {
        return this.user.data.displayName.split(" ")[0];
      }
      return null;
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
  mounted: function() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.user.loggedIn = true;
        this.user.data = user;
      } else {
        this.user.loggedIn = false;
        this.user.data = {};
      }
    });
  }
};
</script>