<template>
  <v-dialog v-model="isDisplayed" max-width="350" persistent>
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>

      <v-card-text>
        <p align="left">{{message}}</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="amber darken-4" text @click="negativeCallback">NO</v-btn>
        <v-btn color="amber darken-4" text @click="callback">YES</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "GenericInfoDialog",
  components: {},
  props: ["title", "message", "isDisplayed", "callback", "negativeCallback"],
  data() {
    return {};
  }
};
</script>

<style>
</style>