import { Router } from "express";
import { pageService } from "../services/page-service";
import { validateToken } from "../middleware/validate-token";
import { isAdmin } from "../middleware/is-admin";
import upload from "../middleware/uploads";
import { IPage, IPageComponent } from "../@types/@types";

const router = Router();

router.post("/", validateToken, isAdmin, async (req, res, next) => {
    try {
        if (!req.payload) {
            throw new Error("Invalid token");
        }

        const pageData = {
            ...req.body,
            components: req.body.components.map((component: any) => ({
                ...component,
                image: component.type === 'image' ? { url: component.image.url } : undefined,
            })),
        };

        const result = await pageService.createPage(pageData, req.payload._id);
        res.status(201).json(result);
    } catch (e) {
        next(e);
    }
});

 

// יצירת עמוד חדש
/* router.post("/", isAdmin, upload.array("images"), async (req, res, next) => {
    try {
        if (!req.payload) {
            throw new Error("Invalid token");
        }

        // הוספת לוגים לבדיקה
        console.log("Received files:", req.files);
        console.log("Received body:", req.body);

        const images = Array.isArray(req.files)
            ? req.files.map((file: Express.Multer.File) => ({
                url: `https://nodeapiproject-shop.onrender.com/uploads/${file.filename}`,
            }))
            : [];

        const pageData: IPage = {
            ...req.body,
            components: JSON.parse(req.body.components || '[]').map((component: IPageComponent, index: number) => ({
                ...component,
                image: component.type === 'image' && images[index] ? images[index] : undefined,
            })),
            createdAt: new Date(),
        };

        console.log("Page data to be saved:", pageData); // לוגים לבדיקה

        const result = await pageService.createPage(pageData, req.payload._id);
        res.status(201).json(result);
    } catch (e) {
        console.error("Error during page creation:", e); // לוגים לשגיאה
        next(e);
    }
}); */



// עדכון עמוד קיים
router.put("/:id", ...isAdmin, upload.single("image"), async (req, res, next) => {
    try {
        if (!req.payload) {
            throw new Error("Invalid token");
        }

        const imageUrl = req.file ? `https://nodeapiproject-shop.onrender.com/uploads/${req.file.filename}` : req.body.imageUrl;

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
