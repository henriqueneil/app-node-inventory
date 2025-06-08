import { Request, Response, Router } from 'express';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

const productRouter = Router();

productRouter.get('/products/:id', async (request: Request, response: Response) => {
  console.log('Received request for product with ID:', request.params.id);
  const { id } = request.params;

  try {
    const service = new ProductService();
    const product = await service.getProductById(id);

    if (!product && product === null) {
      console.warn(`Product with ID ${id} not found`);
      response.status(404).json({ error: 'NotFound', message: `Product with ID '${id}' not found` });
      return;
    }

    response.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    response.status(500);
  }
});

productRouter.get('/products', async (request: Request, response: Response) => {
  try {
    const filters = {
      name: request.query.name as string | undefined,
      category: request.query.category as string | undefined,
      brand: request.query.brand as string | undefined,
      minPrice: request.query.minPrice ? parseFloat(request.query.minPrice as string) : undefined,
      maxPrice: request.query.maxPrice ? parseFloat(request.query.maxPrice as string) : undefined,
    };

    const service = new ProductService();
    const products = await service.findProducts(filters);
    response.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    response.status(500).json({ error: 'Failed to fetch products' });
  }
});

productRouter.post('/products', async (request: Request, response: Response) => {
  console.debug('Received request to add a new product');
  try {
    const service = new ProductService();
    const product = await service.addProduct(request.body as Product);

    response.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', error);
    response.status(500).json({ error: 'InternalServerError', message: 'An error occurred while adding the product' });
  }
});

export default productRouter;
