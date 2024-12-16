import { Portfolio } from '../entity/portfolio.entity';

export interface PortfolioGenerationRO {
  portfolios: PortfolioGenerationData[];
  totalOfferedVolume: number;
}

export interface PortfolioGenerationData {
  name: string;
  pricePerTon: number;
  offeredVolumeInTons: number;
  supplierName: string;
  earliestDelivery: Date;
}

export interface PortfolioAllocation {
  portfolioId: number;
  offeredVolume: number;
}

export interface PortfolioListRO {
  portfolios: PortfolioListData[];
}

export interface PortfolioListData {
  name: string;
  country: string;
  image: string;
  pricePerTon: number;
  offeredVolumeInTons: number;
  supplierName: string;
  earliestDelivery: Date;
  description: string;
}

//TODO: interface olan bir yerde logic olmamalı
export function buildPortfolioRO(
  allocations: PortfolioAllocation[],
  portfolios: Portfolio[],
): PortfolioGenerationRO {
  const allocationMap = new Map(
    allocations.map((allocation) => [
      allocation.portfolioId,
      parseFloat(allocation.offeredVolume.toFixed(2)),
    ]),
  );

  const portfolioData: PortfolioGenerationData[] = portfolios.map((p) => {
    return {
      name: p.name,
      pricePerTon: parseFloat(p.pricePerTon.toFixed(2)),
      offeredVolumeInTons: allocationMap.get(p.id),
      supplierName: p.supplierName,
      earliestDelivery: p.earliestDelivery,
    };
  });

  const total: number = allocations.reduce(
    (total, allocation) => total + allocation.offeredVolume,
    0,
  );

  return { portfolios: portfolioData, totalOfferedVolume: total };
}
