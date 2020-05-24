<template>
  <v-container id="testing-centers">
    <v-card>
      <v-card-title>
        <v-container>
          <v-row justify="center" no-gutters class="primary--text">
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
              id="search-clear-button"
              :depressed="true"
              color="primary"
              v-on:click="searchClear"
              v-if="tableSearch!=''"
            >CLEAR</v-btn>
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
        :headers="computedTableHeaders"
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
        <template v-slot:item.actions="{ item }" v-if="authenticated">
          <v-icon small class="mr-2" @click="editTestingCenter(item)">mdi-pencil</v-icon>
          <v-icon small @click="confirmDeletion(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <ConfirmationDialog
      :isDisplayed="forDeletion.isDeleteConfirm"
      title="Delete Testing Center"
      message="Are you sure you want to delete this testing center? This action CANNOT be undone."
      :callback="deleteItem"
      :negativeCallback="cancelDeletion"
    />
  </v-container>
</template>

<script>
import { db } from "@/firebase/init";
import { utils } from "../../utils";
const ConfirmationDialog = () =>
  import("@/components/dialog/ConfirmationDialog.vue");
export default {
  name: "TestingCentersTab",
  components: { ConfirmationDialog },
  props: ["authenticated"],
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
        },
        { text: "Actions", value: "actions", align: "end", sortable: false }
      ],

      // Deletion
      forDeletion: {
        isDeleteConfirm: false,
        item: null
      }
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
    },
    confirmDeletion(item) {
      this.forDeletion.item = item;
      this.forDeletion.isDeleteConfirm = true;
    },
    cancelDeletion() {
      this.forDeletion.item = null;
      this.forDeletion.isDeleteConfirm = false;
    },
    editTestingCenter(item) {
      let key = item.id;
      this.$router.push("/testing-centers/edit/" + key);
    },
    deleteItem() {
      let key = this.forDeletion.item.id;
      db.collection("testingCenters")
        .doc(key)
        .delete();
      this.cancelDeletion();
    }
  },
  mounted() {
    db.collection("testingCenters")
      .orderBy("name")
      .onSnapshot(snapshot => {
        var luzonCount = 0;
        var visayasCount = 0;
        var mindanaoCount = 0;

        this.testingCenters = [];

        snapshot.docs.forEach(doc => {
          let data = doc.data();
          this.testingCenters.push(data);

          data.id = doc.id;

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
  },
  computed: {
    computedTableHeaders: function() {
      return this.authenticated
        ? this.tableHeaders
        : this.tableHeaders.slice(0, -1);
    }
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
  padding: 0px;
  margin-right: 10px;
}
#table-container {
  margin-top: -130px !important;
}
</style>