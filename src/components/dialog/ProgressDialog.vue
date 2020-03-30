<template>
  <!-- Display dialog when loading -->
  <v-dialog v-model="isLoading" max-width="350" persistent>
    <v-card>
      <v-card-text>
        <div class="dialog-contents">
          <v-progress-circular :size="100" :width="7" color="amber darken-4" indeterminate></v-progress-circular>
          <p>{{loadingMessage}}</p>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ProgressDialog",
  components: {},
  props: ["loadingMessage", "isLoading"],
  data() {
    return {};
  }
};
</script>

<style>
</style>