/* eslint-disable */
export default async () => {
  const t = {};
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('./modules/portfolio/entity/portfolio.entity'),
          {
            Portfolio: {
              id: { required: true, type: () => Number },
              name: { required: true, type: () => String },
              country: { required: true, type: () => String },
              image: { required: true, type: () => String },
              pricePerTon: { required: true, type: () => Number },
              offeredVolumeInTons: { required: true, type: () => Number },
              distributionWeight: { required: true, type: () => Number },
              supplierName: { required: true, type: () => String },
              earliestDelivery: { required: true, type: () => Date },
              description: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./modules/portfolio/dto/generate-entry.dto'),
          {
            GenerateEntryDto: {
              desiredVolumeInTons: { required: true, type: () => Number },
            },
          },
        ],
      ],
      controllers: [
        [
          import('./modules/portfolio/controller/portfolio.controller'),
          { PortfolioController: { generatePortfolio: { type: Object } } },
        ],
      ],
    },
  };
};