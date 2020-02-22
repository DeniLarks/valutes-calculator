import axios from 'axios';

const URL_HOST = 'currency-converter5.p.rapidapi.com'
const URL_BASE = `https://${URL_HOST}`
const API_KEY = 'c57bdd4b9amsh95611dc5c6073cbp127a6ejsn0904e596725b';

export const apiValutes = {
  getValues() {
    return axios.get(`${URL_BASE}/currency/list`, {
      headers: {
        "x-rapidapi-host": URL_HOST,
        "x-rapidapi-key": API_KEY
      }
    });
  },
  getRatio(parFrom, parTo, parAmount) {
    return axios.get(`${URL_BASE}/currency/convert`, {
      headers: {
        "x-rapidapi-host": URL_HOST,
        "x-rapidapi-key": API_KEY
      },
      params: {
        from: parFrom,
        to: parTo,
        amount: parAmount
      }
      
    });
  }
}
