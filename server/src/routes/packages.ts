import express from 'express';
import { add_package } from '../controllers/packages';
import { Protection } from '../middleware/authentication';
import { ScrapeData } from '../middleware/scrape-data';

const router = express.Router();

router.post('/', [Protection,ScrapeData], add_package);

export = router;
