import { IPage } from "../@types/@types";
import Page from "../db/models/page-model";

export const pageService = {
    // יצירת עמוד חדש
    createPage: async (data: IPage, userId: string) => {
        const page = new Page({
            ...data,
            userId,
            createdAt: new Date(),
        });
        return page.save();
    },

    // עדכון עמוד קיים
    updatePage: async (id: string, data: IPage) => {
        const page = await Page.findByIdAndUpdate(id, data, { new: true });
        if (!page) throw new Error("Page not found");
        return page;
    },

    // קבלת כל העמודים
    getPages: async () => Page.find(),

    // קבלת עמוד לפי ID
    getPage: async (id: string) => Page.findById(id),

    // מחיקת עמוד
    deletePage: async (id: string) => {
        const page = await Page.findByIdAndDelete(id);
        return page;
    },
};
