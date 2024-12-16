import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Portfolio } from '../entity/portfolio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  buildPortfolioRO,
  PortfolioAllocation,
} from '../interface/portfolio.interface';
import {
  serializerService,
  ISerializeResponse,
} from '../../shared/services/serilizer.service';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
  ) {}

  async getAllPortfolios(): Promise<ISerializeResponse> {
    const portfolios = await this.portfolioRepository.find();
    return serializerService.serializeResponse('all_portfolios', {
      portfolios: portfolios,
    });
  }

  async getPortfolioById(id: number): Promise<ISerializeResponse> {
    const portfolio = await this.portfolioRepository.findOne({
      where: { id: id },
    });
    return serializerService.serializeResponse('portfolio', {
      portfolio: portfolio,
    });
  }

  async generatePortfolio(
    desiredVolumeInTons: number,
  ): Promise<ISerializeResponse> {
    const portfolios = await this.portfolioRepository.find();
    const totalDistributionWeight = portfolios.reduce(
      (sum, project) => sum + project.distributionWeight,
      0,
    );

    const targetAllocations = this.getTargetAllocations(
      portfolios,
      totalDistributionWeight,
      desiredVolumeInTons,
    );

    const allocations: PortfolioAllocation[] = [];
    // I should change let to the const and change it to the object
    let remainingTons = desiredVolumeInTons;

    remainingTons = this.allocatePortfolios(
      targetAllocations,
      remainingTons,
      allocations,
    );

    this.allocateLeftover(remainingTons, allocations, portfolios);

    return serializerService.serializeResponse(
      'generated_portfolio',
      buildPortfolioRO(allocations, portfolios),
    );
  }

  private allocatePortfolios(
    targetAllocations: {
      portfolioId: number;
      targetTons: number;
      offeredTons: number;
    }[],
    remainingTons: number,
    allocations: PortfolioAllocation[],
  ) {
    for (const { portfolioId, targetTons, offeredTons } of targetAllocations) {
      const allocatedVolume = Math.min(targetTons, offeredTons, remainingTons);

      allocations.push({
        portfolioId: portfolioId,
        offeredVolume: allocatedVolume,
      });
      remainingTons -= allocatedVolume;

      if (remainingTons <= 0) {
        break;
      }
    }
    return remainingTons;
  }

  private getTargetAllocations(
    portfolios: Portfolio[],
    totalDistributionWeight: number,
    desiredVolumeInTons: number,
  ) {
    return portfolios
      .sort((a, b) => b.distributionWeight - a.distributionWeight)
      .map((p) => ({
        portfolioId: p.id,
        targetTons: Math.round(
          (p.distributionWeight / totalDistributionWeight) *
            desiredVolumeInTons,
        ),
        offeredTons: p.offeredVolumeInTons,
      }));
  }

  private allocateLeftover(
    remainingTons: number,
    allocations: PortfolioAllocation[],
    portfolios: Portfolio[],
  ) {
    if (remainingTons > 0) {
      for (const allocation of allocations) {
        const project = portfolios.find((p) => p.id === allocation.portfolioId);
        if (project) {
          const additionalAllocation = Math.min(
            project.offeredVolumeInTons - allocation.offeredVolume,
            remainingTons,
          );
          allocation.offeredVolume += additionalAllocation;
          remainingTons -= additionalAllocation;
        }

        if (remainingTons <= 0) {
          break;
        }
      }
    }
    return;
  }
}
