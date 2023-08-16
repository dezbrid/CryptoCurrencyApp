import {axiosCoinLore} from '@config/axios';
import {TickerData} from '@types';
import {AxiosResponse} from 'axios';

const ENDPOINT_TICKER = 'ticker/';
/**
 * The function `getTIkerDetial` is an asynchronous function that takes an `id` parameter and returns a
 * promise that resolves to a `TickerData` object.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a
 * ticker. It is used to fetch the details of a specific ticker from the CoinLore API.
 * @returns a Promise that resolves to a TickerData object.
 */
export const getTIkerDetial = async (id: string): Promise<TickerData> => {
  try {
    const response: AxiosResponse<TickerData[], any> = await axiosCoinLore.get(
      `${ENDPOINT_TICKER}?id=${id}`,
    );
    return response.data[0];
  } catch (error) {
    throw error;
  }
};
