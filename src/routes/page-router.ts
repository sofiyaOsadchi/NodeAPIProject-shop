import { Router } from "express";
import { pageService } from "../services/page-service";
import { validateToken } from "../middleware/validate-token";
import { isAdmin } from "../middleware/is-admin";
import upload from "../middleware/uploads";

const router = Router();

// יצירת עמוד חדש
router.post("/", ...isAdmin, upload.single("image"), async (req, res, next) => {
    try {
        if (!req.payload) {
            throw new Error("Invalid token");
        }

        const imageUrl = req.file ? `http://localhost:8080/uploads/${req.file.filename}` : null;

        const pageData = {
            ...req.body,
            components: JSON.parse(req.body.components || '[]').map((component: any) => ({
                ...component,
                image: component.type === 'image' && imageUrl ? { url: imageUrl } : undefined,
            })),
        };

        const result = await pageService.createPage(pageData, req.payload._id);
        res.status(201).json(result);
    } catch (e) {
        next(e);
    }
});

// עדכון עמוד קיים
router.put("/:id", ...isAdmin, upload.single("image"), async (req, res, next) => {
    try {
        if (!req.payload) {
            throw new Error("Invalid token");
        }

        const imageUrl = req.file ? `http://localhost:8080/uploads/${req.file.filename}` : req.body.imageUrl;

        const pageData = {
            ...req.body,
            components: JSON.parse(req.body.components || '[]').map((component: any) => ({
                ...component,
                image: component.type === 'image' && imageUrl ? { url: imageUrl } : undefined,
            })),
        };

        const updatedPage = await pageService.updatePage(req.params.id, pageData);
        res.json(updatedPage);
    } catch (e) {
        next(e);
    }
});

// מחיקת עמוד
router.delete("/:id", ...isAdmin, async (req, res, next) => {
    try {
        const pageId = req.params.id;
        const deletedPage = await pageService.deletePage(pageId);
        res.json({ message: "Page deleted successfully", page: deletedPage });
    } catch (e) {
        next(e);
    }
});

// קבלת כל העמודים
router.get("/", async (req, res, next) => {
    try {
        const pages = await pageService.getPages();
        res.json(pages);
    } catch (e) {
        next(e);
    }
});

// קבלת עמוד לפי ID
router.get("/:id", async (req, res, next) => {
    try {
        const page = await pageService.getPage(req.params.id);
        res.json(page);
    } catch (e) {
        next(e);
    }
});

export default router;
