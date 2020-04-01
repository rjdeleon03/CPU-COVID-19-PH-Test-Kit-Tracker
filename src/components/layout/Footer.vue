<template>
  <!-- <v-footer dark padless>
    <v-col class="text-center pink darken-4" cols="12">
      {{ new Date().getFullYear() }} —
      <strong>AGHAM, Computer Professionals' Union</strong>
    </v-col>
  </v-footer>-->

  <v-footer padless>
    <v-card flat tile class="pink darken-4 white--text text-center footer-card">
      <v-card-text>
        <span class="sharing-text mx-1">AGHAM</span>
        <v-btn
          v-for="icon in icons_agham"
          :key="icon.id"
          class="mx-1 white--text sharing-btn"
          icon
          :href="icon.url"
          target="_blank"
        >
          <v-icon size="24px">{{ icon.icon }}</v-icon>
        </v-btn>
        <span class="sharing-text mx-1">|</span>
        <span class="sharing-text mx-1">CPU</span>
        <v-btn
          v-for="icon in icons_cpu"
          :key="icon.id"
          class="mx-1 white--text sharing-btn"
          icon
          :href="icon.url"
          target="_blank"
        >
          <v-icon size="24px">{{ icon.icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        For inquiries, you may reach us through our social media accounts or via email at
        <a
          href="mailto:abc@example.com"
        >abc@example.com</a> or
        <a href="mailto:secretariat@cp-union.com">secretariat@cp-union.com</a>.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text grey darken-4">
        {{ new Date().getFullYear() }} —
        <strong>AGHAM, Computer Professionals' Union</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      icons_agham: [
        {
          id: 1,
          icon: "mdi-facebook",
          url: "https://fb.me"
        },
        { id: 2, icon: "mdi-twitter", url: "https://twitter.com" }
      ],
      icons_cpu: [
        {
          id: 3,
          icon: "mdi-facebook",
          url: "http://fb.com/cpunion"
        },
        { id: 4, icon: "mdi-twitter", url: "https://twitter.com/CP_Union" }
      ]
    };
  }
};
</script>

<style>
.sharing-text {
  color: white;
  font-size: 1.2em;
}
.sharing-btn {
  margin-top: -3px;
}
.footer-card {
  width: 100%;
}
</style>