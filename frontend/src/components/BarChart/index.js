import {
  Line,
} from 'vue-chartjs';

/* import {
  mapGetters
} from 'vuex'; */

import randomColor from 'randomcolor';
// import moment from 'moment';

export default {
  extends: Line,
  computed: {
    datasets: function() {
      return this.$store.getters.getStockMonthValues;
    },
    labels: function() {
      return this.$store.getters.getStockMonthLabels;
    },
    newsymbol: function() {
      return this.$store.getters.getnewsymbols;
    },
    config: function() {

      let labels = this.labels;
      let datasets = [];
      let stockMonthValues = this.datasets;
      Object.keys(stockMonthValues).forEach((value) => {
        let colorDataset = randomColor();
        datasets.push({
          label: value,
          data: stockMonthValues[value].map(element =>
            element["4. close"]),
          borderColor: colorDataset,
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
          maintainAspectRatio: false,
          responsive: true,
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

  mounted() {
    console.log("bar mounted");
    if (this.$data._chart) {
      this.$data._chart.destroy();
    }
    this.renderChart({
      labels: this.config.data.labels,
      datasets: this.config.data.datasets
    }, this.config.options, );
  },
  watch: {
    labels: function(oldLabels, newLabels) {
      console.log("oldLabels", oldLabels);
      console.log("newLabels", newLabels);

    },
    datasets: function(newDataSet, oldDataSet) {
      console.log("newDataSet", newDataSet);
      console.log("oldDatset", oldDataSet);
    },
    newsymbol: function(newsymbol, oldsymbol) {
      console.log("newsymbol", newsymbol);
      console.log("oldsymbol", oldsymbol);

    },
    config: function(val) {
      console.log("val config", val);
      console.log("width ", this.width);
      console.log("styles", this.styles);
      if (this.$data._chart) {
        this.$data._chart.destroy();

        this.renderChart({
          labels: val.data.labels,
          datasets: val.data.datasets
        }, val.options);
      }
    }
  }
};
