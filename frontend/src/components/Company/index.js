import App from './index.html?style=./app.css';
import Api from '../../services/alphavantageApi';
import {
  handlerCompanyData
} from '../../utils';
export default App({
  data() {
    return {
      companies: [],
      newsymbol: null,
      error: null,
      count: 0,
      connected: false,
      request_inprogress: false,
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
    newcompany: function(company) {
      console.log('i received  a new symbol', company);

      handlerCompanyData(company);

    }
  },
  methods: {
    async addCompanyStockSymbole(fromBtn = true) {
      if (this.newsymbol) {
        this.newsymbol = this.newsymbol.trim();
        this.request_inprogress = true;
        // let res = await Api.fetchStockMonthly(this.newsymbol);
        let company = await Api.fetchStockMonthly(this.newsymbol);

        if (!company) {
          this.error = "<div>An error has occured. The symbol may not  exist</div>";
        } else {
          if (this.connected && fromBtn) {
            console.log("sending newcompany to server");
            this.$socket.emit('newcompany', company);
          }
          this.error = null;
          this.newsymbol = null;
        }
        this.request_inprogress = false;
      }
    }
  }
});
