import express from "express";
import { PORT } from "./config";
import { initConfig } from "./config/initConfig";
import router from "./presentation/routes";
import logger from "./utils/logger";
import cookieParser from 'cookie-parser'

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(PORT, async () => {
  await initConfig();
  logger.info(`Running on http://localhost:${PORT} ✅`, {
    meta: { skipFile: true },
  });
});

// TODO Implement redis
// TODO add docker
