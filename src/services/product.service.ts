import { Product } from '../models/product.model';
import { getDatabase } from '../database/rxdb';
import { escapeRegExp } from '../utils/regex';

export class ProductService {
  findQueryFields = ['id', 'name', 'category', 'brand', 'price', 'description'];

  async findProducts(filters: {
    name?: string;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    const db = await getDatabase();

    // Start building the query selector
    const selector: any = {};

    let query = db.collections.products.find();

    if (filters.name) {
      query = query.where('name').regex(escapeRegExp(filters.name));
    }
    if (filters.brand) {
      query = query.where('brand').eq(filters.brand);
    }
    if (filters.category) {
      query = query.where('category').eq(filters.category);
    }

    if (filters.minPrice !== undefined) {
      query = query.where('price').gte(filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      query = query.where('price').lte(filters.maxPrice);
    }

    query = query.sort({ price: 'asc' });

    // Execute the query
    const products = await query.exec();

    return products.map(product => this.pickFields(product.toJSON(), this.findQueryFields));
  }

  pickFields(obj: any, fields: string[]) {
    return fields.reduce((result, field) => {
      if (obj[field] !== undefined) {
        result[field] = obj[field];
      }
      return result;
    }, {} as any);
  }

  async getProductById(id: string) {
    const database = await getDatabase();

    let product: Product;
    try {
      product = await database.products.findOne(id).exec();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }

    return product;
  }

  async addProduct(product: Product): Promise<Product> {
    const database = await getDatabase();

    // Get the highest ID currently in the database
    let highestId = '0000';
    try {
      // Find the product with the highest ID
      const results = await database.products.find().sort({ id: 'desc' }).limit(1).exec();

      if (results && results.length > 0) {
        highestId = results[0].id;
      }
    } catch (error) {
      console.error('Error fetching highest product ID:', error);
      throw error;
    }

    // Generate new ID - convert to number, increment, and pad with zeros
    const numericId = parseInt(highestId, 10);
    const nextId = numericId + 1;

    // Set the new product's ID
    product.id = nextId.toString().padStart(5, '0');

    // Insert the product into the database
    try {
      await database.products.insert(product);
    } catch (error) {
      console.error('Error inserting product:', error);
      throw error;
    }

    return product;
  }
}
