// BaseRepository.ts
import { Repository, EntityTarget, DataSource, ObjectLiteral } from 'typeorm';
import { IBaseRepository } from '../interfaces/IBaseRepository';

export class BaseRepository<T extends ObjectLiteral> implements IBaseRepository<T> {
  private readonly repository: Repository<T>;

  constructor(entity: EntityTarget<T>, dataSource: DataSource) {
    this.repository = dataSource.getRepository(entity);
  }

  protected getRepository(): Repository<T> {
    return this.repository;
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<T | null> {
    return this.repository.findOneBy({ id } as any);
  }

  async findDetailsById(id: number, relations?: string[]): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as any,
      relations: relations ?? [],
    });
  }

  async create(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  async update(entity: T): Promise<void> {
    await this.repository.save(entity);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
