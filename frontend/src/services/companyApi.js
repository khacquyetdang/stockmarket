import axios from 'axios';
import store from '@/store/store';

function companyApi() {
  return axios.create({
    baseURL: process.env.baseURL,
  });
};

export default {
  async fetchCompany(stocksymbol) {
    let response = await companyApi().get('/company/list', {});
    let companies = response.data.companies;
    var symbols = companies.map(element => element.symbol);
    store.dispatch('setSymbols', symbols);
  },
};
