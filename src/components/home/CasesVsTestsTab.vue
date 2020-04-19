<template>
  <v-container id="cases-vs-tests-tab">
    <v-card min-height="200">
      <v-card-text>
        <iframe
          src="https://ourworldindata.org/grapher/covid-19-total-confirmed-cases-vs-total-tests-conducted?country=PHL"
          style="width: 100%; height: 600px; border: 0px none;"
        ></iframe>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "AboutTab",
  components: {},
  props: ["authenticated"],
  data() {
    return {};
  }
};
</script>

<style>
#cases-vs-tests-tab .v-card.card-with-min-height {
  min-height: 200px !important;
}
</style>