<template>
  <div>
    <div class="background"></div>
    <div class="top-content figures">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" xl="5" lg="5" sm="12">
            <div class="figures-main figures-container">
              <span class="figure">{{casesTotal}}</span>
              <p class="label">Cases</p>
            </div>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="auto">
            <div class="figures-container">
              <span class="figure">{{deathsTotal}}</span>
              <p class="label">Deaths</p>
            </div>
          </v-col>
          <v-col cols="12" md="auto">
            <div class="figures-container">
              <span class="figure">{{usedTotal}}</span>
              <p class="label">Test Kits (Used)</p>
            </div>
          </v-col>
          <v-col cols="12" md="auto">
            <div class="figures-container">
              <span class="figure">{{onHandTotal}}</span>
              <p class="label">Test Kits (On-Hand)</p>
            </div>
          </v-col>
          <v-col cols="12" md="auto">
            <div class="figures-container">
              <span class="figure">{{pledgedTotal}}</span>
              <p class="label">Test Kits (Pledged + On-Hand)</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="share-content">
      <v-container>
        <v-row justify="center">
          <social-sharing url="http://192.168.1.10:8080" inline-template>
            <div>
              Share to:
              <network network="facebook">
                <i class="fa fa-fw fa-facebook"></i> Facebook
              </network>
              <network network="twitter">
                <i class="fa fa-fw fa-twitter"></i> Twitter
              </network>
              <network network="linkedin">
                <i class="fa fa-fw fa-linkedin"></i> LinkedIn
              </network>
              <network network="reddit">
                <i class="fa fa-fw fa-reddit"></i> Reddit
              </network>
            </div>
          </social-sharing>
        </v-row>
      </v-container>
    </div>
    <v-container>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            color="pink darken-4"
            single-line
            hide-details
            class="search-field"
          ></v-text-field>
          <v-btn dark class="mb-2" @click="navigateToAddTestKit()" color="amber darken-4">New Entry</v-btn>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="kits"
          :sort-desc="[false, true]"
          multi-sort
          :search="search"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="navigateToEditTestKit(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { db } from "@/firebase/init";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      // Totals
      casesTotal: "-",
      deathsTotal: "-",
      onHandTotal: "-",
      pledgedTotal: "-",
      pledgedMinTotal: "-",
      pledgedMaxTotal: "-",
      usedTotal: "-",

      search: "",
      headers: [
        {
          text: "Source",
          align: "start",
          value: "source"
        },
        { text: "Date Received", value: "date_received", align: "end" },
        { text: "Units Pledged", value: "units_pledged_max", align: "end" },
        { text: "Units On-Hand", value: "units_on_hand", align: "end" },
        { text: "Units Used", value: "units_used", align: "end" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      kits: []
    };
  },
  firestore() {
    return {
      kits: db.collection("kits").orderBy("timestamp")
    };
  },
  methods: {
    navigateToAddTestKit() {
      this.$router.push("/kits/new");
    },
    navigateToEditTestKit(item) {
      let key = item[".key"];
      this.$router.push("/kits/edit/" + key);
    },
    numberWithCommas(x) {
      if (!x) return "0";
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    deleteTestKit() {}
  },
  mounted() {
    db.collection("stats-main")
      .doc("MAIN_STATS_ID")
      .onSnapshot(doc => {
        const data = doc.data();
        this.usedTotal = this.numberWithCommas(data.testKitsUsed);
        this.onHandTotal = this.numberWithCommas(data.testKitsOnHand);
        this.pledgedMinTotal = this.numberWithCommas(data.testKitsPledgedMin);
        this.pledgedMaxTotal = this.numberWithCommas(data.testKitsPledgedMax);
        if (data.testKitsPledgedMax > data.testKitsPledgedMin) {
          this.pledgedTotal =
            this.pledgedMinTotal + " - " + this.pledgedMaxTotal;
        } else {
          this.pledgedTotal = this.pledgedMaxTotal;
        }
      });
    db.collection("stats-main")
      .doc("EXTERNAL_STATS_ID")
      .onSnapshot(doc => {
        const data = doc.data();
        this.casesTotal = this.numberWithCommas(data.totalCases);
        this.deathsTotal = this.numberWithCommas(data.deaths);
      });
  }
};
</script>

<style>
.background {
  width: 100%;
  height: 500px;
  background-image: url("~@/assets/header_bg_400h.png");
  background-position: bottom center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
}
.container {
  /* width: 100%;
  height: 100%; */
  z-index: 1;
  /* position: absolute;
  top: 0;
  left: 0;
  right: 0; */
}
.top-content {
  height: 320px;
  color: white;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
}
.top-content table {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.top-content .figures-container {
  margin: 10px 20px;
  text-align: end;
}
.top-content .figures-main.figures-container {
  text-align: center;
}
.top-content .figures-main.figures-container .figure {
  font-size: 4em;
  font-weight: 600;
}
.top-content .figures-main.figures-container .figure {
  font-size: 4.5em;
  font-weight: 600;
}
.top-content .figures-main.figures-container .label {
  margin-top: -25px;
  font-size: 2em;
  text-transform: uppercase;
}
.top-content .figures-container .figure {
  font-size: 2.6em;
  font-weight: 600;
}
.top-content .figures-container .label {
  margin-top: -10px;
  font-size: 1em;
  text-transform: uppercase;
}
.share-content {
  z-index: 1;
  position: relative;
  color: white;
  text-align: right;
}
.share-content div span {
  cursor: pointer;
}
#table-container {
  /* margin: 20px 5%; */
  margin-top: 50px;
  margin-bottom: 100px;
  z-index: 1;
  position: relative;
}
.search-field {
  margin-right: 20px;
  margin-top: 0px !important;
  padding-top: 0px !important;
  margin-bottom: 4px !important;
}
</style>