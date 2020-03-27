<template>
  <div>
    <h1>Home</h1>
    <div align="center">
      <table>
        <tr>
          <th>Quantity</th>
          <th>Used</th>
          <th>Source</th>
          <th>On-Hand?</th>
        </tr>
        <tr v-for="(kit, idx) in kits" :key="idx">
          <td>{{ kit.units_pledged_max }}</td>
          <td>{{ kit.units_used }}</td>
          <td>{{ kit.source }}</td>
          <td>{{ kit.units_on_hand }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/init";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      kits: []
    };
  },
  firestore() {
    return {
      kits: db.collection("kits").orderBy("timestamp")
    };
  }
};
</script>

<style>
</style>