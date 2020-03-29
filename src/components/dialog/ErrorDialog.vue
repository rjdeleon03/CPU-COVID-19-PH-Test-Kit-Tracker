<template>
  <v-dialog v-model="isError" max-width="350" persistent>
    <v-card>
      <v-card-title class="headline">Operation Failed</v-card-title>

      <v-card-text>
        <p align="left">{{errorMessage}}</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="amber darken-4" text @click="callback">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ErrorDialog",
  components: {},
  props: ["errorMessage", "isError", "callback"],
  data() {
    return {};
  },
  methods: {
    redirectToHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>