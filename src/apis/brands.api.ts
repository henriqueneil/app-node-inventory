import { Request, Response, Router } from 'express';
import { BrandService } from '../services/brand.service';

const brandRouter = Router();

brandRouter.get('/brands', async (_request: Request, response: Response) => {
  try {
    const service = new BrandService();
    const brands = await service.getBrands();
    response.json(brands);
  } catch (error) {
    console.error('Error fetching brands:', error);
    response.status(500).json({ error: 'Failed to fetch brands' });
  }
});

export default brandRouter;
