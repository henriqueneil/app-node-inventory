import { getDatabase } from '../database/rxdb';

export class CategoryService {
  async getCategories(): Promise<string[]> {
    const db = await getDatabase();
    const products = await db.collections.products.find().exec();
    const categories = [
      ...new Set(products.map((p: any) => p.category as string).filter(Boolean))
    ].sort();
    return categories;
  }
}
