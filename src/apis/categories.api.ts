import { Request, Response, Router } from 'express';
import { CategoryService } from '../services/category.service';

const categoryRouter = Router();

categoryRouter.get('/categories', async (_request: Request, response: Response) => {
  try {
    const service = new CategoryService();
    const categories = await service.getCategories();
    response.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    response.status(500).json({ error: 'Failed to fetch categories' });
  }
});

export default categoryRouter;
