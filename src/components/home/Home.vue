<template>
  <div>
    <div class="header"></div>
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
.header {
  height: 500px;
  background-color: #581845;
}
</style>