import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from '../entity/portfolio.entity';

@Injectable()
export class PortfolioRepository {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
  ) {}

  async createPortfolio(portfolio: Portfolio): Promise<Portfolio> {
    return await this.portfolioRepository.save(portfolio);
  }

  async getPortfolioById(portfolioId: number): Promise<Portfolio> {
    return await this.portfolioRepository.findOne({
      where: { id: portfolioId },
    });
  }

  async getPortfolios(
    skip?: number,
  ): Promise<{ portfolios: Portfolio[]; count: number }> {
    const [portfolios, total] = await this.portfolioRepository.findAndCount({
      take: 10,
      skip: skip,
    });

    return { portfolios, count: total };
  }

  async deletePortfolioById(portfolioId: number): Promise<void> {
    const portfolio = await this.portfolioRepository.findOne({
      where: { id: portfolioId },
    });
    if (portfolio) {
      await this.portfolioRepository.remove(portfolio);
    }
  }
}
