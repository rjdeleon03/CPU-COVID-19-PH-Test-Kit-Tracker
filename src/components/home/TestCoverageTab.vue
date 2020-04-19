<template>
  <v-container id="test-coverage-tab">
    <v-card min-height="200">
      <v-card-text>
        <iframe
          src="https://ourworldindata.org/grapher/total-tests-per-thousand-since-per-cap-death-threshold?country=PHL"
          style="width: 100%; height: 600px; border: 0px none;"
        ></iframe>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "TestCoverageTab",
  components: {},
  props: ["authenticated"],
  data() {
    return {};
  }
};
</script>

<style>
#test-coverage-tab .v-card.card-with-min-height {
  min-height: 200px !important;
}
</style>