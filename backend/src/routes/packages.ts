import express from 'express';
import { add_package, getAllPackages, getPackage } from '../controllers/packages';
import { Protection } from '../middleware/authentication';
import { ScrapeData } from '../middleware/scrape-data';

const router = express.Router();

router.get('/', getAllPackages)
router.post('/', [Protection,ScrapeData], add_package);
router.get('/:language/:name', getPackage)

export = router;
