import {
  Line,
} from 'vue-chartjs';

import {
  mapGetters
} from 'vuex';
// import moment from 'moment';

export default {
  extends: Line,
  data: function() {
    return { ...mapGetters({
        labels: 'getStockMonthLabels',
        datasets: 'getStockMonthValues'
      })
    };
  },
  computed: {
    size: function() {
      return {
        width: 800,
        height: 100
      };
    },

    config: function() {

      let labels = this.labels();
      let datasets = [];
      let stockMonthValues = this.datasets();
      Object.keys(stockMonthValues).forEach((value) => {
        datasets.push({
          label: value,
          data: stockMonthValues[value].map(element =>
            element["4. close"]),
          type: 'line',
          pointRadius: 2,
          fill: true,
          lineTension: 0,
          borderWidth: 2,
        });
      });
      return {
        type: 'line',
        data: {
          labels,
          datasets
        },
        options: {
          scales: {
            xAxes: [{
              type: 'time',
              distribution: 'series',
              ticks: {
                source: 'labels',
                callback: function(label, index, labels) {
                  if (labels.length > 100) {
                    if (index % 10 === 0) {
                      return label;
                    }
                    return "";
                  } else {
                    if (index % 5 === 0) {
                      return label;
                    }
                    return "";
                  }
                }
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Closing price ($)'
              }
            }]
          }
        }
      };
    },
  },
  methods: {
    randomNumber(min, max) {
      return Math.random() * (max - min) + min;
    },

    randomBar(date, lastClose) {
      var open = this.randomNumber(lastClose * 0.95, lastClose * 1.05);
      var close = this.randomNumber(open * 0.95, open * 1.05);
      return {
        t: date.valueOf(),
        y: close
      };
    }
  },

  mounted() {
    console.log("bar mounted");
    if (this.$data._chart) {
      this.$data._chart.destroy();
    }
    this.renderChart({
      labels: this.config.data.labels,
      datasets: this.config.data.datasets
    }, {
      ...this.config.options,
      responsive: true,
      maintainAspectRatio: false
    });
  },
  watch: {
    config: function(val) {
      console.log("val config", val);
      if (this.$data._chart) {
        this.$data._chart.destroy();

        this.renderChart({
          labels: val.data.labels,
          datasets: val.data.datasets
        }, {
          ...val.options,
          responsive: true,
          maintainAspectRatio: false
        });
      }
    }
  }
};
