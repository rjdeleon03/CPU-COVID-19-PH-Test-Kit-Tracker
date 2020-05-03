<template>
  <v-container>
    <v-card>
      <v-card-title>
        <div>
          <p>Breakdown by Region</p>
        </div>
      </v-card-title>
      <v-data-table
        :headers="tableHeaders"
        :items="testingCenters"
        :sort-desc="[false, true]"
        :search="tableSearch"
        multi-sort
      >
        <!-- <template v-slot:item.source="{ item }">
          <strong>{{ item.source }}</strong>
        </template>
        <template v-slot:item.actions="{ item }" v-if="authenticated">
          <v-icon small class="mr-2" @click="navigateToEditTestKit(item)">mdi-pencil</v-icon>
          <v-icon small @click="confirmDeletion(item)">mdi-delete</v-icon>
        </template>-->
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { db } from "@/firebase/init";
export default {
  name: "TestingCentersTab",
  data() {
    return {
      testingCenters: [],
      tableSearch: "",
      tableHeaders: [
        {
          text: "Name",
          align: "start",
          value: "name"
        },
        {
          text: "Individuals Tested",
          align: "end",
          value: "testedIndivs"
        },
        {
          text: "Positive Results",
          align: "end",
          value: "testedIndivsPositive"
        },
        // {
        //   text: "Positive Results %",
        //   align: "end",
        //   value: "testedIndivsPositivePercent"
        // },
        {
          text: "Negative Results",
          align: "end",
          value: "testedIndivsNegative"
        },
        // {
        //   text: "Negative Results %",
        //   align: "end",
        //   value: "testedIndivsNegativePercent"
        // },
        {
          text: "Remaining Tests",
          align: "end",
          value: "testsRemaining"
        },
        {
          text: "Region",
          align: "end",
          value: "location.region"
        }
      ]
    };
  },
  mounted() {
    db.collection("testingCenters")
      .orderBy("name")
      .onSnapshot(snapshot => {
        snapshot.docs.forEach(doc => {
          let data = doc.data();
          this.testingCenters.push(data);
        });
      });
  }
};
</script>

<style>
</style>