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
      ],
      months: [
        {
          abbreviation: "Jan",
          name: "January"
        },
        {
          abbreviation: "Feb",
          name: "February"
        },
        {
          abbreviation: "Mar",
          name: "March"
        },
        {
          abbreviation: "Apr",
          name: "April"
        },
        {
          abbreviation: "May",
          name: "May"
        },
        {
          abbreviation: "Jun",
          name: "June"
        },
        {
          abbreviation: "Jul",
          name: "July"
        },
        {
          abbreviation: "Aug",
          name: "August"
        },
        {
          abbreviation: "Sep",
          name: "September"
        },
        {
          abbreviation: "Oct",
          name: "October"
        },
        {
          abbreviation: "Nov",
          name: "November"
        },
        {
          abbreviation: "Dec",
          name: "December"
        }
      ]
    };
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      var cd = new Date();
      this.time = cd.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      this.date =
        this.months[cd.getMonth()].abbreviation.toUpperCase() +
        " " +
        this.zeroPadding(cd.getDate(), 2) +
        " " +
        this.zeroPadding(cd.getFullYear(), 4) +
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
#clock {
  margin-top: -20px;
}
#clock p {
  font-size: 1.3em;
  margin-top: 10px;
}
</style>