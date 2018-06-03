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
      let width = Math.max(this.$store.getters.getActiveLabels.length * 20, 1000);
      return {
        width: width + 'px'
      };
    },

  },
  watch: {
    ismounted(val) {
      this.scrollBarChartRight();
    }
  }
});
