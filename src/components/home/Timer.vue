<template>
  <div id="clock">
    <p>
      AS OF
      <span>{{ date }} {{ time }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "Timer",
  data() {
    return {
      date: "",
      time: "",

      week: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ]
    };
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      const date = new Date();
      const options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        seconds: "numeric"
      };
      const time = new Intl.DateTimeFormat("en-US", options).format(date);
      console.log(time);

      var cd = new Date();
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2) +
        ",";
    },
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    }
  }
};
</script>

<style>
#clock p {
  font-size: 1.3em;
  margin-top: 10px;
}
#clock p span {
  font-weight: 700;
}
</style>