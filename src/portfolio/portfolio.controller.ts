import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { Portfolio } from './portfolio.entity';
import { PortfolioRO } from './portfolio.interface';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('import')
  async importCsv() {
    await this.portfolioService.importCsv();
    return { message: 'CSV file has been successfully imported.' };
  }

  @Post('generate')
  async generatePortfolio(@Body('requestedTons') requestedTons: number): Promise<PortfolioRO> {
    if (isNaN(requestedTons) || requestedTons <= 0) {
      throw new BadRequestException('Requested tons should be a positive number.');
    }

    return await this.portfolioService.generatePortfolio(requestedTons);
  }
}
