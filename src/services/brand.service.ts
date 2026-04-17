import { getDatabase } from '../database/rxdb';

export class BrandService {
  async getBrands(): Promise<string[]> {
    const db = await getDatabase();
    const products = await db.collections.products.find().exec();
    const brands = [
      ...new Set(products.map((p: any) => p.brand as string).filter(Boolean))
    ].sort();
    return brands;
  }
}
