<template>
  <div>
    <h1>Create New Entry</h1>
    <div>
      <input type="text" v-model="newReptile" @keyup.enter="addReptile" />
      <button @click="addReptile">Add Reptile</button>
    </div>
  </div>
</template>

<script>
// import { db } from "@/firebase/init";
// import test from "./test.json";
export default {
  name: "NewEntry",
  components: {},
  data() {
    return {
      seed: JSON.parse(),
      newReptile: ""
    };
  },
  methods: {
    addReptile() {
      console.log("Hello!");
    }
  }
};
</script>

<style></style>
