import { ApiProperty } from '@nestjs/swagger';
import {
  PortfolioListData,
  PortfolioListRO,
} from '../interface/portfolio.interface';

export class PortfolioListDTO implements PortfolioListRO {
  @ApiProperty({
    description: 'The unique identifier for the response object.',
    example: {
      type: 'generated_portfolio',
      attributes: {
        portfolios: [
          {
            name: 'Company A',
            pricePerTon: 4000,
            offeredVolumeInTons: 60,
            supplierName: 'Supplier A',
            earliestDelivery: '2024-12-15',
          },
          {
            name: 'Company B',
            pricePerTon: 10.5,
            offeredVolumeInTons: 36,
            supplierName: 'Supplier B',
            earliestDelivery: '2023-12-01',
          },
        ],
        totalOfferedVolume: 60,
      },
    },
    required: false,
  })
  portfolios: PortfolioListData[];
}
