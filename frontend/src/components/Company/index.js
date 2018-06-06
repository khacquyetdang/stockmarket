import App from './index.html?style=./app.css';
import Api from '../../services/alphavantageApi';
export default App({
  data() {
    return {
      companies: [],
      newsymbol: null,
      error: null,
      count: 0,
      connected: false,
    };
  },
  sockets: {
    disconnect: function() {
      console.log('socket to notification channel disconnected');
      this.connected = false;
    },
    connect: function() {
      console.log('socket to notification channel connected');
      this.connected = true;
    },
    newsymbol: function(symbol) {
      console.log('i received  a new symbol', symbol);
      this.newsymbol = symbol;
      this.addCompanyStockSymbole(false);

    }
  },
  methods: {
    async addCompanyStockSymbole(fromBtn = true) {
      if (this.newsymbol) {
        this.newsymbol = this.newsymbol.trim();
        // let res = await Api.fetchStockMonthly(this.newsymbol);
        let res = await Api.fetchStockMonthly(this.newsymbol);

        if (!res) {
          this.error = "<div>An error has occured. The symbol may not  exist</div>";
        } else {
          if (this.connected && fromBtn) {
            console.log("sending new symbol to server");
            this.$socket.emit('newsymbol', this.newsymbol);
          }
          this.error = null;
          this.newsymbol = null;
        }
      }
    }
  }
});
