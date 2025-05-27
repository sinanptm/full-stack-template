export default interface IBaseRepository<T> {
  create(entity: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  update(id: string, entity: T): Promise<T | null>;
  delete(id: string): Promise<void>;
}
