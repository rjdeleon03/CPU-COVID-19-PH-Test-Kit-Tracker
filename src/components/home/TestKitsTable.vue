<template>
  <v-container>
    <v-card>
      <v-card-title>
        <!-- <span class="table-title">Test Kits</span> -->
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
      </v-card-title>
      <v-data-table
        :headers="tableHeaders"
        :items="kits"
        :sort-desc="[false, true]"
        multi-sort
        :search="search"
      >
        <template v-slot:item.source="{ item }">
          <strong>{{ item.source }}</strong>
        </template>
        <template v-slot:item.actions="{ item }" v-if="authenticated">
          <v-icon small class="mr-2" @click="navigateToEditTestKit(item)">mdi-pencil</v-icon>
          <v-icon small @click="confirmDeletion(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <ConfirmationDialog
      :isDisplayed="forDeletion.isDeleteConfirm"
      :title="forDeletion.title"
      :message="forDeletion.message"
      :callback="deleteItem"
      :negativeCallback="cancelDeletion"
    />
  </v-container>
</template>

<script>
import { db } from "@/firebase/init";
import { natureOfAcquisition } from "../../constants";
import { utils } from "../../utils";
import ConfirmationDialog from "@/components/dialog/ConfirmationDialog.vue";
export default {
  name: "TestKitsTable",
  components: { ConfirmationDialog },
  props: ["authenticated"],
  data() {
    return {
      // Table data
      search: "",
      headers: [
        {
          text: "Source",
          align: "start",
          value: "source"
        },
        {
          text: "Acquired Through",
          value: "t_natureOfAcquisition",
          align: "start"
        },
        { text: "Date Received", value: "t_dateReceived", align: "end" },
        {
          text: "Units Pledged",
          value: "t_unitsPledged",
          align: "end",
          sortable: false
        },
        { text: "Units On-Hand", value: "t_unitsOnHand", align: "end" },
        { text: "Units Used", value: "t_unitsUsed", align: "end" },
        { text: "Actions", value: "actions", align: "end", sortable: false }
      ],
      headers_not_authenticated: [
        {
          text: "Source",
          align: "start",
          value: "source"
        },
        {
          text: "Acquired Through",
          value: "t_natureOfAcquisition",
          align: "start"
        },
        { text: "Date Received", value: "t_dateReceived", align: "end" },
        {
          text: "Units Pledged",
          value: "t_unitsPledged",
          align: "end",
          sortable: false
        },
        { text: "Units On-Hand", value: "t_unitsOnHand", align: "end" },
        { text: "Units Used", value: "t_unitsUsed", align: "end" }
      ],
      kits: [],

      // Deletion
      forDeletion: {
        isDeleteConfirm: false,
        item: null,
        title: "Delete Test Kit Entry",
        message: "Are you sure you want to delete this test kit entry?"
      }
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
      let key = item.id;
      this.$router.push("/kits/edit/" + key);
    },
    getNatureOfAcquisition(item) {
      return natureOfAcquisition[item.nature_of_acquisition];
    },
    getDateReceived(item) {
      if (!item.date_received || item.date_received === "") {
        {
          return "Not Yet Received";
        }
      }
      return item.date_received;
    },
    getUnitsPledged(item) {
      if (
        item.units_pledged_max > item.units_pledged_min &&
        item.units_pledged_min > 0
      ) {
        return (
          utils.numberWithCommas(item.units_pledged_min) +
          "~" +
          utils.numberWithCommas(item.units_pledged_max)
        );
      }
      return utils.numberWithCommas(item.units_pledged_max);
    },
    getUnitsOnHand(item) {
      return utils.numberWithCommas(item.units_on_hand);
    },
    getUnitsUsed(item) {
      return utils.numberWithCommas(item.units_used);
    },
    confirmDeletion(item) {
      this.forDeletion.item = item;
      this.forDeletion.isDeleteConfirm = true;
    },
    cancelDeletion() {
      this.forDeletion.item = null;
      this.forDeletion.isDeleteConfirm = false;
    },
    deleteItem() {
      let key = this.forDeletion.item.id;
      db.collection("kits")
        .doc(key)
        .delete();
      this.cancelDeletion();
    }
  },
  mounted() {
    this.isFetching = true;

    db.collection("stats-main")
      .doc("EXTERNAL_STATS_ID")
      .onSnapshot(doc => {
        this.isFetching = false;
        const data = doc.data();
        this.casesTotal = data.totalCases;
        this.deathsTotal = data.deaths;
      });

    var transformedKits = [];
    db.collection("kits")
      .orderBy("timestamp")
      .onSnapshot(snapshot => {
        snapshot.docs.forEach(kit => {
          const data = kit.data();
          data.id = kit.id;
          data.t_natureOfAcquisition = this.getNatureOfAcquisition(data);
          data.t_dateReceived = this.getDateReceived(data);
          data.t_unitsPledged = this.getUnitsPledged(data);
          data.t_unitsOnHand = this.getUnitsOnHand(data);
          data.t_unitsUsed = this.getUnitsUsed(data);
          transformedKits.push(data);
        });
        this.kits = transformedKits;
      });
  },
  computed: {
    tableHeaders: function() {
      return this.authenticated ? this.headers : this.headers_not_authenticated;
    }
  }
};
</script>

<style>
</style>