import axios from 'axios';
import store from '@/store/store';
import {
  handlerCompanyData
} from '../utils';

function companyApi() {
  return axios.create({
    baseURL: process.env.baseURL,
  });
};

export default {
  async fetchCompany(stocksymbol) {
    let response = await companyApi().get('/company/list', {});
    let companies = response.data.companies;
    companies.map(company => handlerCompanyData(company));
    store.dispatch('setFetchingAllCompanyData', false);
    // return symbols;
  },
};
