import { Product } from '../models/product.model';

export interface ProductDB extends Product {}

export const productCollection = {
  products: {
    schema: {
      title: 'product schema',
      version: 0,
      description: 'Schema for products',
      type: 'object',
      primaryKey: 'id',
      properties: {
        id: { type: 'string', maxLength: 5 },
        name: { type: 'string' },
        category: { type: 'string' },
        value: { type: 'number' },
        description: { type: 'string' },
      },
      required: ['id', 'name', 'category', 'value'],
    },
  },
};
