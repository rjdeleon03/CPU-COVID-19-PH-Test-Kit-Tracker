<template>
  <div id="new-entry" class="content-wrapper">
    <v-form ref="form">
      <v-container class="grey lighten-5">
        <v-row justify="center">
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <div class="title">
              <h2>Edit Testing Center Details</h2>
              <v-divider />
            </div>
          </v-col>
        </v-row>

        <v-row justify="center" no-gutters>
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <v-text-field
              v-model="name"
              label="Name"
              required
              color="pink darken-4"
              :readonly="true"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center" no-gutters>
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <v-select
              label="Region"
              v-model="region"
              :rules="regionRules"
              :items="regions"
              required
              color="pink darken-4"
              item-color="amber darken-4"
            ></v-select>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" xs="2">
            <v-btn class="default-button" @click="addKit" color="amber darken-3">
              <span class="button-text">Submit</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <!-- Display dialog when loading -->
    <ProgressDialog :isLoading="isFetching" :loadingMessage="fetchingMessage" />

    <!-- Display dialog on fetch error -->
    <ErrorDialog
      :isError="isFetchingError"
      :errorMessage="fetchingErrorMessage"
      :callback="redirectToHome"
    />

    <!-- Display dialog when submitting -->
    <ProgressDialog :isLoading="isSubmitting" :loadingMessage="submittingMessage" />

    <!-- Display dialog on success -->
    <SuccessDialog :isSuccess="isSuccess" :successMessage="successMessage" />

    <!-- Display dialog on submission error -->
    <ErrorDialog
      :isError="isSubmittingError"
      :errorMessage="submittingErrorMessage"
      :callback="hideSubmittingError"
    />
  </div>
</template>

<script>
import { auth } from "@/firebase/init";
import { db } from "@/firebase/init";
import ProgressDialog from "@/components/dialog/ProgressDialog.vue";
import SuccessDialog from "@/components/dialog/SuccessDialog.vue";
import ErrorDialog from "@/components/dialog/ErrorDialog.vue";
export default {
  name: "NewEntry",
  components: { ProgressDialog, SuccessDialog, ErrorDialog },
  data() {
    return {
      // User
      user: {
        loggedIn: false,
        data: {}
      },

      // Loading dialog
      isFetching: false,
      fetchingMessage: "Fetching testing center details...",

      // Loading error dialog
      isFetchingError: false,
      fetchingErrorMessage:
        "An error occurred while fetching the testing center details.",

      // Submitting dialog
      isSubmitting: false,
      submittingMessage: "Saving the testing center details...",

      // Success dialog
      isSuccess: false,
      successMessage: "The testing center details has been saved.",

      // Failure dialog
      isSubmittingError: false,
      submittingErrorMessage:
        "An error occurred while saving the testing center details. Please try again.",

      testingCenterId: this.$route.params.testing_center_id,
      name: "",
      location: null,
      region: "",
      regionRules: [v => !!v || "Please select a region."],

      regions: ["Luzon", "Visayas", "Mindanao"]
    };
  },
  mounted() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.user.loggedIn = true;
        this.user.data = user;
      } else {
        // Redirect to login page
        this.$router.push("/").catch(() => {});
      }
    });

    if (!this.testingCenterId) return;
    this.isFetching = true;
    this.testingCenters()
      .doc(this.testingCenterId)
      .get()
      .then(doc => {
        // console.log(doc.data());
        const data = doc.data();

        this.isFetching = false;

        this.name = data.name;
        this.location = data.location;
        this.region = data.location.region;
      })
      .catch(() => {
        this.isFetching = false;
        this.isFetchingError = true;
      });
  },
  methods: {
    testingCenters() {
      return db.collection("testingCenters");
    },
    addKit() {
      if (!this.$refs.form.validate()) return;

      this.isSubmitting = true;
      var task = null;

      if (this.testingCenterId) {
        this.location.region = this.region;
        task = this.testingCenters()
          .doc(this.testingCenterId)
          .update({
            location: this.location
          });
      }
      task
        .then(() => {
          this.isSubmitting = false;
          this.isSuccess = true;
        })
        .catch(() => {
          this.isSubmitting = false;
          this.isSubmittingError = false;
        });
    },
    redirectToHome() {
      this.$router.push("/").catch(() => {});
    },
    hideSubmittingError() {
      this.isSubmittingError = false;
    }
  }
};
</script>

<style>
#new-entry {
  padding-bottom: 30px;
}
#new-entry table,
#new-entry th,
#new-entry td {
  border: 1px solid black;
  border-collapse: collapse;
  text-align: left;
  margin: 0 auto;
}

.content-wrapper .title {
  margin: 30px 0 20px 0;
}
.title h2 {
  margin-bottom: 20px;
  text-align: start;
  color: #880e4f;
}
.title h4 {
  margin-bottom: 4px;
  text-align: start;
  color: #880e4f;
  font-weight: 500;
}
.default-switch {
  margin-top: 0 !important;
}
.button-text {
  color: white;
  margin-left: 20px;
  margin-right: 20px;
}
.dialog-contents {
  padding-top: 40px;
}

.dialog-contents p {
  padding-top: 30px;
}
</style>
