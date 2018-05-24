import {
  Bar
} from 'vue-chartjs';
import moment from 'moment';

export default {
  extends: Bar,
  computed: {
    size: function() {
      return {
        width: 1000,
        height: 300
      };
    },
    config: function() {
      var dateFormat = 'MMMM DD YYYY';
      var date = moment('April 01 2017', dateFormat);
      var data = [this.randomBar(date, 30)];
      var labels = [date];
      while (data.length < 60) {
        date = date.clone().add(1, 'd');
        if (date.isoWeekday() <= 5) {
          data.push(this.randomBar(date, data[data.length - 1].y));
          labels.push(date);
        }
      }

      return {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'CHRT - Chart.js Corporation',
            data: data,
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
          }]
        },
        options: {
          scales: {
            xAxes: [{
              type: 'time',
              distribution: 'series',
              ticks: {
                source: 'labels'
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
    // Overwriting base render method with actual data.
    /* this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [{
        label: 'GitHub Commits',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
      }]
    }); */
  }
};
