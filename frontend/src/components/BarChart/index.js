import {
  Line,
} from 'vue-chartjs';

import {
  mapGetters
} from 'vuex';
import './index.css';
// import moment from 'moment';

export default {
  extends: Line,
  data() {
    return {
      colors: []
    };
  },
  computed: {
    ...mapGetters([
      'getstocktimefilter'
    ]),
    datasets: function() {
      return this.$store.getters.getStockMonthValues;
    },
    labels: function() {
      return this.$store.getters.getStockMonthLabels;
    },
    newsymbol: function() {
      return this.$store.getters.getnewsymbols;
    },
    stocktimefilter: function() {
      var res = this.$store.getters.getstocktimefilter;
      console.log("stocktimefilter", res);
      return res;
    },
    config: function() {

      let labels = this.labels;
      let datasets = [];
      let stockMonthValues = this.datasets;
      let colorsSymbols = this.$store.getters.getStockcolors;
      let activeStockTimeFilter = this.getstocktimefilter;
      Object.keys(stockMonthValues).forEach((value, index) => {
        let colorDataset = colorsSymbols[value];
        this.colors.push(colorDataset);
        datasets.push({
          label: value,
          data: stockMonthValues[value].map(function(element) {
            return element[activeStockTimeFilter];
          }),
          borderColor: colorDataset,
          type: 'line',
          pointRadius: 2,
          fill: true,
          lineTension: 0,
          borderWidth: 2,
        });
      });
      let self = this;
      return {
        type: 'line',
        data: {
          labels,
          datasets
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              type: 'time',
              distribution: 'series',
              ticks: {
                source: 'labels',
                callback: function(label, index, labels) {
                  if (labels.length > 100) {
                    if (index % 3 === 0) {
                      return label;
                    }
                    return "";
                  } else {
                    if (index % 2 === 0) {
                      return label;
                    }
                    return label;
                  }
                }
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: activeStockTimeFilter + ' price ($)'
              }
            }]
          },
          tooltips: {
            enabled: true,
            mode: 'index',
            borderWidth: 2,
            borderColor: 'rgba(33, 150, 243, 0.75)',
            bodySpacing: 10,
            titleSpacing: 10,
            titleFontSize: 16,
            caretSize: 10,
            cornerRadius: 1,
            xPadding: 10,
            yPadding: 10,
            labelColor: "rgba(0, 0, 0, 0.9)",
            titleFontColor: "rgba(0, 0, 0, 0.9)",
            // backgroundColor: "rgba(33, 150, 243, 0.1)",
            backgroundColor: "white",

            // custom: this.customTooltips,
            callbacks: {
              labelColor: function(tooltipItem, chart) {
                return {
                  // borderColor: "red",
                  backgroundColor: self.colors[tooltipItem.datasetIndex],
                  borderColor: "rgba(0, 0, 0, 0.9)" // self.colors[tooltipItem.datasetIndex],
                };
              },
              labelTextColor: function(tooltipItem, chart) {
                return "rgba(0, 0, 0, 0.9)";
              }
            }
          }
        }
      };
    },
  },
  methods: {
    customTooltips: function(tooltip) {
      console.log("custom tooltips");
      // Tooltip Element
      var tooltipEl = document.getElementById('chartjs-tooltip');

      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.innerHTML = '<table></table>';
        this.$data._chart.canvas.parentNode.appendChild(tooltipEl);
      }

      // Hide if no tooltip
      if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      // Set caret Position
      tooltipEl.classList.remove('above', 'below', 'no-transform');
      if (tooltip.yAlign) {
        tooltipEl.classList.add(tooltip.yAlign);
      } else {
        tooltipEl.classList.add('no-transform');
      }

      function getBody(bodyItem) {
        return bodyItem.lines;
      }

      // Set Text
      if (tooltip.body) {
        var titleLines = tooltip.title || [];
        var bodyLines = tooltip.body.map(getBody);

        var innerHtml = '<thead>';

        titleLines.forEach(function(title) {
          innerHtml += '<tr><th>' + title + '</th></tr>';
        });
        innerHtml += '</thead><tbody>';

        bodyLines.forEach(function(body, i) {
          var colors = tooltip.labelColors[i];
          var style = 'background:' + colors.backgroundColor;
          style += '; border: solid 2px ' + colors.borderColor;
          style += '; border-width: 2px';
          var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
          innerHtml += '<tr><td>' + span + body + '</td></tr>';
        });
        innerHtml += '</tbody>';

        var tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
      }

      var positionY = this.$data._chart.canvas.offsetTop;
      var positionX = this.$data._chart.canvas.offsetLeft;

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.left = positionX + tooltip.caretX + 'px';
      tooltipEl.style.top = positionY + tooltip.caretY + 'px';
      tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
      tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
      tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
      tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
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
    config: function(val) {

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
