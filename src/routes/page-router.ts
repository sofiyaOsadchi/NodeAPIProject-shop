
import express from 'express';
import { createPage, deletePage, getPages, updatePage } from '../services/page-service';
import { IPage } from '../@types/@types';

const router = express.Router();

// יצירת עמוד חדש
router.post('/', async (req, res) => {
    try {
        const page = await createPage(req.body);
        res.status(201).json(page);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create page' });
    }
});

// קריאת כל העמודים
router.get('/', async (req, res) => {
    try {
        const pages = await getPages();
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get pages' });
    }
});

// עדכון עמוד לפי ID
router.put('/:id', async (req, res) => {
    try {
        const page = await updatePage(req.params.id, req.body as Partial<IPage>);
        res.status(200).json(page);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update page' });
    }
});

// מחיקת עמוד לפי ID
router.delete('/:id', async (req, res) => {
    try {
        const page = await deletePage(req.params.id);
        res.status(200).json(page);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete page' });
    }
});

export default router;
