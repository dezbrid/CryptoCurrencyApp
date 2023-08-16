import {TickerResponse} from '@types';
import {axiosCoinLore} from '@config/axios';
import {AxiosResponse} from 'axios';

const ENDPOINT_TICKERS = 'tickers/';

export const getTikers = async (
  start: number,
  limit: number,
): Promise<TickerResponse> => {
  try {
    const response: AxiosResponse<TickerResponse, any> = await axiosCoinLore.get(
      `${ENDPOINT_TICKERS}/?start=${start}&limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
