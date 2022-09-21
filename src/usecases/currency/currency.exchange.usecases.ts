import axios from "axios";

export class CurencyExchangeUsecases {
  constructor() {
  }

  async execute(): Promise<any> {
    const result = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
    return result;
  }
}
