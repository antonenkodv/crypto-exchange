import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {

  constructor(private configService: ConfigService) {}

  getCoingeckoApiUrl():string{
    return this.configService.get<string>('COINGECKO_API_URL');
  }
}