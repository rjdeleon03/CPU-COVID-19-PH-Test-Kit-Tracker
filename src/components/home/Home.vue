<template>
  <div>
    <div class="top-content figures">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" xl="6" lg="6" sm="12">
            <div class="figures-main figures-container">
              <span class="figure">{{animatedCasesTotal}}</span>
              <p class="label">Confirmed Cases in the Philippines</p>
              <Timer />
            </div>
          </v-col>
        </v-row>
        <v-row justify="center" no-gutters>
          <v-col cols="12" lg="auto" md="6" sm="6">
            <div class="figures-container">
              <span class="figure">{{animatedRecoveredTotal}}</span>
              <p class="label">Recoveries</p>
            </div>
          </v-col>
          <v-col cols="12" lg="auto" md="6" sm="6">
            <div class="figures-container">
              <span class="figure">{{animatedDeathsTotal}}</span>
              <p class="label">Deaths</p>
            </div>
          </v-col>
          <v-col cols="12" lg="auto" md="6" sm="6">
            <div class="figures-container">
              <span class="figure">{{animatedIndivsTested}}</span>
              <p class="label">Individuals Tested</p>
            </div>
          </v-col>
          <v-col cols="12" lg="auto" md="6" sm="6">
            <div class="figures-container">
              <span class="figure">{{animatedIndivsTestedPositive}}%</span>
              <p class="label">Detection Rate</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-tabs
        v-model="tab"
        background-color="transparent accent-4"
        color="amber accent-2"
        dark
        centered
        class="tabs"
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab :key="items[0].tab">Testing Centers</v-tab>
        <v-tab :key="items[1].tab">Tests per 1000 (SEA)</v-tab>
        <v-tab :key="items[2].tab">Tests per 1000 (Worldwide)</v-tab>
        <v-tab :key="items[3].tab">About</v-tab>
      </v-tabs>
    </div>

    <!-- Cases Information -->
    <v-tabs-items v-model="tab" id="table-container">
      <v-tab-item :key="items[0].tab">
        <TestingCentersTab />
      </v-tab-item>
      <v-tab-item :key="items[1].tab">
        <TestingInfoTab />
      </v-tab-item>
      <v-tab-item :key="items[2].tab">
        <TestingInfoWorldwideTab />
      </v-tab-item>
      <v-tab-item :key="items[3].tab">
        <AboutTab />
      </v-tab-item>
    </v-tabs-items>

    <!-- Display dialog when loading -->
    <ProgressDialog :isLoading="isFetching" :loadingMessage="fetchingMessage" />
  </div>
</template>

<script>
import gsap from "gsap";
import { utils } from "../../utils";
import { auth, db } from "@/firebase/init";

const TestingInfoTab = () => import("./TestingInfoTab.vue");
const TestingInfoWorldwideTab = () => import("./TestingInfoWorldwideTab.vue");
const TestingCentersTab = () => import("./TestingCentersTab.vue");
const AboutTab = () => import("./AboutTab.vue");
const Timer = () => import("./Timer.vue");
const ProgressDialog = () => import("@/components/dialog/ProgressDialog.vue");

