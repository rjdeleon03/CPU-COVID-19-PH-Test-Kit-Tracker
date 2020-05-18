<template>
  <v-container>
    <v-card>
      <div class="table-card">
        <iframe :src="graphUrl" style="width: 100%; height: 600px; border: 3px none;"></iframe>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "TestingInfoTab",
  data() {
    return {
      date: new Date().toISOString().slice(0, 10),
      graphUrl:
        "https://ourworldindata.org/grapher/full-list-cumulative-total-tests-per-thousand?time=latest&country=IDN+MYS+MMR+PHL+SGP+THA+VNM+BRN+LAO+TLS+KHM"
    };
  }
};
</script>

<style>
.table-card {
  padding: 20px;
}
</style>