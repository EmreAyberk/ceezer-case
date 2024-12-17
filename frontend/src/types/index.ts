export type PortfolioItemType = {
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
    portfolios: PortfolioItemType[];
  }
}

export type PortfolioDetailResponseType = {
  type: string,
  attributes: {
    portfolio: PortfolioItemType;
  }
}

export type PortfolioTableItemType = {
  name: string,
  pricePerTon: number,
  offeredVolumeInTons: number,
  supplierName: string,
  earliestDelivery: string,
}

export type PortfolioTableItemResponseType = {
  type: string,
  attributes: {
    portfolios: PortfolioTableItemType[];
    totalOfferedVolume: number,
  }
}