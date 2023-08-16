import {axiosCoinLore} from '@config/axios';
import {TickerData} from '@types';
import {AxiosResponse} from 'axios';

const ENDPOINT_TICKER = 'ticker/';
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
