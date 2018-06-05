import App from './index.html?style=./app.css';
import Api from '../../services/alphavantageApi';
export default App({
  data() {
    return {
      companies: [],
      newsymbol: null,
      error: null,
      count: 0,
    };
  },
  sockets: {
    disconnect: function() {
      console.log('socket to notification channel disconnected');
    },
    connect: function() {
      console.log('socket to notification channel connected');
    },
    message: function(val) {
      console.log('this method was fired by the socket server. eg: io.emit("punch", data)');
    }
  },
  mounted() {
    let self = this;
    let mytimer = setInterval(function() {
      if (self.count < 5) {
        console.log("send new symbol");
        self.$socket.emit('newsymbol', "count ");
      } else {
        clearInterval(mytimer);
      }
      self.count++;
    }, 3000);
  },
  methods: {
    addCompanyStockSymbole: async function() {
      if (this.newsymbol) {
        this.newsymbol = this.newsymbol.trim();
        // let res = await Api.fetchStockMonthly(this.newsymbol);
        let res = await Api.fetchStockMonthly(this.newsymbol);

        if (!res) {
          this.error = "<div>An error has occured. The symbol may not  exist</div>";
        } else {
          this.$socket.emit('newsymbol', this.newsymbol);
          this.error = null;
        }
      }
    }
  }
});
