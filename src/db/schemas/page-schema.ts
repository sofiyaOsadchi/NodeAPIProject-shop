import { Schema } from 'mongoose';
import { IPage, IPageComponent } from '../../@types/@types';

// סכמה עבור רכיב בעמוד
export const PageComponentSchema = new Schema<IPageComponent>({
    type: { type: String, required: true },
    content: { type: String, required: true },
    styles: {
        color: { type: String },
        fontSize: { type: String },
    },
    position: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
    },
}, { _id: false });

// סכמה עבור עמוד
export const PageSchema = new Schema<IPage>({
    title: { type: String, required: true },
    components: [PageComponentSchema],
    createdAt: { type: Date, default: Date.now },
});
