export interface ICryptoTicker {
  base: string;
  target: string;

  market: {
    name: string;
    identifier: string;
    has_trading_incentive: boolean;
  };

  last: number;
  volume: number;

  converted_last: {
    btc: number;
    eth: number;
    usd: number;
  };

  converted_volume: {
    btc: number;
    eth: number;
    usd: number;
  };

  trust_score: "green" | "yellow" | "red";

  bid_ask_spread_percentage: number;

  timestamp: string;
  last_traded_at: string;
  last_fetch_at: string;

  is_anomaly: boolean;
  is_stale: boolean;

  trade_url: string;
  token_info_url: string | null;

  coin_id: string;
  target_coin_id: string;

  coin_mcap_usd: number;
}

export interface ICryptoBackpack {
  base: string;
  coin_id: string;
  count: number;
  invested: number;
  price: number;
}

export interface ISellFormValues {
  price: string;
  count: string;
  sellAmount: string;
}
