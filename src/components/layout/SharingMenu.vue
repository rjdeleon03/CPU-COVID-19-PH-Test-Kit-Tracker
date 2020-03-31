<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-facebook</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="drawer-text-right">
          <social-sharing :url="baseUrl" inline-template>
            <network network="facebook">Share to Facebook</network>
          </social-sharing>
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-twitter</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="drawer-text-right">
          <social-sharing :url="baseUrl" inline-template>
            <network network="twitter">Share to Twitter</network>
          </social-sharing>
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-reddit</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="drawer-text-right">
          <social-sharing :url="baseUrl" inline-template>
            <network network="reddit">Share to Reddit</network>
          </social-sharing>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "SharingMenu",
  components: {},
  data() {
    return {
      baseUrl: window.location.origin
    };
  }
};
</script>

<style>
/* .share-content div {
  cursor: pointer;
} */
.drawer-text-right span {
  cursor: pointer;
}
</style>