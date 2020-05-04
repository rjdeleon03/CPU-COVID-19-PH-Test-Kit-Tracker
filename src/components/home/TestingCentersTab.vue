<template>
  <v-container>
    <v-card>
      <v-card-title>
        <div>
          <p>Breakdown by Region</p>
          <GChart
            type="ColumnChart"
            :data="regionChartData"
            :options="regionChartOptions"
          />
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
          value: "name",
        },
        {
          text: "Individuals Tested",
          align: "end",
          value: "testedIndivs",
        },
        {
          text: "Positive Results",
          align: "end",
          value: "testedIndivsPositive",
        },
        // {
        //   text: "Positive Results %",
        //   align: "end",
        //   value: "testedIndivsPositivePercent"
        // },
        {
          text: "Negative Results",
          align: "end",
          value: "testedIndivsNegative",
        },
        // {
        //   text: "Negative Results %",
        //   align: "end",
        //   value: "testedIndivsNegativePercent"
        // },
        {
          text: "Remaining Tests",
          align: "end",
          value: "testsRemaining",
        },
        {
          text: "Region",
          align: "end",
          value: "location.region",
        },
      ],
      regionChartData: [
        // [
        //   "Genre",
        //   "Fantasy & Sci Fi",
        //   "Romance",
        //   "Mystery/Crime",
        //   "General",
        //   "Western",
        //   "Literature",
        //   { role: "annotation" },
        // ],
        // ["", 10, 24, 20, 32, 18, 5, ""],
      ],
      regionChartOptions: {
        isStacked: "relative",
        bar: { groupWidth: "75%" },
        orientation: "horizontal",
      },
    };
  },
  mounted() {
    db.collection("testingCenters")
      .orderBy("name")
      .onSnapshot((snapshot) => {
        var luzonCount = 0;
        var visayasCount = 0;
        var mindanaoCount = 0;

        snapshot.docs.forEach((doc) => {
          let data = doc.data();
          this.testingCenters.push(data);

          switch (data.location.region) {
            case "Luzon":
              luzonCount++;
              break;
            case "Visayas":
              visayasCount++;
              break;
            case "Mindanao":
              mindanaoCount++;
              break;
          }
        });
        this.regionChartData = [
          ["", "", "", ""],
          ["1", luzonCount, visayasCount, mindanaoCount],
        ];
      });
  },
};
</script>

<style></style>
