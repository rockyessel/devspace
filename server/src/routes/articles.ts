import express from 'express';
import { add_article } from '../controllers/articles';
import { Protection } from '../middleware/authentication';
import { ScrapeData } from '../middleware/scrape-data';

const router = express.Router();

router.post('/', [Protection, ScrapeData], add_article);

export = router;
