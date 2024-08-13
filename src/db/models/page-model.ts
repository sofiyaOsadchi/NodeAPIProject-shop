import mongoose from "mongoose";
import PageSchema from "../schemas/page-schema";


const Page = mongoose.model("Page", PageSchema);

export default Page;
