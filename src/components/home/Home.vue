<template>
  <div>
    <!-- <div class="background"></div> -->
    <div class="top-content figures">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" xl="5" lg="5" sm="12">
            <div class="figures-main figures-container">
              <span class="figure">{{animatedCasesTotal}}</span>
              <p class="label">Cases</p>
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
              <span class="figure" v-else>{{animatedPledgedMinTotal}} ~ {{animatedPledgedMaxTotal}}</span>
              <p class="label">Test Kits (Pledged & On-Hand)</p>
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
    <v-container id="table-container">
      <v-card>
        <v-card-title>
          <span class="table-title">Test Kits</span>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            color="pink darken-4"
            single-line
            hide-details
            class="search-field"
          ></v-text-field>
          <v-btn
            v-if="authenticated"
            dark
            class="mb-2 new-entry-button"
            @click="navigateToAddTestKit()"
            color="amber darken-4"
          >New Entry</v-btn>
          <!-- <v-btn v-else dark class="mb-2" @click="navigateToLogin()" color="amber darken-4">Login</v-btn> -->
        </v-card-title>
        <v-data-table
          v-if="authenticated"
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
        <v-data-table
          v-else
          :headers="headers_not_authenticated"
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

    <!-- Display dialog when loading -->
    <ProgressDialog :isLoading="isFetching" :loadingMessage="fetchingMessage" />
  </div>
</template>

<script>
import gsap from "gsap";
import { auth, db } from "@/firebase/init";
import ProgressDialog from "@/components/dialog/ProgressDialog.vue";
export default {
  name: "Home",
  components: { ProgressDialog },
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

      // Table data
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
        { text: "Actions", value: "actions", align: "end", sortable: false }
      ],
      headers_not_authenticated: [
        {
          text: "Source",
          align: "start",
          value: "source"
        },
        { text: "Date Received", value: "date_received", align: "end" },
        { text: "Units Pledged", value: "units_pledged_max", align: "end" },
        { text: "Units On-Hand", value: "units_on_hand", align: "end" },
        { text: "Units Used", value: "units_used", align: "end" }
      ],
      kits: []
    };
  },
  computed: {
    animatedCasesTotal: function() {
      return this.numberWithCommas(this.tweenedCasesTotal.toFixed(0));
    },
    animatedDeathsTotal: function() {
      return this.numberWithCommas(this.tweenedDeathsTotal.toFixed(0));
    },
    animatedOnHandTotal: function() {
      return this.numberWithCommas(this.tweenedOnHandTotal.toFixed(0));
    },
    animatedPledgedTotal: function() {
      return this.numberWithCommas(this.tweenedPledgedTotal.toFixed(0));
    },
    animatedPledgedMinTotal: function() {
      return this.numberWithCommas(this.tweenedPledgedMinTotal.toFixed(0));
    },
    animatedPledgedMaxTotal: function() {
      return this.numberWithCommas(this.tweenedPledgedMaxTotal.toFixed(0));
    },
    animatedUsedTotal: function() {
      return this.numberWithCommas(this.tweenedUsedTotal.toFixed(0));
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
  firestore() {
    return {
      kits: db.collection("kits").orderBy("timestamp")
    };
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
    },
    numberWithCommas(x) {
      if (!x) return "0";
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    deleteTestKit() {}
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
  color: white;
  padding-bottom: 150px;
  position: relative;
  z-index: 1;
  background-image: url("~@/assets/header_bg_400h.png");
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
    font-size: 1.5em;
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
    margin-top: -15px;
    font-size: 1.5em;
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
    margin-top: -190px !important;
  }
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
  margin-top: -170px;
  margin-bottom: 70px;
  z-index: 1;
  position: relative;
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