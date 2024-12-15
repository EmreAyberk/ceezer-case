import { BadRequestException, Body, Controller, Param, Post } from '@nestjs/common';
import { PortfolioService } from '../service/portfolio.service';
import { ISerializeResponse } from '../../shared/services/serilizer.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {
  }

  @Post('generate')
  async generatePortfolio(@Body('requestedTons') requestedTons: number): Promise<ISerializeResponse> {
    if (isNaN(requestedTons) || requestedTons <= 0) {
      throw new BadRequestException('Requested tons should be a positive number.');
    }

    return await this.portfolioService.generatePortfolio(requestedTons);
  }

  // @Get(':id')
  // async getPortfolio(@Param('id') id: number): Promise<ISerializeResponse> {
  //
  //   return await this.portfolioService.generatePortfolio(requestedTons);
  // }
}
