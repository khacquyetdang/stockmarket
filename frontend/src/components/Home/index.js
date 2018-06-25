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
  methods: {
    scrollBarChartRight() {
      let isScrollable = true;
      if (isScrollable) {
        return;
      }
      var elem = this.$el.querySelector("#barchart");
      var container = this.$el.querySelector(".barchartContainer");
      container.scrollLeft = elem.clientWidth;
    }
  },
  computed: {
    isActiveDatasetEmpty() {
      return this.$store.getters.getActiveDatasets === null ||
        this.$store.getters.getActiveDatasets.length === 0 ||
        this.$store.getters.getSymbols === null ||
        this.$store.getters.getSymbols.length === 0;
    },
    isFetchingAllCompanyData() {
      return this.$store.getters.getFetchingAllCompanyData;
    },

    styles() {
      let width = Math.max(this.$store.getters.getActiveLabels.length * 20, 1000);
      return {
        width: width + 'px'
      };
    },

  },
  watch: {
    isFetchingAllCompanyData(val) {
      this.scrollBarChartRight();
    }
  }
});
