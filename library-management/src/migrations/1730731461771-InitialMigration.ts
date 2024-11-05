import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1730731461771 implements MigrationInterface {
    name = 'InitialMigration1730731461771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "borrow_record" ("id" SERIAL NOT NULL, "borrowed_at" TIMESTAMP NOT NULL DEFAULT now(), "returned_at" TIMESTAMP, "rating" double precision, "userId" integer, "bookId" integer, CONSTRAINT "PK_bed177a8cdcca94d5adeebdc52c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "score" double precision NOT NULL DEFAULT '-1', CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "borrow_record" ADD CONSTRAINT "FK_039a56f88d9fd9c6015c640a5b2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "borrow_record" ADD CONSTRAINT "FK_8032acbf1eb063876edcf49e96c" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrow_record" DROP CONSTRAINT "FK_8032acbf1eb063876edcf49e96c"`);
        await queryRunner.query(`ALTER TABLE "borrow_record" DROP CONSTRAINT "FK_039a56f88d9fd9c6015c640a5b2"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "borrow_record"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
