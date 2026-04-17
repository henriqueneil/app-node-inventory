import express, { Router } from 'express';
import productRouter from './apis/products.api';
import categoryRouter from './apis/categories.api';
import brandRouter from './apis/brands.api';
import { webcrypto } from 'crypto';

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as unknown as Crypto;
}

const app = express();
const PORT = 3000;

// Track mount paths explicitly since Express 5 no longer stores them on the layer.
const routerMounts = new Map<Router, string>();

function mountRouter(path: string, router: Router): void {
  routerMounts.set(router, path);
  app.use(path, router);
}

app.use(express.json());
mountRouter('/api', productRouter);
mountRouter('/api', categoryRouter);
mountRouter('/api', brandRouter);

app.listen(PORT, () => {
  console.log(`\nServer is running on http://localhost:${PORT}`);
  console.log('\nAvailable endpoints:');
  printRoutes((app as any).router?.stack ?? [], '');
  console.log('');
});

function printRoutes(stack: any[], parentPath: string): void {
  for (const layer of stack) {
    if (layer.route) {
      const methods = Object.keys(layer.route.methods)
        .map((m: string) => m.toUpperCase())
        .join(', ');
      console.log(`  [${methods}] http://localhost:${PORT}${parentPath}${layer.route.path}`);
    } else if (layer.handle?.stack) {
      const mountPath = routerMounts.get(layer.handle) ?? '';
      printRoutes(layer.handle.stack, parentPath + mountPath);
    }
  }
}
