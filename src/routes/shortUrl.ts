import express from "express";

import { createUrl, getALLUrl, getUrl, deleteUrl } from "../controllers/shortUrl";

const router = express.Router();

router.get('/shortUrl', getALLUrl);
router.get('/shortUrl/:id', getUrl);
router.delete('/shortUrl/:id', deleteUrl); 
router.post('/shortUrl', createUrl)
export default router;