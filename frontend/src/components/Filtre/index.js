import PrettyRadio from 'pretty-checkbox-vue/radio';
import App from './index.html?style=./style.css';
import 'pretty-checkbox/dist/pretty-checkbox.css';
import * as constants from '../../constants';

export default App({
  name: 'Filtre',
  data() {
    return {
      periodfilter: this.$store.getters.getstockperiodfilter,
      pricefilter: this.$store.getters.getstockpricefilter,
      daily: constants.daily,
      weekly: constants.weekly,
      monthly: constants.monthly,
      marketOpen: constants.marketOpen,
      marketHigh: constants.marketHigh,
      marketLow: constants.marketLow,
      marketClose: constants.marketClose,
    };
  },
  components: {
    'p-radio': PrettyRadio
  },
  watch: {
    periodfilter: function(val) {
      console.log('periodfilter', val);
      this.$store.dispatch('setPeriodFilter', val);

    },
    pricefilter: function(val) {
      console.log('pricefilter', val);
      this.$store.dispatch('setPriceFilter', val);
    }
  }
});
