import App from './index.html?style=./style.css';

export default App({
  name: 'Legende',
  data() {
    return {
      companysymbols: this.$store.getters.getSymbols,
      connected: false,
      error: null,
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
    removecompany: function(symbol) {
      console.log('received removeSymbol singal', symbol);;
      this.$store.dispatch('removeSymbol', symbol);

    }
  },
  methods: {
    getStylesForSymbol(symbol) {
      let color = this.$store.getters.getStockcolors[symbol];
      let style = "margin-right:5px;width:15px;height:15px;border:2px solid " + color + "; background-color:" + color + ";";
      return style;
    },
    removeSymbolClick(symbol) {
      console.log("removeSymbol", symbol);
      if (this.connected) {
        this.$socket.emit('removecompany', symbol);
        this.$store.dispatch('removeSymbol', symbol);
      } else {
        this.error = "Couldn't remove company for now. Please try again later";
      }
    }
  },
  computed: {
    companysymbolsstyles() {
      console.log("companysymbolsstyles");
      let self = this;
      return Object.keys(this.$store.getters.getStockcolors).map(symbol => {
        return "width:15px;height:15px;border:1px solid " + self.companysymbols[symbol] + ";";
      });
    }
  }
});
