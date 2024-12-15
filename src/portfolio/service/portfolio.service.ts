import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Portfolio } from '../entity/portfolio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { buildPortfolioRO, PortfolioAllocation, PortfolioGenerationData, PortfolioGenerationRO } from '../portfolio.interface';
import { serializerService, ISerializeResponse } from '../../shared/services/serilizer.service';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
    private readonly dataSource: DataSource,
  ) {
  }

  async generatePortfolio(desiredVolumeInTons: number): Promise<ISerializeResponse> {
    const portfolios = await this.portfolioRepository.find();
    const totalDistributionWeight = portfolios.reduce((sum, project) => sum + project.distributionWeight, 0);

    const targetAllocations = portfolios
      .sort((a, b) => b.distributionWeight - a.distributionWeight)
      .map((p) => ({
        portfolioId: p.id,
        targetTons: Math.round((p.distributionWeight / totalDistributionWeight) * desiredVolumeInTons),
        offeredTons: p.offeredVolumeInTons,
      }));

    const allocations: PortfolioAllocation[] = [];
    let remainingTons = desiredVolumeInTons;

    for (const { portfolioId, targetTons, offeredTons } of targetAllocations) {
      const allocatedVolume = Math.min(targetTons, offeredTons, remainingTons);
      allocations.push({ portfolioId: portfolioId, offeredVolume: allocatedVolume });
      remainingTons -= allocatedVolume;

      if (remainingTons <= 0) {
        break;
      }
    }

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

    return serializerService.serializeResponse('generated_portfolio', buildPortfolioRO(allocations, portfolios));
  }

  //
  //
  // async allocateCredits(
  //   requestedTons: number,
  // ): Promise<PortfolioAllocation[]> {
  //   const projects = await this.portfolioRepository.find();
  //   const totalDistributionWeight = projects.reduce(
  //     (sum, project) => sum + project.distributionWeight,
  //     0,
  //   );
  //
  //   // Step 2: Determine target allocation for each project
  //   const targetAllocations = projects.map((project) => ({
  //     portfolioId: project.id,
  //     targetTons: (project.distributionWeight / totalDistributionWeight) * requestedTons,
  //     offeredTons: project.offeredVolumeInTons,
  //   }));
  //
  //   // Step 3: Allocate tons respecting offered values and weights
  //   const allocations: PortfolioAllocation[] = [];
  //   let remainingTons = requestedTons;
  //
  //   for (const { portfolioId, targetTons, offeredTons } of targetAllocations) {
  //     const allocatedCredits = Math.min(targetTons, offeredTons, remainingTons);
  //     allocations.push({ portfolioId, allocatedCredits });
  //     remainingTons -= allocatedCredits;
  //
  //     // Break if no tons are left to allocate
  //     if (remainingTons <= 0) {
  //       break;
  //     }
  //   }
  //
  //   // Step 4: Handle shortfalls by redistributing remaining tons
  //   if (remainingTons > 0) {
  //     for (const allocation of allocations) {
  //       const project = projects.find((p) => p.id === allocation.portfolioId);
  //       if (project) {
  //         const additionalAllocation = Math.min(
  //           project.offeredVolumeInTons - allocation.allocatedCredits,
  //           remainingTons,
  //         );
  //         allocation.allocatedCredits += additionalAllocation;
  //         remainingTons -= additionalAllocation;
  //       }
  //
  //       if (remainingTons <= 0) {
  //         break;
  //       }
  //     }
  //   }
  //
  //   return allocations;
  // }

}
