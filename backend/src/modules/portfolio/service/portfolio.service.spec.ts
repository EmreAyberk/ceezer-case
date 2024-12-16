import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioService } from './portfolio.service';
import { DataSource, Repository } from 'typeorm';
import { Portfolio } from '../entity/portfolio.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PortfolioGenerationRO } from '../interface/portfolio.interface';

describe('PortfolioService', () => {
  let service: PortfolioService;
  let repository: Repository<Portfolio>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioService,
        {
          provide: getRepositoryToken(Portfolio),
          useClass: Repository,
        },
        {
          provide: DataSource,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PortfolioService>(PortfolioService);
    repository = module.get<Repository<Portfolio>>(
      getRepositoryToken(Portfolio),
    );
  });

  it('should correctly generate a portfolio with proportional volume allocation -- happy path', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue(mockProjects);

    const desiredVolumeInTons = 60;

    const result = await service.generatePortfolio(desiredVolumeInTons);
    expect(result).toBeDefined();

    const portfolioGenerationRO = result.attributes as PortfolioGenerationRO;
    expect(portfolioGenerationRO.portfolios).toHaveLength(5);
    expect(portfolioGenerationRO.totalOfferedVolume).toEqual(
      desiredVolumeInTons,
    );

    const allocations = portfolioGenerationRO.portfolios.map(
      (portfolio) => portfolio.offeredVolumeInTons,
    );
    expect(allocations).toEqual([27, 15, 9, 6, 3]);
  });

  it('should correctly generate a portfolio with proportional volume allocation -- fractional value 1', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue(mockProjects);

    const desiredVolumeInTons = 63;

    const result = await service.generatePortfolio(desiredVolumeInTons);

    const portfolioGenerationRO = result.attributes as PortfolioGenerationRO;

    expect(portfolioGenerationRO.totalOfferedVolume).toEqual(
      desiredVolumeInTons,
    );
    const allocations = portfolioGenerationRO.portfolios.map(
      (portfolio) => portfolio.offeredVolumeInTons,
    );
    expect(allocations).toEqual([29, 16, 9, 6, 3]);
  });

  const mockProjects: Portfolio[] = [
    {
      id: 1,
      name: 'Project A',
      country: 'USA',
      image: 'url_a',
      pricePerTon: 650,
      offeredVolumeInTons: 15,
      distributionWeight: 0.05,
      supplierName: 'Supplier A',
      earliestDelivery: new Date(),
      description: 'Description A',
    },
    {
      id: 2,
      name: 'Project B',
      country: 'Canada',
      image: 'url_b',
      pricePerTon: 200,
      offeredVolumeInTons: 900,
      distributionWeight: 0.1,
      supplierName: 'Supplier B',
      earliestDelivery: new Date(),
      description: 'Description B',
    },
    {
      id: 3,
      name: 'Project C',
      country: 'Mexico',
      image: 'url_c',
      pricePerTon: 50,
      offeredVolumeInTons: 1500,
      distributionWeight: 0.15,
      supplierName: 'Supplier C',
      earliestDelivery: new Date(),
      description: 'Description C',
    },
    {
      id: 4,
      name: 'Project D',
      country: 'Mexico',
      image: 'url_c',
      pricePerTon: 25,
      offeredVolumeInTons: 1100,
      distributionWeight: 0.25,
      supplierName: 'Supplier D',
      earliestDelivery: new Date(),
      description: 'Description D',
    },
    {
      id: 5,
      name: 'Project E',
      country: 'Mexico',
      image: 'url_c',
      pricePerTon: 10,
      offeredVolumeInTons: 16000,
      distributionWeight: 0.45,
      supplierName: 'Supplier E',
      earliestDelivery: new Date(),
      description: 'Description E',
    },
  ];
  it('should correctly generate a portfolio with proportional volume allocation -- fractional value 2', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue(mockProjects);

    const desiredVolumeInTons = 79;

    const result = await service.generatePortfolio(desiredVolumeInTons);

    expect(result).toBeDefined();
    const portfolioGenerationRO = result.attributes as PortfolioGenerationRO;

    expect(portfolioGenerationRO.portfolios).toHaveLength(5);
    expect(portfolioGenerationRO.totalOfferedVolume).toEqual(
      desiredVolumeInTons,
    );

    const allocations = portfolioGenerationRO.portfolios
      .sort((a, b) => b.offeredVolumeInTons - a.offeredVolumeInTons)
      .map((p) => p.offeredVolumeInTons);
    expect(allocations).toEqual([36, 20, 12, 8, 3]);
  });

  it('should correctly generate a portfolio with maximum volume allocation when desiredVolume is more than total available offer', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue(mockProjects);

    const desiredVolumeInTons = 20000;

    const result = await service.generatePortfolio(desiredVolumeInTons);
    expect(result).toBeDefined();

    const portfolioGenerationRO = result.attributes as PortfolioGenerationRO;

    expect(portfolioGenerationRO.totalOfferedVolume).toEqual(19515);
    const allocations = portfolioGenerationRO.portfolios.map(
      (portfolio) => portfolio.offeredVolumeInTons,
    );
    expect(allocations).toEqual([16000, 1100, 1500, 900, 15]);
  });

  it('should return an empty portfolio if no volume can be allocated', async () => {
    const mockProjects: Portfolio[] = [
      {
        id: 1,
        name: 'Project A',
        country: 'USA',
        image: 'url_a',
        pricePerTon: 20,
        offeredVolumeInTons: 0,
        distributionWeight: 0.6,
        supplierName: 'Supplier A',
        earliestDelivery: new Date(),
        description: 'Description A',
      },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(mockProjects);

    const desiredVolumeInTons = 10;

    const result = await service.generatePortfolio(desiredVolumeInTons);
    expect(result).toBeDefined();
    const portfolioGenerationRO = result.attributes as PortfolioGenerationRO;

    expect(portfolioGenerationRO.totalOfferedVolume).toEqual(0);
  });
});
