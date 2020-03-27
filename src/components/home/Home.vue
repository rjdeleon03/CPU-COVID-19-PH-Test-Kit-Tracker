<template>
  <div>
    <div class="background"></div>
    <div class="container">
      <div class="top-content">
        <table>
          <tr>
            <td colspan="2">
              <div class="figures-main figures-container">
                <span class="figure">1,000,000</span>
                <p class="label">Cases</p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="figures-container">
                <span class="figure">12,345</span>
                <p class="label">Deaths</p>
              </div>
            </td>
            <td>
              <div class="figures-container">
                <span class="figure">4,983,277</span>
                <p class="label">Tests Conducted</p>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div id="table-container">
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>Top 10 Australian beaches</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

          <v-card-text class="text--primary">
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text>Share</v-btn>

            <v-btn color="orange" text>Explore</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <!-- <div align="center">
      <table>
        <tr>
          <th>Quantity</th>
          <th>Used</th>
          <th>Source</th>
          <th>On-Hand?</th>
        </tr>
        <tr v-for="(kit, idx) in kits" :key="idx">
          <td>{{ kit.units_pledged_max }}</td>
          <td>{{ kit.units_used }}</td>
          <td>{{ kit.source }}</td>
          <td>{{ kit.units_on_hand }}</td>
        </tr>
      </table>
      </div>-->
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/init";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      kits: []
    };
  },
  firestore() {
    return {
      kits: db.collection("kits").orderBy("timestamp")
    };
  }
};
</script>

<style>
.background {
  width: 100%;
  height: 400px;
  background-color: #581845;
  position: absolute;
  top: 0;
  left: 0;
}
.container {
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.top-content {
  height: 380px;
  color: white;
  margin-bottom: 10px;
  position: relative;
}
.top-content table {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.top-content table .figures-container {
  margin: 10px 20px;
  text-align: right;
}
.top-content table .figures-main.figures-container {
  text-align: right;
}
.top-content table .figures-main.figures-container .figure {
  font-size: 4em;
  font-weight: 600;
}
.top-content table .figures-main.figures-container .figure {
  font-size: 4.5em;
  font-weight: 600;
}
.top-content table .figures-main.figures-container .label {
  margin-top: -25px;
  font-size: 2em;
  text-transform: uppercase;
}
.top-content table .figures-container .figure {
  font-size: 3em;
  font-weight: 600;
}
.top-content table .figures-container .label {
  margin-top: -10px;
  font-size: 1em;
  text-transform: uppercase;
}
</style>