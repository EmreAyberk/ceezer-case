import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Portfolio } from './portfolio.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as csvParser from 'csv-parser';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioData, PortfolioRO } from './portfolio.interface';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
    private readonly dataSource: DataSource,
  ) {
  }


  async generatePortfolio(desiredVolumeInTons: number): Promise<PortfolioRO> {
    const projects = await this.portfolioRepository.find();

    const totalDistributionWeight = projects.reduce(
      (sum, project) => sum + project.distributionWeight,
      0,
    );

    const portfolios: Portfolio[] = [];
    let remainingVolume = desiredVolumeInTons;

    const sortedProjects = projects.sort(
      (a, b) => b.distributionWeight - a.distributionWeight,
    );

    for (const project of sortedProjects) {
      if (remainingVolume <= 0) break;

      const proportionalVolume = Math.floor(
        (project.distributionWeight / totalDistributionWeight) * desiredVolumeInTons,
      );

      const allocatedVolume = Math.min(
        proportionalVolume,
        project.offeredVolumeInTons,
        remainingVolume,
      );

      if (allocatedVolume > 0) {
        portfolios.push({
          ...project,
          offeredVolumeInTons: allocatedVolume,
        });

        remainingVolume -= allocatedVolume;
      }
    }

    return this.buildPortfolioRO(portfolios);
  }


  // TODO: I couldn't pass csv file to dist, need to fix it
  async importCsv(): Promise<void> {
    const filePath = path.join(__dirname, 'portfolio.csv');
    const portfolios: Portfolio[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          const portfolio = new Portfolio();
          portfolio.name = row['name'];
          portfolio.country = row['country'];
          portfolio.image = row['image'];
          portfolio.pricePerTon = parseFloat(row['price_per_ton']);
          portfolio.offeredVolumeInTons = parseInt(row['offered_value_in_tons'], 10);
          portfolio.distributionWeight = parseFloat(row['distribution_weight']);
          portfolio.supplierName = row['supplier_name'];
          portfolio.earliestDelivery = new Date(row['earliest_delivery']);
          portfolio.description = row['description'];
          portfolios.push(portfolio);
        })
        .on('end', async () => {
          try {
            await this.dataSource.getRepository(Portfolio).save(portfolios);
            console.log('CSV data has been successfully imported.');
            resolve();
          } catch (error) {
            console.error('An error occurred while saving data to the database:', error);
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('An error occurred while reading the CSV file:', error);
          reject(error);
        });
    });
  }

  private buildPortfolioRO(portfolios: Portfolio[]): PortfolioRO {
    const portfolioData: PortfolioData[] = portfolios.map((portfolio) => {
      return {
        name: portfolio.name,
        pricePerTon: portfolio.pricePerTon,
        offeredVolumeInTons: portfolio.offeredVolumeInTons,
        supplierName: portfolio.supplierName,
        earliestDelivery: portfolio.earliestDelivery,
      };
    });
    const total: number = portfolios.reduce((total, portfolio) => total + portfolio.offeredVolumeInTons, 0);

    return { portfolios: portfolioData, totalOfferedVolume: total };
  }
}
