import express from 'express';
import { addCategory, addSubcategory, getSubcategories } from './controller.js';

const router = express.Router();

router.post('/create-category', addCategory)

router.post('/create-subcategory', addSubcategory)

router.get('/get-category', getSubcategories)


export default router;