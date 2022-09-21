import { DynamicModule, Module } from "@nestjs/common";
import { UseCaseProxy } from "./usecases-proxy";
import { CurrencyExchangeUsecases } from "../../usecases/currency/currency.exchange.usecases";
import { EnvironmentConfigService } from "../config/environment/environment.service";
import { EnvironmentConfigModule } from "../config/environment/environment.module";

@Module({
  imports: [EnvironmentConfigModule]
})
export class UsecasesProxyModule {
  static GET_EXCHANGED_CURRENCY_USECASES = "getExchangedCurrencyUseCases";

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [{
        inject: [EnvironmentConfigService],
        provide: UsecasesProxyModule.GET_EXCHANGED_CURRENCY_USECASES,
        useFactory: (
          config:EnvironmentConfigService
        ) => new UseCaseProxy(new CurrencyExchangeUsecases(config))
      }],
      exports: [
        UsecasesProxyModule.GET_EXCHANGED_CURRENCY_USECASES
      ]
    };
  }
}