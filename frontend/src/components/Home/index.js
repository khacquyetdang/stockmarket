import App from './index.html?style=./style.css';
import Company from '../Company/index';
import BarChart from '../BarChart/index';

export default App({
  name: 'Home',
  components: {
    Company,
    BarChart
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
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

  }
});
