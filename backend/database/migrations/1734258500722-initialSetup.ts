import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1734258500722 implements MigrationInterface {
    name = 'InitialSetup1734258500722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "portfolio" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "country" character varying NOT NULL, "image" character varying NOT NULL, "price_per_ton" numeric NOT NULL, "offered_value_in_tons" integer NOT NULL, "distribution_weight" double precision NOT NULL, "supplier_name" character varying NOT NULL, "earliest_delivery" date NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "portfolio"`);
    }

}
