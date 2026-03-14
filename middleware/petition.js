
import { getSignatureCount } from '../utils/scraper.js';

export const petitionMiddleware = async (req, res, next) => {
  // Only trigger on actual page loads, not image/css requests
  if (req.method === 'GET' && !req.path.startsWith('/assets') && !req.path.startsWith('/css') && !req.path.startsWith('/js')) {
    res.locals.sigCount = await getSignatureCount();
  }
  next();
};