import { OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Portfolio } from '../portfolio/entity/portfolio.entity';
import { Repository } from 'typeorm';

const csv = require('csv-parser');

export class DataSeedService implements OnApplicationBootstrap {

  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
  ) {
  }

  onApplicationBootstrap() {
    const results: Partial<Portfolio>[] = [];
    fs.createReadStream('data.csv')
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          id: Number.parseInt(data['id']),
          name: data['name'],
          country: data['country'],
          image: data['image'],
          pricePerTon: Number.parseFloat(data['price_per_ton']),
          offeredVolumeInTons: Number.parseFloat(data['offered_volume_in_tons']),
          distributionWeight: Number.parseFloat(data['distribution_weight']),
          supplierName: data['supplier_name'],
          earliestDelivery: new Date(data['earliest_delivery']),
          description: data['description'],
        });
      })
      .on('end', async () => {
        await this.portfolioRepository.save(results);
      });
  }
}