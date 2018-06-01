import App from './index.html?style=./style.css';

export default App({
  name: 'Legende',
  data() {
    return {
      companysymbols: Object.keys(this.$store.getters.getStockcolors),
    };
  },
  methods: {
    getStylesForSymbol(symbol) {
      let color = this.$store.getters.getStockcolors[symbol];
      let style = "margin-right:5px;width:15px;height:15px;border:2px solid " + color + "; background-color:" + color + ";";
      return style;
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
