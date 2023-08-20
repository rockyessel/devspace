import { Request, Response, NextFunction } from 'express';
import { crates_rpm, scrape_art } from '../utils/services/scrape';
import { Package } from '../models/packages';

export interface CustomRequest extends Request {
  data?: any;
}

export const ScrapeData = async (
  request: CustomRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const { type, value } = request.body as { type: string; value: string };

    switch (type) {
      case 'rust':
        try {
          const doesPackageExist = await Package.findOne({
            package_name: value,
          });

          if (doesPackageExist?.package_name === value) {
            response.status(409).json({
              error: 'Data already exists',
              message: 'The resource you are trying to create already exists.',
              code: 'duplicate_data_error',
            });
            return;
          } else {
            const result_rust = await crates_rpm(value);
            request.data = result_rust;
          }

          break; // Exit the switch block and continue to the next middleware
        } catch (error) {
          response.status(500).json({
            error: 'Could not scrape the package from Rust Crates.io',
          });
        }
      case 'article':
        const result_article = await scrape_art(value);
        request.data = result_article;
        break; // Exit the switch block and continue to the next middleware
      default:
        break; // Exit the switch block and continue to the next middleware
    }

    next(); // Continue to the next middleware after the switch block
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Could not scrape, server problem' });
  }
};
