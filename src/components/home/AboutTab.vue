<template>
  <v-container id="about">
    <v-card min-height="200">
      <v-card-text>
        <p>
          This website aims to consolidate and present data regarding the state of COVID-19 PH testing in the Philippines, in line with the call to implement
          <strong>#MassTestingNow</strong> in the Philippines. We, members and volunteers of
          <strong>AGHAM - Advocates of Science and Technology for the People</strong> and
          <strong>Computer Professionals' Union (CPU)</strong>, truly believe that mass testing is vital in winning the battle against COVID-19.
        </p>
        <p>The data presented in this website are gathered from the Department of Health (DOH) and various reliable sources on test kits donation and overall testing. These information are monitored and updated regularly.</p>
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