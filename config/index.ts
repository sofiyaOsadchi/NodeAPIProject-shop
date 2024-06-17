import { config } from "dotenv";

const configDevEnv = () => {
  //טעינה של הקובץ הראשי לפרויקט
  config({ path: "config/.env" });

  const mode = process.env.NODE_ENV; //dev|test|prod

  //טעינה של  קובץ הסביבה הפרטני
  config({ path: `config/${mode}.env` });
};

export default configDevEnv;