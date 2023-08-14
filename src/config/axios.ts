import axios from 'axios';
import {BASE_URL_COIN_LORE} from '@env';

export const axiosCoinLore = axios.create({
  baseURL: BASE_URL_COIN_LORE,
});
