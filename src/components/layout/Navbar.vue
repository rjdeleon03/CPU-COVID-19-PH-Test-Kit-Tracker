<template>
  <nav id="navbar">
    <v-app-bar app color="pink darken-4" dark>
      <v-app-bar-nav-icon @click="isDrawerVisible = true"></v-app-bar-nav-icon>

      <v-toolbar-title>COVID-19 PH Testing Tracker</v-toolbar-title>
      <v-spacer></v-spacer>

      <SharingMenu />
    </v-app-bar>
    <v-navigation-drawer v-model="isDrawerVisible" :width="325" app temporary>
      <v-list>
        <v-list-item @click="redirectToHome">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="drawer-text">Home</v-list-item-title>
        </v-list-item>
        <v-list-item @click="login" v-if="!authenticated">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="drawer-text">Login with Google</v-list-item-title>
        </v-list-item>
        <v-list-item @click="pullDOHData" v-if="authenticated">
          <v-list-item-icon>
            <v-icon>mdi-chart-line</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="drawer-text">Pull Latest DOH Data</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout" v-if="authenticated">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="drawer-text">Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Display dialog on login success -->
    <SuccessDialogWithCallback
      :isSuccess="isLoggedIn"
      :successMessage="loggedInMessage"
      :callback="hideLoginAlert"
    />

    <!-- Display dialog on login error -->
    <ErrorDialog
      :isError="isLoginError"
      :errorMessage="loginErrorMessage"
      :callback="hideLoginError"
    />

    <!-- Display dialog on logout success -->
    <SuccessDialogWithCallback
      :isSuccess="isLoggedOut"
      :successMessage="loggedOutMessage"
      :callback="hideLogoutAlert"
    />

    <!-- Display dialog on logout error -->
    <ErrorDialog
      :isError="isLogoutError"
      :errorMessage="logoutErrorMessage"
      :callback="hideLogoutError"
    />

    <!-- Display dialog on new user login -->
    <GenericInfoDialog
      :isDisplayed="isNewUser"
      :title="newUserTitle"
      :message="newUserMessage"
      :callback="hideNewUserAlert"
    />

    <!-- Display dialog when updating statistics -->
    <ProgressDialog :isLoading="isUpdatingStats" :loadingMessage="updatingStatsMessage" />

    <!-- Display dialog on statistics update -->
    <SuccessDialogWithCallback
      :isSuccess="areStatsUpdated"
      :successMessage="statsUpdatedMessage"
      :callback="hideStatsUpdatedSuccess"
    />

    <!-- Display dialog on statistics update error -->
    <ErrorDialog
      :isError="areStatsUpdatedError"
      :errorMessage="statsUpdatedErrorMessage"
      :callback="hideStatsUpdatedError"
    />
  </nav>
</template>

<script>
import { firebase } from "@firebase/app";
import { auth, db } from "@/firebase/init";
import axios from "axios";

const SuccessDialogWithCallback = () =>
  import("@/components/dialog/SuccessDialogWithCallback.vue");
const ProgressDialog = () => import("@/components/dialog/ProgressDialog.vue");
const ErrorDialog = () => import("@/components/dialog/ErrorDialog.vue");
const GenericInfoDialog = () =>
  import("@/components/dialog/GenericInfoDialog.vue");
const SharingMenu = () => import("@/components/layout/SharingMenu.vue");

