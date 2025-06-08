import express from 'express';
import productRouter from './apis/products.api';
import { webcrypto } from 'crypto';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Middleware to log available routes dynamically
if (app._router && Array.isArray(app._router.stack)) {
  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      // Routes registered directly on the app
      console.log(`${Object.keys(middleware.route.methods).join(', ').toUpperCase()} ${middleware.route.path}`);
    } else if (middleware.name === 'router' && middleware.handle && Array.isArray(middleware.handle.stack)) {
      // Routes added as a router
      middleware.handle.stack.forEach((handler: any) => {
        if (handler.route) {
          console.log(`${Object.keys(handler.route.methods).join(', ').toUpperCase()} ${handler.route.path}`);
        }
      });
    }
  });
}

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as unknown as Crypto;
}
