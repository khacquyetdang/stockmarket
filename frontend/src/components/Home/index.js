import App from './index.html?style=./style.css';
import Company from '../Company/index';
import BarChart from '../BarChart/index';
import Legende from '../Legende/index';
import Filtre from '../Filtre/index';
export default App({
  name: 'Home',
  components: {
    Company,
    BarChart,
    Legende,
    Filtre
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      ismounted: null,
    };
  },
  mounted() {
    this.ismounted = true;
  },
  updated() {
    this.scrollBarChartRight();
  },
  methods: {
    scrollBarChartRight() {
      var elem = this.$el.querySelector("#barchart");
      var container = this.$el.querySelector(".barchartContainer");
      container.scrollLeft = elem.clientWidth;
    }
  },
  computed: {
    styles: function() {
      if (this.$store.getters.getStockMonthLabels.length > 200)
        return {
          width: '3000px'
        };
      if (this.$store.getters.getStockMonthLabels.length > 100) {
        return {
          width: '2000px'
        };
      }
      return {
        width: '1200px'
      };
    },

  },
  watch: {
    ismounted(val) {
      this.scrollBarChartRight();
    }
  }
});