export default {
  name: "Navbar",
  components: {
    SuccessDialogWithCallback,
    ErrorDialog,
    ProgressDialog,
    GenericInfoDialog,
    SharingMenu
  },
  data() {
    return {
      isDrawerVisible: false,

      // User
      user: {
        loggedIn: false,
        data: {}
      },

      isLoggedIn: false,
      loggedInMessage:
        "You are now logged in. You can update test kits and overall statistics.",

      isUpdatingStats: false,
      updatingStatsMessage: "Fetching updated statistics...",

      areStatsUpdated: false,
      statsUpdatedMessage: "Statistics have been updated.",

      areStatsUpdatedError: false,
      statsUpdatedErrorMessage:
        "An error occurred while updating statistics. Please try again.",

      isLoginError: false,
      loginErrorMessage:
        "An error occurred while logging you in. Please contact Computer Professionals' Union or AGHAM for support.",

      isLoggedOut: false,
      loggedOutMessage: "You are now logged out.",

      isLogoutError: false,
      logoutErrorMessage:
        "An error occurred while logging you out. Please try again.",

      isNewUser: false,
      newUserTitle: "Verification Required",
      newUserMessage:
        "Your account needs to be verified by Computer Professionals' Union or AGHAM before you can successfully log in."
    };
  },
  methods: {
    redirectToHome() {
      this.isDrawerVisible = false;
      this.$router.push("/").catch(() => {
        this.isDrawerVisible = false;
      });
    },
    goToEditStats() {
      this.isDrawerVisible = false;
      this.$router.push("/stats/update").catch(() => {
        this.isDrawerVisible = false;
      });
    },
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      var _this = this;
      auth
        .signInWithPopup(provider)
        .then(userData => {
          // console.log(userData.additionalUserInfo.isNewUser);
          if (userData.additionalUserInfo.isNewUser) {
            this.performLogout(true);
            return;
          }

          // Show dialog that user is logged in
          _this.isLoggedIn = true;
          _this.isDrawerVisible = false;
        })
        .catch(error => {
          const errorCode = error.code;

          // Show dialog that user failed to log in
          if (errorCode === "auth/user-disabled") {
            _this.isNewUser = true;
          } else if (errorCode !== "auth/popup-closed-by-user") {
            _this.isLoginError = true;
          }
          _this.isDrawerVisible = false;
        });
    },
    logout() {
      this.performLogout(false);
    },
    performLogout(isNewUser) {
      var _this = this;
      auth
        .signOut()
        .then(() => {
          if (isNewUser) {
            //Show dialog that user is logged out
            _this.isNewUser = true;
          } else {
            _this.isLoggedOut = true;
          }
          _this.isDrawerVisible = false;
        })
        .catch(() => {
          // Show dialog that user failed to log out
          // console.log(error);
          _this.isLogoutError = true;
          _this.isDrawerVisible = false;
        });
    },
    hideLoginAlert() {
      this.isLoggedIn = false;
    },
    hideLoginError() {
      this.isLoginError = false;
    },
    hideLogoutAlert() {
      this.isLoggedOut = false;
    },
    hideLogoutError() {
      this.isLogoutError = false;
    },
    hideNewUserAlert() {
      this.isNewUser = false;
    },
    hideStatsUpdatedSuccess() {
      this.areStatsUpdated = false;
    },
    hideStatsUpdatedError() {
      this.areStatsUpdatedError = false;
    },
    async pullDOHData() {
      this.isUpdatingStats = true;

      const res = await axios.post("https://ncovph.com/graphql", {
        query: `{ 
                  cases {
                    countConfirmedCases,
                    countAdmitted,
                    countRecoveries,
                    countDeaths
                  },
                  testing {
                    countUniqueInd,
                    countPositiveInd
                  }
            }`
      });
      const data = res.data.data;
      this.isUpdatingStats = false;
      if (
        !data ||
        !data.cases ||
        !data.testing ||
        data.cases.countConfirmedCases === 0 ||
        data.cases.countDeaths === 0 ||
        data.cases.countRecoveries === 0 ||
        data.testing.countUniqueInd === 0 ||
        data.testing.countPositiveInd === 0
      ) {
        this.areStatsUpdatedError = true;
        return;
      }

      db.collection("stats-main")
        .doc("EXTERNAL_STATS_ID")
        .update({
          deaths: data.cases.countDeaths,
          totalCases: data.cases.countConfirmedCases,
          admitted: data.cases.countAdmitted,
          recovered: data.cases.countRecoveries,
          indivsTested: data.testing.countUniqueInd,
          indivsTestedPositive: data.testing.countPositiveInd,
          lastModified: new Date()
        });
      this.areStatsUpdated = true;
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
nav#navbar {
  background-color: #581845;
}
nav#navbar h3 {
  text-align: start;
}
nav#navbar .navbar-header {
  height: 230px;
  background-image: url("~@/assets/header_bg_400h.jpg");
  background-position: center center;
  background-size: cover;
  color: white;
  font-size: 1.4em;
}
nav#navbar img {
  height: 150px;
}
nav#navbar #sub {
  margin-top: -20px;
  font-size: 0.7em;
}
nav#navbar .drawer-text {
  text-align: left;
}
nav#navbar .drawer-text-right {
  text-align: left !important;
}
nav#navbar .drawer-text-right span {
  cursor: pointer !important;
}
</style>