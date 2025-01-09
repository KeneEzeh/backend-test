import express from 'express';
import { getOriginalUrl, shortenUrl } from './controller.js';

const router = express.Router();


router.post('/shorten', shortenUrl);

router.get('/:portalID', getOriginalUrl);

export default router;