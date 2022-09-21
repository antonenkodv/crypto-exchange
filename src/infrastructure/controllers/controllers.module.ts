import { Module } from '@nestjs/common';
import { CurrencyController } from "./currency/currency.contoller";
import { UsecasesProxyModule } from "../usecases-proxy/usecases-proxy.module";
import { ExceptionsService } from '../exceptions/exceptions.service';


@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [CurrencyController],
  providers:[ExceptionsService]
})
export class ControllersModule {}
