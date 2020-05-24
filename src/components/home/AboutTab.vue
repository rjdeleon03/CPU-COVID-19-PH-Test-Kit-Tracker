<template>
  <v-container id="about">
    <v-card min-height="200">
      <v-card-text>
        <p>
          This website aims to consolidate and present data regarding the state of COVID-19 PH testing in the Philippines, in line with the call for legitimate
          <strong>#MassTestingNowPH</strong>. We, members and volunteers of
          <strong>AGHAM - Advocates of Science and Technology for the People</strong> and
          <strong>Computer Professionals' Union (CPU)</strong>, truly believe that mass testing is vital in winning the battle against COVID-19.
        </p>
        <p>
          Overall statistics are obtained from the Department of Health (DOH) via the
          <a href="https://bit.ly/DataDropPH" target="_">NCOVPH API</a> while data on testing centers in the Philippines are taken directly from the
          <a
            href="https://bit.ly/DataDropPH"
            target="_"
          >DOH Data Drop</a>. Worldwide testing statistics and charts, on the other hand, are gathered from the
          <a
            href="https://ourworldindata.org/coronavirus-data"
            target="_"
          >Our World in Data</a> site. These information are monitored and updated regularly.
        </p>
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
#about .v-card.card-with-min-height {
  min-height: 200px !important;
}
</style>