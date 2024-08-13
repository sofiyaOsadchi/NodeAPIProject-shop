import { model } from 'mongoose';
import { IPage } from '../../@types/@types';
import { PageSchema } from '../schemas/page-schema';

const Page = model<IPage>('Page', PageSchema);

export default Page;
