import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('portfolio')
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  image: string;

  @Column({ type: 'decimal',name: 'price_per_ton' })
  pricePerTon: number;

  @Column({ name: 'offered_value_in_tons' })
  offeredVolumeInTons: number;

  @Column({ type: 'float', name: 'distribution_weight' })
  distributionWeight: number;

  @Column({ name: 'supplier_name' })
  supplierName: string;

  @Column({ type: 'date', name: 'earliest_delivery' })
  earliestDelivery: Date;

  @Column()
  description: string;
}
