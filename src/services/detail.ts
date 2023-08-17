import {axiosCoinLore} from '@config/axios';
import {TickerData} from '@types';
import {AxiosResponse} from 'axios';

const ENDPOINT_TICKER = 'ticker/';
/**
 * The function `getTickerDetail` is an asynchronous function that takes an `id` parameter and returns a
 * promise that resolves to a `TickerData` object.
 *
 * @param {string} id - The unique identifier of a ticker.
 * @returns {Promise<TickerData>} A promise that resolves to a `TickerData` object.
 * @throws {Error} If there is an error during the request.
 */
export const getTickerDetail = async (id: string): Promise<TickerData> => {
  try {
    const response: AxiosResponse<TickerData[], any> = await axiosCoinLore.get(
      `${ENDPOINT_TICKER}?id=${id}`,
    );
    return response.data[0];
  } catch (error) {
    throw error;
  }
};
