import { Response } from 'express';
import { CustomRequest } from '../middleware/scrape-data';

export const add_article = async (
  request: CustomRequest,
  response: Response
) => {
  const data = request.data;

  response.json(data);
};
