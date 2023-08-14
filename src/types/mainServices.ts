export interface CryptoData {
  csupply: string;
  id: string;
  market_cap_usd: string;
  msupply: string;
  name: string;
  nameid: string;
  percent_change_1h: string;
  percent_change_24h: string;
  percent_change_7d: string;
  price_btc: string;
  price_usd: string;
  rank: number;
  symbol: string;
  tsupply: string;
  volume24: number;
  volume24a: number;
}

export interface TikerResponse {
  data: CryptoData[];
  info: {
    coins_num: number;
    time: number;
  };
}
