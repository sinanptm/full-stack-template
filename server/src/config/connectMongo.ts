import { MONGO_URI } from ".";
import { connect } from "mongoose";
import logger from "@/utils/logger";

const connectMongo = async () => {
  try {
    await connect(MONGO_URI);
    logger.info("Connected to MongoDB", { meta: { skipFile: true } });
  } catch (err) {
    logger.error("Mongoose connection error:", err);
    throw err;
  }
};

export default connectMongo;
