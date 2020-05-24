<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-container>
          The Philippines is currently rank
          <strong>{{ rankingsInfo.rankingSEA }}</strong>
          out of
          <strong>{{ rankingsInfo.totalSEA }}</strong>
          countries in the Southeast Asia region that have released data on the number of tests conducted in their respective countries. The non-inclusion of some countries mean that no data on tests conducted per 1,000 individuals are not available from their countries.
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <div class="table-card">
          <iframe :src="graphUrl" style="width: 100%; height: 600px; border: 3px none;"></iframe>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "TestingInfoTab",
  props: ["rankingsInfo"],
  data() {
    return {
      date: new Date().toISOString().slice(0, 10),
      graphUrl:
        "https://ourworldindata.org/grapher/full-list-cumulative-total-tests-per-thousand?time=..&country=IDN+MYS+MMR+PHL+SGP+THA+BRN+LAO+TLS+KHM+VNM"
    };
  }
};
</script>

<style>
.table-card {
  padding: 20px;
}
</style>