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

  async generatePortfolio(
    desiredVolumeInTons: number,
  ): Promise<ISerializeResponse> {
    const portfolios = await this.portfolioRepository.find();
    const totalDistributionWeight = portfolios.reduce(
      (sum, project) => sum + project.distributionWeight,
      0,
    );

    // TODO: bunu fonksiyona taşı
    const targetAllocations = portfolios
      .sort((a, b) => b.distributionWeight - a.distributionWeight)
      .map((p) => ({
        portfolioId: p.id,
        targetTons: Math.round(
          (p.distributionWeight / totalDistributionWeight) *
            desiredVolumeInTons,
        ),
        offeredTons: p.offeredVolumeInTons,
      }));

    const allocations: PortfolioAllocation[] = [];
    let remainingTons = desiredVolumeInTons;

    // TODO: bunu da fonksiyona at
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

    this.allocateLeftover(remainingTons, allocations, portfolios);

    return serializerService.serializeResponse(
      'generated_portfolio',
      buildPortfolioRO(allocations, portfolios),
    );
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
