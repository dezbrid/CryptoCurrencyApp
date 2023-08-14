import {TikerResponse} from '@types';
import {axiosCoinLore} from '@config/axios';
import {AxiosResponse} from 'axios';

const ENDPOINT_TICKER = 'tickers/';

export const getTikers = async (
  start: number,
  limit: number,
): Promise<TikerResponse> => {
  try {
    const response: AxiosResponse<TikerResponse, any> = await axiosCoinLore.get(
      `${ENDPOINT_TICKER}/?start=${start}&limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    console.error('getTikers-error', error);
    throw error;
  }
};
