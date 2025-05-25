import express from "express";
import { CLIENT_URL, PORT } from "./config";
import { initConfig } from "./config/initConfig";
import router from "./presentation/routes";
import logger from "./utils/logger";
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({ origin: CLIENT_URL, credentials: true }));
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
