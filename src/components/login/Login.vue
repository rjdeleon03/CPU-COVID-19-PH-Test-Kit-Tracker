<template>
  <v-container>
    <v-row class="text-center">
        <v-col class="mb-4">
            <h1 class="display-2 font-weight-bold mb-3">
            Welcome to COVID-19 PH Test Kit Tracker
            </h1>
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
import { authentication } from "@/firebase/init";
export default {
    name: "Login",
    data() {
        return {
            user: {
                loggedIn: false,
                data: {}
            }
        }  
    },
    computed: {
        authenticated() {
            return this.user.loggedIn
        },
        firstName() {
            if (this.user.data.displayName) {
                return this.user.data.displayName.split(' ')[0]
            }
            return null
        }
    },
    methods: {
        login() {
            authentication.login();
        },
        logout() {
            authentication.logout()
        }
    },
    mounted: function() {
        authentication.auth.onAuthStateChanged( user => {
            if (user) {
                this.user.loggedIn = true;
                this.user.data = user;
            }
            else {
                this.user.loggedIn = false;
                this.user.data = {};
            }
        })
    }
};
</script>