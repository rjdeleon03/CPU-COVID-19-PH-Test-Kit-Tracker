<template>
  <div>
    <h1>Create New Entry</h1>
    <div>
      <input type="text" v-model="newReptile" @keyup.enter="addReptile" />
      <button @click="addReptile">
        Add Reptile
      </button>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/init";
export default {
  name: "NewEntry",
  components: {},
  data() {
    return {
      newReptile: ""
    };
  },
  dao() {
    return {
      reptiles: db.collection("kits")
    };
  },
  methods: {
    addReptile() {
      console.log("Hello!");
      db.collection("kits").add({
        name: this.newReptile,
        timestamp: new Date()
      });
    }
  }
};
</script>

<style></style>
