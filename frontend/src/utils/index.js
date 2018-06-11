import store from '@/store/store';


export function handlerCompanyData(company) {

  let symbol = company.symbol;
  let stockmonthly = company.stockmonthly;
  let labels = Object.keys(stockmonthly);
  let values = Object.values(stockmonthly);

  const stockweekly = company.stockweekly;
  let labelsWeekly = Object.keys(stockweekly);
  let valuesWeekly = Object.values(stockweekly);


  const stockdaily = company.stockdaily;
  let labelsDaily = Object.keys(stockdaily);
  let valuesDaily = Object.values(stockdaily);

  store.dispatch('setStockMonthlyLabel', labels);
  store.dispatch('setStockMonthlyValues', {
    symbol,
    values,
  });
  store.dispatch('setStockMonthly', {
    symbol,
    stockmonthly: stockmonthly,
  });

  store.dispatch('setStockWeeklyLabel', labelsWeekly);
  store.dispatch('setStockWeeklyValues', {
    symbol,
    values: valuesWeekly,
  });
  store.dispatch('setStockWeekly', {
    symbol,
    stockweekly: stockweekly,
  });


  store.dispatch('setStockDailyLabel', labelsDaily);
  store.dispatch('setStockDailyValues', {
    symbol,
    values: valuesDaily,
  });
  store.dispatch('setStockDaily', {
    symbol,
    stockdaily: stockdaily,
  });

  store.dispatch('addSymbol', symbol);
}
