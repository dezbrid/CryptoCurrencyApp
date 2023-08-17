import {TickerResponse} from '@types';
import {axiosCoinLore} from '@config/axios';
import {AxiosResponse} from 'axios';

const ENDPOINT_TICKERS = 'tickers/';

/**
 * Retrieves a list of tickers from a specified start index with a specified limit.
 *
 * @param {number} start - The starting index of the ticker list to retrieve.
 * @param {number} limit - The maximum number of tickers to retrieve.
 * @returns {Promise<TickerResponse>} A Promise that resolves to a TickerResponse object.
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
