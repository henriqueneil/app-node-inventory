import 'pouchdb-adapter-idb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb';
import { productCollection } from './product.db';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { products } from '../initial-load/products';

/**
 * This file sets up the RxDB database for the inventory application.
 * It initializes the database, adds the product collection, and populates it with initial data if
 */
addRxPlugin(RxDBQueryBuilderPlugin);
export const idbStorage = getRxStorageMemory();

let db: RxDatabase | null = null;
export async function getDatabase(): Promise<RxDatabase> {
  if (!db) {
    db = await createRxDatabase({
      name: 'inventory-db',
      storage: idbStorage,
    });

    await db.addCollections(productCollection);

    // Check if products collection is empty
    const count = await db.collections.products.count().exec();

    // Insert initial data if the collection is empty
    if (count === 0) {
      // Insert each product individually
      for (const product of products) {
        await db.collections.products.insert(product);
      }

      console.log('Added initial product records');
    }
  }
  return db;
}
