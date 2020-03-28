<template>
  <div id="new-entry">
    <h1>Create New Entry</h1>
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
  </div>
</template>

<script>
import { db } from "@/firebase/init";
// import test from "./test.json";
export default {
  name: "NewEntry",
  components: {},
  data() {
    return {
      source: null,
      acquired: null,
      onHandUnits: null,
      pledgedMinUnits: null,
      pledgedMaxUnits: null,
      distributedUnits: null,
      dateReceived: new Date().toISOString().slice(0, 10)
    };
  },
  dao() {
    return {
      kits: db.collection("kits")
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
#new-entry table,
#new-entry th,
#new-entry td {
  border: 1px solid black;
  border-collapse: collapse;
  text-align: left;
  margin: 0 auto;
}
</style>
