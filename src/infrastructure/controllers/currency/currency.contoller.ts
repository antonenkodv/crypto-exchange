import { Controller, Get, Inject, Query } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsecasesProxyModule } from "../../usecases-proxy/usecases-proxy.module";
import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import {
  CurrencyExchangeUsecases,
  ExchangedResponse,
} from "../../../usecases/currency/currency.exchange.usecases";
import { ExchangeDto } from "./currency.dto";
import { ExceptionsService } from "../../exceptions/exceptions.service";

@Controller("currency")
@ApiTags("currency")
@ApiResponse({ status: 500, description: "Internal error" })
export class CurrencyController {
  constructor(
    @Inject(UsecasesProxyModule.GET_EXCHANGED_CURRENCY_USECASES)
    private readonly getExchangedCurrencyProxy: UseCaseProxy<CurrencyExchangeUsecases>,
    private readonly exceptionsService: ExceptionsService
  ) {
  }

  @ApiOperation({ summary: "Get exchanged currency according to base and target values" })
  @ApiOkResponse({
    description: "Exchanged response at the time of request",
  })
  @Get("exchange")
  async getExchangedCurrency(
    @Query() exchangeDto: ExchangeDto
  ): Promise<ExchangedResponse> {
    //    this.exceptionsService.badRequestException({message : "Bad Request"})
    const { provider, base, target } = exchangeDto;
    const currency = await this.getExchangedCurrencyProxy.getInstance().execute(provider, base, target);
    return currency;
  }

}