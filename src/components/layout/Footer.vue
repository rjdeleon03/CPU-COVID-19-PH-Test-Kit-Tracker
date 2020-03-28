<template>
  <!-- <v-footer dark padless>
    <v-card flat tile class="purple lighten-1 white--text text-center">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">Hello</v-card-text>

      <v-divider></v-divider>

      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Computer Professionals' Union</strong>
      </v-col>
    </v-card>
  </v-footer>-->

  <v-footer dark padless>
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} —
      <strong>Computer Professionals' Union</strong>
    </v-col>
    <v-divider red></v-divider>
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} —
      <strong>Computer Professionals' Union</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style>
v-footer {
  width: 100%;
}
</style>