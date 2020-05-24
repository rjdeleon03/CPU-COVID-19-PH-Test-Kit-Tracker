<template>
  <v-container id="testing-centers">
    <v-card>
      <v-card-title>
        <!-- <v-row justify="center" no-gutters>
          <v-col cols="12">
            <p align="center">Breakdown by Region</p>
          </v-col>
        </v-row>-->
        <v-container>
          <v-row justify="center" no-gutters class="primary--text">
            <!-- <v-col cols="12" xl="3" lg="3" md="12" sm="12" xs="12">Breakdown by Region</v-col> -->
            <v-col cols="12" xl="3" lg="3" md="12" sm="12" xs="12">
              <div
                class="figures-container total"
                v-ripple="{ center: true }"
                v-on:click="searchClear"
              >
                <span class="figure">{{ regionBreakdown.total }}</span>
                <p class="label">Total</p>
              </div>
            </v-col>
            <v-col cols="12" xl="3" lg="3" md="4" sm="4" xs="12">
              <div class="figures-container" v-ripple="{ center: true }" v-on:click="searchLuzon">
                <span class="figure">{{ regionBreakdown.luzon }}</span>
                <p class="label">Luzon</p>
              </div>
            </v-col>
            <v-col cols="12" xl="3" lg="3" md="4" sm="4" xs="12">
              <div class="figures-container" v-ripple="{ center: true }" v-on:click="searchVisayas">
                <span class="figure">{{ regionBreakdown.visayas }}</span>
                <p class="label">Visayas</p>
              </div>
            </v-col>
            <v-col cols="12" xl="3" lg="3" md="4" sm="4" xs="12">
              <div
                class="figures-container"
                v-ripple="{ center: true }"
                v-on:click="searchMindanao"
              >
                <span class="figure">{{ regionBreakdown.mindanao }}</span>
                <p class="label">Mindanao</p>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <div></div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-title>
        <v-container>
          <v-row>
            <v-btn
              icon="true"
              id="search-clear-button"
              color="primary"
              v-on:click="searchClear"
              v-if="tableSearch!=''"
            >
              <v-icon>close</v-icon>
            </v-btn>
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
        <template v-slot:item.backlogs="{ item }">
          <span>{{utils.numberWithCommas(item.backlogs)}}</span>
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
        total: 0,
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
          text: "Backlogs",
          align: "end",
          value: "backlogs"
        },
        {
          text: "Region",
          align: "end",
          value: "location.region"
        }
      ]
    };
  },
  methods: {
    searchLuzon() {
      this.tableSearch = "Luzon";
    },
    searchVisayas() {
      this.tableSearch = "Visayas";
    },
    searchMindanao() {
      this.tableSearch = "Mindanao";
    },
    searchClear() {
      this.tableSearch = "";
    }
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
          mindanao: mindanaoCount,
          total: luzonCount + visayasCount + mindanaoCount
        };
      });
  }
};
</script>

<style>
#testing-centers .figures-main.figures-container .figure {
  font-size: 2em;
  font-weight: 600;
}
#testing-centers .figures-main.figures-container .figure {
  font-size: 2.5em;
  font-weight: 600;
}
#testing-centers .label {
  margin-bottom: 0px !important;
  text-transform: uppercase;
}
#testing-centers .figures-container .figure {
  font-size: 1.8em;
  font-weight: 700;
}
#testing-centers .figures-container.total .label {
  font-weight: 700;
  color: #f50057;
}
#testing-centers .figures-container.total .figure {
  font-size: 1.8em;
  font-weight: 700;
  color: #f50057;
}
#testing-centers .figures-container {
  text-align: center;
  padding-top: 10px;
}
#testing-centers #search-clear-button {
  margin-right: 10px;
}
#table-container {
  margin-top: -130px !important;
}
</style>