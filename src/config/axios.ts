import axios from 'axios';
import {BASE_URL_COIN_LORE} from '@env';

/**
 * This code snippet creates an instance of the Axios HTTP client using the `axios.create()` method.
 * The instance is assigned to the variable `axiosCoinLore`.
 * The `axiosCoinLore` instance is configured with a base URL from the `BASE_URL_COIN_LORE` environment variable.
 * This allows all requests made with this instance to have the base URL of the `BASE_URL_COIN_LORE`.
 */

export const axiosCoinLore = axios.create({
  baseURL: BASE_URL_COIN_LORE,
});
