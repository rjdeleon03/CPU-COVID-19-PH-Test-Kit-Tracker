<template>
  <div id="new-entry" class="content-wrapper">
    <v-form ref="form">
      <v-container class="grey lighten-5">
        <v-row justify="center">
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <div class="title">
              <h2>Update Testing Centers</h2>
              <v-divider />
            </div>
          </v-col>
        </v-row>

        <v-row justify="center" no-gutters>
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <p align="justify">
              Please import the latest Testing Aggregate CSV file from the
              <a
                href="https://bit.ly/dohcovid19data"
                target="_"
              >DOH Data Drop</a>. Its filename is usually of the format
              <strong>DOH COVID Data Drop_ YYYYMMDD - 08 Testing Aggregates.csv</strong>.
            </p>
            <v-file-input
              v-model="source"
              label="Source File"
              required
              color="pink darken-4"
              prepend-icon="mdi-file-table-outline"
            ></v-file-input>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" xs="2">
            <v-btn class="default-button" @click="uploadFile" color="amber darken-3">
              <span class="button-text">Submit</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

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
import { auth, db } from "@/firebase/init";
import testingCentersUtils from "@/utils/testing-centers-utils";
import ProgressDialog from "@/components/dialog/ProgressDialog.vue";
import SuccessDialog from "@/components/dialog/SuccessDialog.vue";
import ErrorDialog from "@/components/dialog/ErrorDialog.vue";
export default {
  name: "UpdateTestingCenters",
  components: { ProgressDialog, SuccessDialog, ErrorDialog },
  data() {
    // console.log(this.$route.params.kit_id);
    return {
      // User
      user: {
        loggedIn: false,
        data: {}
      },

      // Submitting dialog
      isSubmitting: false,
      submittingMessage:
        "Uploading the CSV file and updating the data on testing centers...",

      // Success dialog
      isSuccess: false,
      successMessage: "Testing centers have been updated.",

      // Failure dialog
      isSubmittingError: false,
      submittingErrorMessage:
        "An error occurred while updating the testing center data. Please try again.",

      source: null
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
  },
  watch: {},
  methods: {
    uploadFile() {
      // console.log(this.source);
      this.isSubmitting = true;
      const complete = testingCenters => {
        console.log(testingCenters);
        this.updateTestingCentersInDB(testingCenters);
      };
      const error = () => {
        this.isSubmitting = false;
        this.isSubmittingError = true;
      };
      testingCentersUtils.get(this.$papa, this.source, complete, error);
    },
    updateTestingCentersInDB(testingCenters) {
      console.log(db);

      var batch = db.batch();
      var collection = db.collection("testingCenters");

      testingCenters.forEach(testingCenter => {
        // console.log(testingCenter);

        var ref = collection.doc(testingCenter.name);
        batch.set(ref, testingCenter);
      });

      batch
        .commit()
        .then(() => {
          this.isSubmitting = false;
          this.isSuccess = true;
        })
        .catch(() => {
          this.isSubmitting = false;
          this.isSubmittingError = true;
        });
    },
    redirectToHome() {
      this.$router.push("/");
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
