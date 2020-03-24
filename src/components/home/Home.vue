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
        <tfoot>
          <tr>
            <td></td>
            <td align="center">Total</td>
            <td align="center">3,000</td>
            <td align="center">0</td>
            <td align="center">0</td>
          </tr>
          <tr>
            <td></td>
            <td align="center">Total (On-hand + Pledged)</td>
            <td align="center" colspan="3">3,000</td>
          </tr>
        </tfoot>
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