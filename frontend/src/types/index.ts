export type PortfolioGridItemType = {
  id: number,
  name: string,
  country: string,
  image: string,
  pricePerTon: number,
  offeredVolumeInTons: number,
  distributionWeight: number,
  supplierName: string,
  earliestDelivery: string,
  description: string,
}

export type PortfolioGridItemResponseType = {
  type: string,
  attributes: {
    portfolios: PortfolioGridItemType[];
  }
}