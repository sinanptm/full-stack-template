import { createLogger, format, transports } from "winston";
import { NODE_ENV } from "../config";
import "winston-daily-rotate-file";
import path from "path";

const logDirectory = path.resolve(path.join(__dirname, "../../"), "logs");

const consoleFormat = format.printf(
  ({ timestamp, level, message, stack, location, statusCode, url, data }) => {
    const logLevel = level.toUpperCase();
    let output = `${timestamp} ${logLevel}`;
    output += `Message: ${message}`;

    if (location) {
      output += `\x1b[36mLocation: ${location}\x1b[0m`;
    }
    if (statusCode) {
      output += `Status Code: ${statusCode}`;
    }
    if (url) {
      output += `URL: ${url}`;
    }
    if (data) {
      output += `Data: ${JSON.stringify(data, null, 2)}`;
    }
    if (stack) {
      output += `Stack: ${stack}`;
    }

    return output;
  },
);

const fileFormat = format.printf(
  ({ timestamp, level, message, stack, location, statusCode, url, data }) => {
    const logLevel = level.toUpperCase();
    let output = `${timestamp} ${logLevel}\n`;
    output += `Message: ${message}\n`;

    if (location) {
      output += `Location: ${location}\n`;
    }
    if (statusCode) {
      output += `Status Code: ${statusCode}\n`;
    }
    if (url) {
      output += `URL: ${url}\n`;
    }
    if (data) {
      output += `Data: ${JSON.stringify(data, null, 2)}\n`;
    }
    if (stack) {
      output += `Stack: ${stack}\n`;
    }

    return output; 
  },
);

const skipFileLogs = format((info) => {
  // @ts-ignore
  if (info.meta?.skipFile) {
    return false; // Drop the log from this transport
  }
  return info;
});

// Logger setup with daily file rotation
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "DD-MM-YYYY HH:mm" }),
    format.errors({ stack: true }),
    format.splat(),
  ),
  transports: [
    new transports.DailyRotateFile({
      filename: path.join(logDirectory + "/error", "%DATE%.log"),
      datePattern: "DD-MM-YYYY",
      level: "error",
      maxSize: "20m",
      maxFiles: "14d",
      zippedArchive: true,
      format: format.combine(skipFileLogs(), fileFormat),
    }),
    new transports.DailyRotateFile({
      filename: path.join(logDirectory + "/combined", "%DATE%.log"),
      datePattern: "DD-MM-YYYY",
      maxSize: "20m",
      maxFiles: "14d",
      zippedArchive: true,
      format: format.combine(skipFileLogs(), fileFormat),
    }),
  ],
});

if (NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: "HH:mm:ss" }),
        format.colorize({
          all: false,
          message: true,
          level: true,
          colors: { info: "blue", error: "red", warn: "yellow", debug: "green" },
        }),
        consoleFormat,
      ),
    }),
  );
}

export default logger;