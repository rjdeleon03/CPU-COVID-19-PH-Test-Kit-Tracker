<template>
  <v-footer dark padless>
    <v-col class="text-center pink darken-4" cols="12">
      {{ new Date().getFullYear() }} —
      <strong>AGHAM, Computer Professionals' Union</strong>
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