import App from './index.html?style=./app.css';
import Api from '../../services/alphavantageApi';
export default App({
  data() {
    return {
      companies: [],
      newsymbol: null,
      error: null,
    };
  },
  methods: {
    async addCompanyStockSymbole() {
      console.log("addCompanyStockSymbole", this.newsymbol);
      if (this.newsymbol) {
        this.newsymbol = this.newsymbol.trim();
        let res = await Api.fetchStockMonthly(this.newsymbol);
        if (!res) {
          this.error = "<div>An error has occured. The symbol may not  exist</div>";
        }
        console.log('res', res);
      }
    }
  }
});
