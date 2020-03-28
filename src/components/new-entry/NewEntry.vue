<template>
  <div id="new-entry" class="content-wrapper">
    <v-form>
      <v-container class="grey lighten-5">
        <v-row justify="center">
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <div class="title">
              <h2>Create New Test Kit Entry</h2>
              <v-divider />
            </div>
          </v-col>
        </v-row>

        <v-row justify="center" no-gutters>
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <v-text-field
              v-model="source"
              :counter="10"
              label="Source"
              required
              color="pink darken-4"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center" no-gutters>
          <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
            <v-select
              :items="natureOfAcquisition"
              label="Acquired Through"
              v-model="acquired"
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
                label="Minimum No. of Pledged Units"
                type="number"
                required
                color="pink darken-4"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center" no-gutters>
            <v-col cols="12" xl="5" lg="6" md="7" sm="8" xs="8">
              <v-text-field
                v-model="pledgedMaxUnits"
                label="Maximum No. of Pledged Units"
                type="number"
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
              persistent
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

    <!--
    <div>
      <table id="inputTab">
        <tr>
          <td>
            <label>Source:</label>
          </td>
          <td>
            <input id="source" type="text" v-model="source" @keyup.enter="addKit" />
          </td>
        </tr>
        <tr>
          <td>
            <label>Acquired through:</label>
          </td>
          <td>
            <select id="natureOfAcquisition" v-model="acquired" @change="resetForm($event)">
              <option value disabled>Select an option</option>
              <option value="0">Pledge</option>
              <option value="1">Donation</option>
              <option value="2">Government Procurement</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label>On-hand:</label>
          </td>
          <td>
            <input
              id="onHand"
              type="text"
              v-model="onHandUnits"
              @keyup.enter="addKit"
              :disabled="disableInput"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label>Pledged (Min):</label>
          </td>
          <td>
            <input id="pledgedMin" type="text" v-model="pledgedMinUnits" @keyup.enter="addKit" />
          </td>
        </tr>
        <tr>
          <td>
            <label>Pledged (Max):</label>
          </td>
          <td>
            <input id="pledgedMax" type="text" v-model="pledgedMaxUnits" @keyup.enter="addKit" />
          </td>
        </tr>
        <tr>
          <td>
            <label>Distributed:</label>
          </td>
          <td>
            <input
              id="used"
              type="text"
              v-model="distributedUnits"
              @keyup.enter="addKit"
              :disabled="disableInput"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label>Date Received:</label>
          </td>
          <td>
            <input
              id="dateReceived"
              type="date"
              value
              v-model="dateReceived"
              :disabled="disableInput"
            />
          </td>
        </tr>
      </table>
    </div>
    <div>
      <button @click="addKit">Submit</button>
    </div>
    -->
  </div>
</template>

<script>
import { db } from "@/firebase/init";
import { natureOfAcquisition } from "../../constants";
export default {
  name: "NewEntry",
  components: {},
  data() {
    return {
      pledgedUnitsUsesRange: false,
      datePickerVisible: false,
      natureOfAcquisition: natureOfAcquisition,
      source: null,
      acquired: 0,
      onHandUnits: 0,
      pledgedMinUnits: 0,
      pledgedMaxUnits: 0,
      distributedUnits: 0,
      dateReceived: new Date().toISOString().slice(0, 10)
    };
  },
  methods: {
    addKit() {
      console.log("Adding kit...");
      db.collection("kits").add({
        date_received: this.dateReceived,
        nature_of_acquisition: this.acquired,
        source: this.source,
        timestamp: new Date(),
        units_on_hand: this.onHandUnits,
        units_pledged_max: this.pledgedMaxUnits,
        units_pledged_min: this.pledgedMinUnits,
        units_used: this.distributedUnits
      });
    },
    resetForm(event) {
      if (event.target.value == "0") {
        this.dateReceived = null;
        this.onHandUnits = null;
        this.distributedUnits = null;
      }
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
</style>
