<template>
  <div>
    <h1>Home</h1>
    <div align="center">
      <table id="tbl-test-kits-id" border="1">
        <thead>
          <th colspan="5">COVID-19 PH TEST KITS</th>
        </thead>
        <tbody>
          <tr>
            <th>Source</th>
            <th>Nature of Acquisition</th>
            <th>Units On-hand</th>
            <th>Units Pledged</th>
            <th>Units Used</th>
          </tr>
          <tr>
            <td>UP NIH</td>
            <td>Research</td>
            <td align="center">3,000</td>
            <td align="center">0</td>
            <td align="center">0</td>
          </tr>
        </tbody>
      </table>
      <table id="tbl-test-kits-summary-id" border="1">
        <thead>
          <th colspan="2">SUMMARY</th>
        </thead>
        <tbody>
          <tr>
            <td>Total Units On-hand</td>
            <td align="center">3,000</td>
          </tr>
          <tr>
            <td>Total Units Pledged</td>
            <td align="center">0</td>
          </tr>
          <tr>
            <td>Total Units Used</td>
            <td align="center">0</td>
          </tr>
          <tr>
            <td>Remaining Units Available For Use</td>
            <td align="center">3,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  }
};
</script>

<style>
</style>