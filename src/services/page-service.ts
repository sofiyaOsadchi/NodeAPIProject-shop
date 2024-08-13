import { IPage } from "../@types/@types";
import Page from "../db/models/page-model";


export const createPage = async (pageData: IPage): Promise<IPage> => {
    const newPage = new Page(pageData);
    return await newPage.save();
};

export const getPages = async (): Promise<IPage[]> => {
    return await Page.find();
};

export const updatePage = async (id: string, pageData: Partial<IPage>): Promise<IPage | null> => {
    return await Page.findByIdAndUpdate(id, pageData, { new: true });
};

export const deletePage = async (id: string): Promise<IPage | null> => {
    return await Page.findByIdAndDelete(id);
};
