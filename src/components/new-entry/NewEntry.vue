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
                label="No. of Pledged Units"
                type="number"
                min="0"
                required
                color="pink darken-4"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>

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
              label="No. of Distributed Units"
              type="number"
              min="0"
              required
              color="pink darken-4"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center" no-gutters>
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <v-dialog
              ref="dialog"
              v-model="datePickerVisible"
              :return-value.sync="dateReceived"
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateReceived"
                  label="Date Received"
                  readonly
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
    <v-dialog v-model="isLoading" max-width="350" persistent>
      <v-card>
        <v-card-text>
          <div class="dialog-contents">
            <v-progress-circular :size="100" :width="7" color="amber darken-4" indeterminate></v-progress-circular>
            <p>{{loadingMessage}}</p>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Display dialog on success -->
    <v-dialog v-model="isSuccess" max-width="350" persistent>
      <v-card>
        <v-card-title class="headline">Operation Successful</v-card-title>

        <v-card-text>
          <p align="left">Your test kit entry has been saved.</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="amber darken-4" text @click="redirectToHome()">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Display dialog on failure -->
    <v-dialog v-model="isFailure" max-width="350" persistent>
      <v-card>
        <v-card-title class="headline">Operation Failed</v-card-title>

        <v-card-text>
          <p align="left">{{ failureMessage }}</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="amber darken-4" text @click="isFailure = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { db } from "@/firebase/init";
import { natureOfAcquisition } from "../../constants";
export default {
  name: "NewEntry",
  components: {},
  data() {
    console.log(this.$route.params.kit_id);
    return {
      // Loading dialog
      isLoading: false,
      loadingMessage: "",

      // Success dialog
      isSuccess: false,

      // Failure dialog
      isFailure: false,
      failureMessage: "",

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
      pledgedMinUnits: 0,
      pledgedMinUnitsRules: [
        v =>
          v < this.pledgedMaxUnits ||
          "Minimum no. of pledged units must be less than the maximum."
      ],
      pledgedMaxUnits: 0,
      pledgedMaxUnitsRules: [
        v =>
          v > this.pledgedMinUnits ||
          "Maximum no. of pledged units must be greater than the minimum."
      ],
      distributedUnits: 0,
      dateReceived: new Date().toISOString().slice(0, 10)
    };
  },
  mounted() {
    if (!this.kitId) return;
    this.displayLoadingScreen("Fetching test kit entry...");
    this.dbKits()
      .doc(this.kitId)
      .get()
      .then(doc => {
        console.log(doc.data());
        const data = doc.data();
        this.isLoading = false;
        this.isSuccess = false;
        this.isFailure = false;
        this.source = data.source;
        this.acquired = this.natureOfAcquisition[data.nature_of_acquisition];
        this.pledgedMinUnits = data.units_pledged_min;
        this.pledgedMaxUnits = data.units_pledged_max;
        this.onHandUnits = data.units_on_hand;
        this.distributedUnits = data.units_used;
        this.dateReceived = data.date_received;
      })
      .catch(() => {
        // this.displayFailureMessage("The test kit entry could not be loaded.");
        this.$router.push("/");
      });
  },
  methods: {
    dbKits() {
      return db.collection("kits");
    },
    displayLoadingScreen(message) {
      this.isLoading = true;
      this.isSuccess = false;
      this.isFailure = false;
      this.loadingMessage = message;
    },
    displayFailureMessage(message) {
      this.isLoading = false;
      this.isSuccess = false;
      this.isFailure = true;
      this.failureMessage = message;
    },
    addKit() {
      if (!this.$refs.form.validate()) return;

      var task = null;
      if (this.kitId) {
        this.displayLoadingScreen(
          "Saving changes to the selected test kit entry..."
        );
        task = this.dbKits()
          .doc(this.kitId)
          .update({
            date_received: this.dateReceived,
            nature_of_acquisition: this.natureOfAcquisition.findIndex(v => {
              return v === this.acquired;
            }),
            source: this.source,
            timestampModified: new Date(),
            units_on_hand: this.onHandUnits,
            units_pledged_max: this.pledgedMaxUnits,
            units_pledged_min: this.pledgedMinUnits,
            units_used: this.distributedUnits
          });
      } else {
        this.displayLoadingScreen("Submitting your new test kit entry...");
        task = this.dbKits().add({
          date_received: this.dateReceived,
          nature_of_acquisition: this.acquired,
          source: this.source,
          timestamp: new Date(),
          units_on_hand: this.onHandUnits,
          units_pledged_max: this.pledgedMaxUnits,
          units_pledged_min: this.pledgedMinUnits,
          units_used: this.distributedUnits
        });
      }
      task
        .then(() => {
          this.isLoading = false;
          this.isSuccess = true;
          this.isFailure = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.isSuccess = false;
          this.displayFailureMessage(
            "Your new test kit entry has not been saved. Please try again."
          );
        });
    },
    redirectToHome() {
      this.$router.push("/");
    }
  },
  computed: {
    disableInput: function() {
      if (this.acquired == "0") return true;
      else return false;
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
