import logger from "@/utils/logger";
import connectMongo from "./connectMongo";

export const initConfig = async () => {
  try {
    await connectMongo();
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};
