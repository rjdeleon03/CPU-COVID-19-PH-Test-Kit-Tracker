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
                href="https://bit.ly/DataDropPH"
                target="_"
              >DOH Data Drop</a>. Its filename should be of the format
              <strong>DOH COVID Data Drop_ YYYYMMDD - 07 Testing Aggregates.csv</strong>.
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

    <v-container>
      <v-row justify="center">
        <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-container>

    <v-form ref="form-2">
      <v-container class="grey lighten-5">
        <v-row justify="center">
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <div class="title">
              <h2>Update Testing Rankings</h2>
              <v-divider />
            </div>
          </v-col>
        </v-row>

        <v-row justify="center" no-gutters>
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <p align="justify">
              Please import the latest COVID-19 worldwide data from
              <a
                href="https://ourworldindata.org/coronavirus-data"
                target="_"
              >Our World in Data</a>. Its filename should be of the format
              <strong>owid-covid-data.csv</strong>.
            </p>
            <v-file-input
              v-model="rankingsSource"
              label="Source File"
              required
              color="pink darken-4"
              prepend-icon="mdi-file-table-outline"
            ></v-file-input>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" xs="2">
            <v-btn class="default-button" @click="uploadRankingsFile" color="amber darken-3">
              <span class="button-text">Submit</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <!-- Display dialog when submitting -->
    <ProgressDialog
      :isLoading="isSubmitting"
      loadingMessage="Uploading the CSV file and updating testing data..."
    />

    <!-- Display dialog on success -->

    <ConfirmationDialog
      :isDisplayed="isSuccess"
      title="Operation Successful"
      message="The testing data have been updated. Do you want to return to the Home screen?"
      :callback="redirectToHome"
      :negativeCallback="hideSuccessMessage"
    />

    <!-- Display dialog on submission error -->
    <ErrorDialog
      :isError="isSubmittingError"
      errorMessage="An error occurred while updating the testing data. Please try again."
      :callback="hideSubmittingError"
    />
  </div>
</template>

<script>
import { auth, db } from "@/firebase/init";
import testingCentersUtils from "@/utils/testing-centers-utils";
import testingRankingsUtils from "@/utils/testing-rankings-utils";
import ProgressDialog from "@/components/dialog/ProgressDialog.vue";
import ConfirmationDialog from "@/components/dialog/ConfirmationDialog.vue";
import ErrorDialog from "@/components/dialog/ErrorDialog.vue";
export default {
  name: "UpdateTestingCenters",
  components: { ProgressDialog, ConfirmationDialog, ErrorDialog },
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

      // Success dialog
      isSuccess: false,

      // Failure dialog
      isSubmittingError: false,

      source: null,
      rankingsSource: null
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
    hideSuccessMessage() {
      this.isSuccess = false;
    },
    hideSubmittingError() {
      this.isSubmittingError = false;
    },
    uploadRankingsFile() {
      // console.log(this.source);
      this.isSubmitting = true;
      const complete = testingRankings => {
        // console.log(testingRankings);
        this.updateTestingRankingsInDB(testingRankings);
      };
      const error = () => {
        this.isSubmitting = false;
        this.isSubmittingError = true;
      };
      testingRankingsUtils.get(
        this.$papa,
        this.rankingsSource,
        complete,
        error
      );
    },
    updateTestingRankingsInDB(testingRankings) {
      // console.log(db);

      var batch = db.batch();
      var collection = db.collection("stats-main");

      var ref = collection.doc("TESTING_RANKINGS_MAIN_ID");
      batch.set(ref, testingRankings);

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
