import axios from 'axios';
import {BASE_URL_COIN_LORE} from '@env';

/* The code is creating an instance of the Axios HTTP client using the `axios.create()` method. It is
assigning this instance to the variable `axiosCoinLore`. */
export const axiosCoinLore = axios.create({
  baseURL: BASE_URL_COIN_LORE,
});
