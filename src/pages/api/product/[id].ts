import type { NextApiRequest, NextApiResponse } from 'next';
import { products } from '@/data/products';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID required' });
  }
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.status(200).json(product);
}
