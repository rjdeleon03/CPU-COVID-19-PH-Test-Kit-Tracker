<template>
  <div id="new-entry" class="content-wrapper">
    <v-form ref="form">
      <v-container class="grey lighten-5">
        <v-row justify="center">
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <div class="title">
              <h2 v-if="!kitId">Create New Test Kit Entry</h2>
              <h2 v-else>Edit Test Kit Entry</h2>
              <v-divider />
            </div>
          </v-col>
        </v-row>

        <v-row justify="center" no-gutters>
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <v-text-field
              v-model="source"
              :counter="50"
              :rules="sourceRules"
              label="Source"
              required
              color="pink darken-4"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center" no-gutters>
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <v-select
              label="Nature of Acquisition"
              v-model="acquired"
              :rules="acquiredRules"
              :items="natureOfAcquisition"
              required
              color="pink darken-4"
              item-color="amber darken-4"
            ></v-select>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <div class="title">
              <h4>Pledged Units</h4>
              <v-divider />
            </div>
          </v-col>
        </v-row>

        <v-row justify="center" no-gutters>
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <v-switch
              class="default-switch"
              v-model="pledgedUnitsUsesRange"
              label="No. of Pledged Units is a Range"
              @change="pledgedMinUnits = 0"
              color="amber darken-4"
            ></v-switch>
          </v-col>
        </v-row>

        <div v-if="pledgedUnitsUsesRange">
          <v-row justify="center" no-gutters>
            <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
              <v-text-field
                v-model="pledgedMinUnits"
                :rules="pledgedMinUnitsRules"
                label="Minimum No. of Pledged Units"
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
                v-model="pledgedMaxUnits"
                :rules="pledgedMaxUnitsRules"
                label="Maximum No. of Pledged Units"
                type="number"
                min="0"
                required
                color="pink darken-4"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>

        <div v-if="!pledgedUnitsUsesRange">
          <v-row justify="center" no-gutters>
            <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
              <v-text-field
                v-model="pledgedMaxUnits"
                :rules="pledgedMaxUnitsNonRangeRules"
                label="No. of Pledged Units"
                type="number"
                min="0"
                required
                color="pink darken-4"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <div v-if="acquired!='Pledge'">
          <v-row justify="center">
            <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
              <div class="title">
                <h4>On-hand Information</h4>
                <v-divider />
              </div>
            </v-col>
          </v-row>

          <v-row justify="center" no-gutters>
            <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
              <v-text-field
                v-model="onHandUnits"
                :rules="onHandUnitsRules"
                label="No. of On-hand Units"
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
                v-model="distributedUnits"
                :rules="distributedUnitsRules"
                label="No. of Used Units"
                type="number"
                min="0"
                required
                color="pink darken-4"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center" no-gutters>
            <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
              <v-dialog ref="dialog" v-model="datePickerVisible" width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dateReceived"
                    :rules="dateReceivedRules"
                    label="Date Received"
                    v-on="on"
                    required
                    color="pink darken-4"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateReceived"
                  @input="datePickerVisible = false"
                  header-color="pink darken-4"
                  color="amber darken-4"
                ></v-date-picker>
              </v-dialog>
            </v-col>
          </v-row>
        </div>
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
import { natureOfAcquisition } from "../../constants";
import ProgressDialog from "@/components/dialog/ProgressDialog.vue";
import SuccessDialog from "@/components/dialog/SuccessDialog.vue";
import ErrorDialog from "@/components/dialog/ErrorDialog.vue";
export default {
  name: "NewEntry",
  components: { ProgressDialog, SuccessDialog, ErrorDialog },
  data() {
    // console.log(this.$route.params.kit_id);
    return {
      // User
      user: {
        loggedIn: false,
        data: {}
      },

      // Loading dialog
      isFetching: false,
      fetchingMessage: "Fetching test kit entry...",

      // Loading error dialog
      isFetchingError: false,
      fetchingErrorMessage:
        "An error occurred while fetching the test kit entry.",

      // Submitting dialog
      isSubmitting: false,
      submittingMessage: "Saving the test kit entry...",

      // Success dialog
      isSuccess: false,
      successMessage: "The test kit entry has been saved.",

      // Failure dialog
      isSubmittingError: false,
      submittingErrorMessage:
        "An error occurred while saving the test kit entry. Please try again.",

      kitId: this.$route.params.kit_id,
      source: "",
      sourceRules: [
        v => !!v || "Please specify the source.",
        v =>
          (v && v.length <= 50) ||
          "Source must be not longer than 50 characters."
      ],
      pledgedUnitsUsesRange: false,
      datePickerVisible: false,
      natureOfAcquisition: natureOfAcquisition,
      acquired: "",
      acquiredRules: [v => !!v || "Please select the nature of acquisition."],
      onHandUnits: 0,
      onHandUnitsRules: [
        v => parseInt(v) >= 0 || "Input must be greater than or equal to zero."
      ],
      pledgedMinUnits: 0,
      pledgedMinUnitsRules: [
        v =>
          parseInt(v) < parseInt(this.pledgedMaxUnits) ||
          "Minimum no. of pledged units must be less than the maximum.",
        v => parseInt(v) >= 0 || "Input must be greater than or equal to zero."
      ],
      pledgedMaxUnits: 0,
      pledgedMaxUnitsRules: [
        v =>
          parseInt(v) > parseInt(this.pledgedMinUnits) ||
          "Maximum no. of pledged units must be greater than the minimum.",
        v => parseInt(v) >= 0 || "Input must be greater than or equal to zero."
      ],
      pledgedMaxUnitsNonRangeRules: [
        v => parseInt(v) >= 0 || "Input must be greater than or equal to zero."
      ],
      distributedUnits: 0,
      distributedUnitsRules: [
        v => parseInt(v) >= 0 || "Input must be greater than or equal to zero."
      ],
      dateReceived: new Date().toISOString().slice(0, 10),
      dateReceivedRules: [
        v => !!v || "Please specify the date the test kits were received."
      ]
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

    if (!this.kitId) return;
    this.isFetching = true;
    this.dbKits()
      .doc(this.kitId)
      .get()
      .then(doc => {
        // console.log(doc.data());
        const data = doc.data();

        this.isFetching = false;
        this.source = data.source;
        this.acquired = this.natureOfAcquisition[data.nature_of_acquisition];
        this.pledgedMinUnits = data.units_pledged_min;
        this.pledgedMaxUnits = data.units_pledged_max;
        this.onHandUnits = data.units_on_hand;
        this.distributedUnits = data.units_used;
        this.dateReceived = data.date_received;

        const minUnits = parseInt(this.pledgedMinUnits, 10);
        const maxUnits = parseInt(this.pledgedMaxUnits, 10);
        this.pledgedUnitsUsesRange = minUnits > 0 && maxUnits > minUnits;
      })
      .catch(() => {
        this.isFetching = false;
        this.isFetchingError = true;
        this.$router.push("/").catch(() => {});
      });
  },
  watch: {
    acquired: function(newValue) {
      if (newValue !== this.natureOfAcquisition[0]) {
        if (!this.dateReceived) {
          this.dateReceived = new Date().toISOString().slice(0, 10);
        }
      }
    }
  },
  methods: {
    dbKits() {
      return db.collection("kits");
    },
    addKit() {
      if (!this.$refs.form.validate()) return;
      if (this.acquired === this.natureOfAcquisition[0]) {
        this.onHandUnits = 0;
        this.distributedUnits = 0;
        this.dateReceived = null;
      }

      this.isSubmitting = true;
      var task = null;
      if (this.kitId) {
        task = this.dbKits()
          .doc(this.kitId)
          .update({
            date_received: this.dateReceived,
            nature_of_acquisition: this.natureOfAcquisition.findIndex(v => {
              return v === this.acquired;
            }),
            source: this.source,
            timestampModified: new Date().getTime() * -1,
            units_on_hand: parseInt(this.onHandUnits, 10),
            units_pledged_max: parseInt(this.pledgedMaxUnits, 10),
            units_pledged_min: parseInt(this.pledgedMinUnits, 10),
            units_used: parseInt(this.distributedUnits, 10)
          });
      } else {
        task = this.dbKits().add({
          date_received: this.dateReceived,
          nature_of_acquisition: this.natureOfAcquisition.findIndex(v => {
            return v === this.acquired;
          }),
          source: this.source,
          timestamp: new Date().getTime() * -1,
          units_on_hand: parseInt(this.onHandUnits, 10),
          units_pledged_max: parseInt(this.pledgedMaxUnits, 10),
          units_pledged_min: parseInt(this.pledgedMinUnits, 10),
          units_used: parseInt(this.distributedUnits, 10)
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
