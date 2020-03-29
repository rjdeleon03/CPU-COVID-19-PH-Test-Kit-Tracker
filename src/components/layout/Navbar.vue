<template>
  <div id="navbar">
    <v-app-bar app color="pink darken-4" dark>
      <div class="d-flex align-center">
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />-->

        <h3>COVID-19 PH ATM Tracker</h3>
      </div>
      <v-spacer></v-spacer>

      <v-btn icon @click="goToEditStats">
        <v-icon>mdi-chart-line</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>

      <!-- <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>-->
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    goToEditStats() {
      this.$router.push("/stats/update");
    }
  }
};
</script>

<style>
div#navbar {
  background-color: #581845;
}
div#navbar h3 {
  text-align: start;
}
</style>