<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-container>
          The Philippines is currently rank
          <strong>{{ rankingsInfo.rankingWorldWide }}</strong>
          out of
          <strong>{{ rankingsInfo.totalWorldWide }}</strong>
          countries in the world that have released data on the number of tests conducted in their respective countries.
          <br />
          <br />
          The chart below presents the number of tests per 1,000 people in the Philippines in comparison with the five leading countries ({{topCountriesString}}) in terms of the said metric along with South Korea, Japan, Cuba, and neighboring Southeast Asian countries.
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <div class="table-card">
          <iframe :src="graphUrl" style="width: 100%; height: 700px; border: 0px none;"></iframe>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "TestingInfoWorldwideTab",
  props: ["rankingsInfo"],
  data() {
    return {
      graphUrl: "",
      topCountriesString: ""
    };
  },
  mounted() {
    var defaultGraphUrl =
      "https://ourworldindata.org/grapher/full-list-cumulative-total-tests-per-thousand?time=..&country=CUB+JPN+KOR+IDN+MYS+MMR+PHL+SGP+THA+VNM+BRN+LAO+TLS+KHM";

    var i = 0;
    this.rankingsInfo.topFiveWorldWide.forEach(country => {
      defaultGraphUrl += "+" + country.isocode;

      if (i > 0) {
        this.topCountriesString += ", ";
      }
      this.topCountriesString += country.country;

      i++;
    });
    this.graphUrl = defaultGraphUrl;
    console.log(this.rankingsInfo);
  }
};
</script>

<style>
.table-card {
  padding: 20px;
}
</style>