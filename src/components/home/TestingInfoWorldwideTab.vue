<template>
  <v-container>
    <v-card>
      <div class="table-card">
        <!-- <iframe
          src="https://ourworldindata.org/grapher/full-list-cumulative-total-tests-per-thousand?time=latest&country=IDN+MYS+MMR+PHL+SGP+THA+USA+VNM+KOR+ARG+BHR+BEL+BGR+COL+CUB+ECU+ETH+DEU+GRC+ISL+ISR+JPN+KEN+LUX+MAR+NLD+NOR+PRY+POL+ROU+SAU+SVN+ESP+TWN+TUN+UKR+AUS+BGD+BOL+CAN+CRI+CZE+SLV+FIN+GHA+HKG+IND+IRN+ITA+Japan%2C%20tests%20performed+LVA+PAK+NZL+PER+PRT+RUS+SEN+Singapore%2C%20swabs%20tested+ZAF+SWE+TUR+GBR+United%20States%2C%20inconsistent%20units%20(COVID%20Tracking%20Project)+ZWE+AUT+BLR+BRA+CHL+HRV+DNK+EST+FRA+Ghana%2C%20samples%20tested+HUN+India%2C%20people%20tested+IRL+Italy%2C%20people%20tested+KAZ+LTU+MEX+NPL+NGA+PAN+QAT+RWA+SRB+SVK+CHE+Thailand%2C%20people%20tested+UGA+United%20Kingdom%2C%20tests%20performed+URY"
          style="width: 100%; height: 2000px; border: 0px none;"
        ></iframe>-->
        <iframe
          src="https://ourworldindata.org/grapher/full-list-cumulative-total-tests-per-thousand?time=latest&country=CUB+JPN+KOR+ISL+BHR+LUX+LTU+DNK+IDN+MYS+MMR+PHL+SGP+THA+VNM+BRN+LAO+TLS+KHM"
          style="width: 100%; height: 700px; border: 0px none;"
        ></iframe>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "TestingInfoWorldwideTab",
  data() {}
};
</script>

<style>
.table-card {
  padding: 20px;
}
</style>