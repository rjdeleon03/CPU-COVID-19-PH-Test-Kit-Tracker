<template>
  <v-dialog v-model="isSuccess" max-width="350" persistent>
    <v-card>
      <v-card-title class="headline">Operation Successful</v-card-title>

      <v-card-text>
        <p align="left">{{successMessage}}</p>
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
  name: "SuccessDialogWithCallback",
  components: {},
  props: ["successMessage", "isSuccess", "callback"],
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