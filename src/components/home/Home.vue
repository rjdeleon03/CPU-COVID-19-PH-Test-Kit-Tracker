<template>
  <div>
    <div class="background"></div>
    <div class="container">
      <div class="top-content">
        <table>
          <tr>
            <td colspan="2">
              <div class="figures-main figures-container">
                <span class="figure">1,000,000</span>
                <p class="label">Cases</p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="figures-container">
                <span class="figure">12,345</span>
                <p class="label">Deaths</p>
              </div>
            </td>
            <td>
              <div class="figures-container">
                <span class="figure">4,983,277</span>
                <p class="label">Tests Conducted</p>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div id="table-container">
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              color="pink darken-4"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>

            <v-btn
              dark
              class="mb-2"
              @click="navigateToAddTestKit()"
              color="amber darken-4"
            >New Entry</v-btn>
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
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/init";
export default {
  name: "Home",
  components: {},
  data() {
    return {
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
    deleteTestKit() {}
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
.top-content table .figures-container {
  margin: 10px 20px;
  text-align: right;
}
.top-content table .figures-main.figures-container {
  text-align: right;
}
.top-content table .figures-main.figures-container .figure {
  font-size: 4em;
  font-weight: 600;
}
.top-content table .figures-main.figures-container .figure {
  font-size: 4.5em;
  font-weight: 600;
}
.top-content table .figures-main.figures-container .label {
  margin-top: -25px;
  font-size: 2em;
  text-transform: uppercase;
}
.top-content table .figures-container .figure {
  font-size: 3em;
  font-weight: 600;
}
.top-content table .figures-container .label {
  margin-top: -10px;
  font-size: 1em;
  text-transform: uppercase;
}
#table-container {
  margin: 20px 10%;
  z-index: 1;
  position: relative;
}
</style>