export default {
  name: "Home",
  components: {
    ProgressDialog,
    TestingInfoTab,
    TestingInfoWorldwideTab,
    TestingCentersTab,
    AboutTab,
    Timer
  },
  data() {
    return {
      // Fetching flag
      isFetching: false,
      fetchingMessage: "Loading data...",

      // User
      user: {
        loggedIn: false,
        data: {}
      },

      // Totals
      casesTotal: 0,
      tweenedCasesTotal: 0,

      deathsTotal: 0,
      tweenedDeathsTotal: 0,

      onHandTotal: 0,
      tweenedOnHandTotal: 0,

      usesPledgedRange: false,
      pledgedTotal: 0,
      tweenedPledgedTotal: 0,

      pledgedMinTotal: 0,
      tweenedPledgedMinTotal: 0,

      pledgedMaxTotal: 0,
      tweenedPledgedMaxTotal: 0,

      recoveredTotal: 0,
      tweenedRecoveredTotal: 0,

      indivsTested: 0,
      tweenedIndivsTested: 0,

      indivsTestedPositive: 0,
      tweenedIndivsTestedPositive: 0,

      // Tabs
      tab: null,
      items: [
        { tab: "One", content: "Tab 1 Content" },
        { tab: "Two", content: "Tab 2 Content" },
        { tab: "Three", content: "Tab 3 Content" },
        { tab: "Four", content: "Tab 4 Content" }
      ]
    };
  },
  computed: {
    animatedCasesTotal: function() {
      return utils.numberWithCommas(this.tweenedCasesTotal.toFixed(0));
    },
    animatedDeathsTotal: function() {
      return utils.numberWithCommas(this.tweenedDeathsTotal.toFixed(0));
    },
    animatedOnHandTotal: function() {
      return utils.numberWithCommas(this.tweenedOnHandTotal.toFixed(0));
    },
    animatedPledgedTotal: function() {
      return utils.numberWithCommas(this.tweenedPledgedTotal.toFixed(0));
    },
    animatedPledgedMinTotal: function() {
      return utils.numberWithCommas(this.tweenedPledgedMinTotal.toFixed(0));
    },
    animatedPledgedMaxTotal: function() {
      return utils.numberWithCommas(this.tweenedPledgedMaxTotal.toFixed(0));
    },
    animatedRecoveredTotal: function() {
      return utils.numberWithCommas(this.tweenedRecoveredTotal.toFixed(0));
    },
    animatedIndivsTested: function() {
      return utils.numberWithCommas(this.tweenedIndivsTested.toFixed(0));
    },
    animatedIndivsTestedPositive: function() {
      return utils.numberWithCommas(
        this.tweenedIndivsTestedPositive.toFixed(2)
      );
    },
    authenticated() {
      return this.user.loggedIn;
    }
  },
  watch: {
    casesTotal: function(newValue) {
      gsap.to(this.$data, { duration: 1.3, tweenedCasesTotal: newValue });
    },
    deathsTotal: function(newValue) {
      gsap.to(this.$data, { duration: 1.3, tweenedDeathsTotal: newValue });
    },
    onHandTotal: function(newValue) {
      gsap.to(this.$data, { duration: 1.3, tweenedOnHandTotal: newValue });
    },
    pledgedTotal: function(newValue) {
      gsap.to(this.$data, { duration: 1.3, tweenedPledgedTotal: newValue });
    },
    pledgedMinTotal: function(newValue) {
      gsap.to(this.$data, { duration: 1.3, tweenedPledgedMinTotal: newValue });
    },
    pledgedMaxTotal: function(newValue) {
      gsap.to(this.$data, { duration: 1.3, tweenedPledgedMaxTotal: newValue });
    },
    recoveredTotal: function(newValue) {
      gsap.to(this.$data, { duration: 1.3, tweenedRecoveredTotal: newValue });
    },
    indivsTested: function(newValue) {
      gsap.to(this.$data, { duration: 1.3, tweenedIndivsTested: newValue });
    },
    indivsTestedPositive: function(newValue) {
      gsap.to(this.$data, {
        duration: 1.3,
        tweenedIndivsTestedPositive: newValue
      });
    }
  },
  methods: {
    navigateToLogin() {
      this.$router.push("/login");
    },
    navigateToAddTestKit() {
      this.$router.push("/kits/new");
    },
    navigateToEditTestKit(item) {
      let key = item[".key"];
      this.$router.push("/kits/edit/" + key);
    }
  },
  mounted() {
    // this.isFetching = true;
    // db.collection("stats-main")
    //   .doc("MAIN_STATS_ID")
    //   .onSnapshot(doc => {
    //     const data = doc.data();
    //     this.onHandTotal = data.testKitsOnHand;
    //     this.pledgedMinTotal = data.testKitsPledgedMin;
    //     this.pledgedMaxTotal = data.testKitsPledgedMax;
    //     this.pledgedTotal = this.pledgedMaxTotal;
    //     this.usesPledgedRange =
    //       data.testKitsPledgedMax > data.testKitsPledgedMin;
    //   });
    db.collection("stats-main")
      .doc("EXTERNAL_STATS_ID")
      .onSnapshot(doc => {
        this.isFetching = false;
        const data = doc.data();
        this.casesTotal = data.totalCases;
        this.deathsTotal = data.deaths;
        this.recoveredTotal = data.recovered;
        this.indivsTested = data.indivsTested;
        this.indivsTestedPositive =
          (data.indivsTestedPositive / this.indivsTested) * 100;
      });
    auth.onAuthStateChanged(user => {
      if (user) {
        this.user.loggedIn = true;
        this.user.data = user;
      } else {
        this.user.loggedIn = false;
        this.user.data = {};
      }

      this.tableHeaders = user ? this.headers : this.headers_not_authenticated;
    });
  }
};
</script>

<style>
.container {
  z-index: 1;
}
.top-content {
  color: white;
  padding-bottom: 150px;
  position: relative;
  z-index: 1;
  background-image: url("~@/assets/header_bg_400h.jpg");
  background-color: #880e4f;
  background-position: bottom center;
  background-size: cover;
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
  margin-top: -22px;
  font-size: 1.6em;
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
.table-title {
  font-size: 0.85em;
  font-weight: 600;
  margin-right: 20px;
  margin-bottom: 4px;
  text-transform: uppercase;
  color: #880e4f;
}

/* Large Screen */
@media screen and (max-width: 1280px) {
  .top-content .figures-container {
    text-align: center;
  }
}

/* Medium Screen */
@media screen and (max-width: 960px) {
  .top-content .figures-main.figures-container .figure {
    font-size: 3em;
    font-weight: 600;
  }
  .top-content .figures-main.figures-container .figure {
    font-size: 3.5em;
    font-weight: 600;
  }
  .top-content .figures-main.figures-container .label {
    margin-top: -20px;
    font-size: 1.3em;
    text-transform: uppercase;
  }
  .top-content .figures-container .figure {
    font-size: 2em;
    font-weight: 600;
  }
  .top-content .figures-container {
    text-align: center;
  }
}

/* Small Screen */
@media screen and (max-width: 600px) {
  .top-content .figures-main.figures-container .figure {
    font-size: 2em;
    font-weight: 600;
  }
  .top-content .figures-main.figures-container .figure {
    font-size: 2.5em;
    font-weight: 600;
  }
  .top-content .figures-main.figures-container .label {
    margin-top: -13px;
    font-size: 1.3em;
    text-transform: uppercase;
  }
  .top-content .figures-container .figure {
    font-size: 1.8em;
    font-weight: 600;
  }
  .top-content .figures-container {
    text-align: center;
  }
  #table-container {
    margin-top: -130px !important;
  }
}
.tabs {
  margin-top: 15px;
}
#table-container {
  /* margin: 20px 5%; */
  margin-top: -120px;
  margin-bottom: 70px;
  z-index: 1;
  position: relative;
  background-color: transparent;
}
.search-field {
  margin-top: 0px !important;
  padding-top: 0px !important;
  margin-bottom: 4px !important;
}
.new-entry-button {
  margin-left: 20px;
}
</style>