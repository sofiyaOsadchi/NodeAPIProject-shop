import { Schema } from "mongoose";
import { IPage, IPageComponent, IImage } from "../../@types/@types";


const PageComponentSchema = new Schema<IPageComponent>({
    type: { type: String, required: true },
    content: { type: String },
    image: { url: { type: String } }, // רק URL לתמונה
    alt: { type: String },
    styles: {
        color: { type: String },
        fontSize: { type: String },
    },
    position: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
    },
});

const PageSchema = new Schema<IPage>({
    title: { type: String, required: true },
    components: [PageComponentSchema],
    createdAt: { type: Date, default: Date.now },
});
