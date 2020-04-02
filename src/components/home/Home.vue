<template>
  <div>
    <div class="top-content figures">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" xl="5" lg="5" sm="12">
            <div class="figures-main figures-container">
              <span class="figure">{{animatedCasesTotal}}</span>
              <p class="label">Cases in the Philippines</p>
              <Timer />
            </div>
          </v-col>
        </v-row>
        <v-row justify="center" no-gutters>
          <v-col cols="12" lg="auto" md="6" sm="6">
            <div class="figures-container">
              <span class="figure">{{animatedDeathsTotal}}</span>
              <p class="label">Deaths</p>
            </div>
          </v-col>
          <v-col cols="12" lg="auto" md="6" sm="6">
            <div class="figures-container">
              <span class="figure">{{animatedUsedTotal}}</span>
              <p class="label">Test Kits (Used)</p>
            </div>
          </v-col>
          <v-col cols="12" lg="auto" md="6" sm="6">
            <div class="figures-container">
              <span class="figure">{{animatedOnHandTotal}}</span>
              <p class="label">Test Kits (On-Hand)</p>
            </div>
          </v-col>
          <v-col cols="12" lg="auto" md="6" sm="6">
            <div class="figures-container">
              <span class="figure" v-if="!usesPledgedRange">{{animatedPledgedTotal}}</span>
              <span class="figure" v-else>{{animatedPledgedMinTotal}}~{{animatedPledgedMaxTotal}}</span>
              <p class="label">Test Kits (Pledged & On-Hand)</p>
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

        <v-tab :key="items[0].tab">Test Kits</v-tab>
        <v-tab :key="items[1].tab">About</v-tab>
      </v-tabs>
    </div>

    <!-- Test kits table -->
    <v-tabs-items v-model="tab" id="table-container">
      <v-tab-item :key="items[0].tab">
        <TestKitsTable :authenticated="authenticated" />
      </v-tab-item>
      <v-tab-item :key="items[1].tab">
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
import ProgressDialog from "@/components/dialog/ProgressDialog.vue";
import TestKitsTable from "./TestKitsTable.vue";
import AboutTab from "./AboutTab.vue";
import Timer from "./Timer.vue";
export default {
  name: "Home",
  components: { ProgressDialog, TestKitsTable, AboutTab, Timer },
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

      usedTotal: 0,
      tweenedUsedTotal: 0,

      // Tabs
      tab: null,
      items: [
        { tab: "One", content: "Tab 1 Content" },
        { tab: "Two", content: "Tab 2 Content" }
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
    animatedUsedTotal: function() {
      return utils.numberWithCommas(this.tweenedUsedTotal.toFixed(0));
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
    usedTotal: function(newValue) {
      gsap.to(this.$data, { duration: 1.3, tweenedUsedTotal: newValue });
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
    this.isFetching = true;
    db.collection("stats-main")
      .doc("MAIN_STATS_ID")
      .onSnapshot(doc => {
        const data = doc.data();
        this.usedTotal = data.testKitsUsed;
        this.onHandTotal = data.testKitsOnHand;
        this.pledgedMinTotal = data.testKitsPledgedMin;
        this.pledgedMaxTotal = data.testKitsPledgedMax;
        this.pledgedTotal = this.pledgedMaxTotal;
        this.usesPledgedRange =
          data.testKitsPledgedMax > data.testKitsPledgedMin;
      });
    db.collection("stats-main")
      .doc("EXTERNAL_STATS_ID")
      .onSnapshot(doc => {
        this.isFetching = false;
        const data = doc.data();
        this.casesTotal = data.totalCases;
        this.deathsTotal = data.deaths;
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
  /* width: 100%;
  height: 100%; */
  z-index: 1;
  /* position: absolute;
  top: 0;
  left: 0;
  right: 0; */
}
.top-content {
  color: white;
  padding-bottom: 150px;
  position: relative;
  z-index: 1;
  background-image: url("~@/assets/header_bg_400h.png");
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