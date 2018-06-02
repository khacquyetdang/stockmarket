import PrettyRadio from 'pretty-checkbox-vue/radio';
import App from './index.html?style=./style.css';
import 'pretty-checkbox/dist/pretty-checkbox.css';

export default App({
  name: 'Filtre',
  data() {
    return {
      period: 'period',
      timefilter: this.$store.getters.getstocktimefilter
    };
  },
  computed: {
    isOpenSelected() {
      return this.timefilter === '1. open';
    },
    isHighSelected() {
      return this.timefilter === '2. high';
    },
    isLowSelected() {
      return this.timefilter === '3. low';
    },
    isCloseSelected() {
      return this.timefilter === '4. close';
    }
  },
  components: {
    'p-radio': PrettyRadio
  },
  watch: {
    period: function(val) {
      console.log('periodfilter', val);
    },
    timefilter: function(val) {
      console.log('timefilter', val);
      this.$store.dispatch('setStocktimeFilter', val);
    }
  }
});
