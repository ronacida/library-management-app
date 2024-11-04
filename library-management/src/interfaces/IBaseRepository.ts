export interface IBaseRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(entity: T): Promise<T>;
    update(entity: T): Promise<void>;
    delete(id: number): Promise<void>;
    findDetailsById(id: number, relations?: string[]): Promise<T | null>
  }