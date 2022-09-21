import axios from "axios";
import { EnvironmentConfigService } from "../../infrastructure/config/environment/environment.service";
import { Providers } from "../../infrastructure/controllers/currency/currency.enum";

export type ExchangedResponse = {
  [key: string] : {
      [key: string]: number
    }
};

export class CurrencyExchangeUsecases {
  constructor(private config : EnvironmentConfigService) {
  }

  async execute(provider , base , target): Promise<ExchangedResponse> {
    let providerApiUrl = "";
    if (provider === Providers.coingecko) providerApiUrl = `${this.config.getCoingeckoApiUrl()}/simple/price?ids=${base}&vs_currencies=${target}`;
    return axios.get(providerApiUrl).then(response=>response.data);
  }
}
