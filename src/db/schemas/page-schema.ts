import { Schema } from "mongoose";
import { IPage, IPageComponent, IImage } from "../../@types/@types";
import imageSchema from "./image-schema";

/* // סכמה לתמונה
const ImageSchema = new Schema<IImage>({
    url: { type: String, required: true },
}); */

// סכמה עבור רכיב בעמוד
const PageComponentSchema = new Schema<IPageComponent>({
    type: { type: String, required: true },
    content: { type: String }, // תוכן יכול להיות טקסט, URL לתמונה, וכו'
    image: imageSchema, // מבנה של תמונה
    alt: { type: String }, // תיאור התמונה (alt) מחוץ לשדה התמונה
    styles: {
        color: { type: String },
        fontSize: { type: String },
    },
    position: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
    },
});

// סכמה עבור עמוד
const PageSchema = new Schema<IPage>({
    title: { type: String, required: true },
    components: [PageComponentSchema],
    createdAt: { type: Date, default: Date.now },
});

export default PageSchema;
