export interface PortfolioData {
  name: string;
  pricePerTon: number;
  offeredVolumeInTons: number;
  supplierName: string;
  earliestDelivery: Date;
}

export interface PortfolioRO {
  portfolios: PortfolioData[];
  totalOfferedVolume: number;
}