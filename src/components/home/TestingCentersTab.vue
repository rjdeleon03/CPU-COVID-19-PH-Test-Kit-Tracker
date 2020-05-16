<template>
  <v-container>
    <v-card>
      <v-card-title>
        <!-- <v-row justify="center" no-gutters>
          <v-col cols="12">
            <p align="center">Breakdown by Region</p>
          </v-col>
        </v-row>-->
        <v-container>
          <v-row justify="center" no-gutters>
            <v-col cols="12" xl="3" lg="3" md="12" sm="12" xs="12">Breakdown by Region</v-col>
            <v-col cols="12" xl="3" lg="3" md="4" sm="12" xs="12">Luzon: {{ regionBreakdown.luzon }}</v-col>
            <v-col
              cols="12"
              xl="3"
              lg="3"
              md="4"
              sm="12"
              xs="12"
            >Visayas: {{ regionBreakdown.visayas }}</v-col>
            <v-col
              cols="12"
              xl="3"
              lg="3"
              md="4"
              sm="12"
              xs="12"
            >Mindanao: {{ regionBreakdown.mindanao }}</v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row>
            <v-text-field
              v-model="tableSearch"
              append-icon="mdi-magnify"
              label="Search"
              color="pink darken-4"
              single-line
              hide-details
              class="search-field"
            ></v-text-field>
          </v-row>
        </v-container>
        <div></div>
      </v-card-title>
      <v-data-table
        :headers="tableHeaders"
        :items="testingCenters"
        :sort-desc="[false, true]"
        :search="tableSearch"
        multi-sort
      >
        <template v-slot:item.testedIndivs="{ item }">
          <span>{{utils.numberWithCommas(item.testedIndivs)}}</span>
        </template>
        <template v-slot:item.testedIndivsPositive="{ item }">
          <span>{{utils.numberWithCommas(item.testedIndivsPositive)}}</span>
        </template>
        <template v-slot:item.testedIndivsNegative="{ item }">
          <span>{{utils.numberWithCommas(item.testedIndivsNegative)}}</span>
        </template>
        <template v-slot:item.testsRemaining="{ item }">
          <span>{{utils.numberWithCommas(item.testsRemaining)}}</span>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { db } from "@/firebase/init";
import { utils } from "../../utils";
export default {
  name: "TestingCentersTab",
  data() {
    return {
      utils: utils,
      testingCenters: [],
      regionBreakdown: {
        luzon: 0,
        visayas: 0,
        mindanao: 0
      },
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
        var luzonCount = 0;
        var visayasCount = 0;
        var mindanaoCount = 0;

        snapshot.docs.forEach(doc => {
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
          ["", "Luzon", "Visayas", "Mindanao"],
          ["No. of Testing Centers", luzonCount, visayasCount, mindanaoCount]
        ];
        this.regionBreakdown = {
          luzon: luzonCount,
          visayas: visayasCount,
          mindanao: mindanaoCount
        };
      });
  }
};
</script>

<style>
</style>