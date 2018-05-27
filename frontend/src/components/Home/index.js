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
});
