<template>
  <div id="update-stats" class="content-wrapper">
    <v-form ref="form">
      <v-container class="grey lighten-5">
        <v-row justify="center">
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <div class="title">
              <h2>Update Statistics</h2>
              <v-divider />
            </div>
          </v-col>
        </v-row>

        <v-row justify="center" no-gutters>
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <v-text-field
              v-model="positiveCases"
              :rules="positiveCasesRules"
              label="Total No. of Positive Cases"
              type="number"
              min="0"
              required
              color="pink darken-4"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center" no-gutters>
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <v-text-field
              v-model="deaths"
              :rules="deathsRules"
              label="Total No. of Deaths"
              type="number"
              min="0"
              required
              color="pink darken-4"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" xs="2">
            <v-btn class="default-button" @click="updateStats" color="amber darken-3">
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
import { db } from "@/firebase/init";
import ProgressDialog from "@/components/dialog/ProgressDialog.vue";
import SuccessDialog from "@/components/dialog/SuccessDialog.vue";
import ErrorDialog from "@/components/dialog/ErrorDialog.vue";
export default {
  name: "UpdateStats",
  components: { ProgressDialog, SuccessDialog, ErrorDialog },
  data() {
    console.log(this.$route.params.kit_id);
    return {
      positiveCases: 0,
      positiveCasesRules: [
        v => !!v || "Please specify the total number of COVID-19 cases."
      ],
      deaths: 0,
      deathsRules: [
        v => !!v || "Please specify the total number of COVID-19 deaths."
      ],

      // Loading dialog
      isFetching: false,
      fetchingMessage: "Fetching COVID-19 statistics...",

      // Loading error dialog
      isFetchingError: false,
      fetchingErrorMessage:
        "An error occurred while fetching COVID-19 statistics.",

      // Submitting dialog
      isSubmitting: false,
      submittingMessage: "Updating COVID-19 statistics...",

      // Success dialog
      isSuccess: false,
      successMessage: "The COVID-19 statistics have been updated.",

      // Failure dialog
      isSubmittingError: false,
      submittingErrorMessage:
        "An error occurred while upadting COVID-19 statistics."
    };
  },
  mounted() {
    this.isFetching = true;
    this.dbMainStats()
      .doc("EXTERNAL_STATS_ID")
      .get()
      .then(doc => {
        const data = doc.data();
        this.isFetching = false;
        this.deaths = data.deaths;
        this.positiveCases = data.totalCases;
      })
      .catch(() => {
        this.isFetching = false;
        this.isFetchingError = true;
        this.redirectToHome();
      });
  },
  methods: {
    dbMainStats() {
      return db.collection("stats-main");
    },
    updateStats() {
      console.log("Hello");
      if (!this.$refs.form.validate()) return;

      this.isSubmitting = true;

      this.dbMainStats()
        .doc("EXTERNAL_STATS_ID")
        .update({
          deaths: this.deaths,
          totalCases: this.positiveCases
        })
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
#update-stats {
  padding-bottom: 30px;
}
#update-stats table,
#update-stats th,
#update-stats td {
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
