import {TickerResponse} from '@types';
import {axiosCoinLore} from '@config/axios';
import {AxiosResponse} from 'axios';

const ENDPOINT_TICKERS = 'tickers/';

/**
 * The function `getTikers` is an asynchronous function that retrieves a list of tickers from a
 * specified start index with a specified limit.
 * @param {number} start - The `start` parameter is used to specify the starting index of the ticker
 * list that you want to retrieve. It determines the position from which the list of tickers should
 * start. For example, if `start` is set to 0, it means that the list should start from the first
 * ticker
 * @param {number} limit - The `limit` parameter specifies the maximum number of tickers to retrieve
 * from the API. It determines the number of tickers that will be returned in the response.
 * @returns a Promise that resolves to a TickerResponse object.
 */
export const getTikers = async (
  start: number,
  limit: number,
): Promise<TickerResponse> => {
  try {
    const response: AxiosResponse<TickerResponse, any> =
      await axiosCoinLore.get(
        `${ENDPOINT_TICKERS}/?start=${start}&limit=${limit}`,
      );
    return response.data;
  } catch (error) {
    throw error;
  }
};
