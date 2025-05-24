import { createLogger, format, transports } from "winston";
import { NODE_ENV } from "../config";
import "winston-daily-rotate-file";
import path from "path";

// Set up log directory
const logDirectory = path.resolve(path.join(__dirname, "../../"), "logs");

// Custom log format to include function name, location, and data
const consoleFormat = format.printf(({ timestamp, level, message, stack, location, statusCode, url, data }) => {
    const logLevel = level.toUpperCase();
    const locationInfo = location ? ` | Location: ${location}` : "";
    const statusCodeInfo = statusCode ? ` | Status Code: ${statusCode}` : "";
    const urlInfo = url ? ` | URL: ${url}` : "";
    const dataInfo = data ? ` | Data: ${JSON.stringify(data)}` : "";

    return `${timestamp} ${logLevel} [${message}] \n \x1b[36m${locationInfo}\x1b[0m${statusCodeInfo}  ${stack ? `\nStack: ${stack}` : ""}${urlInfo}${dataInfo}`;
});

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
        format.json(),
    ),
    transports: [
        new transports.DailyRotateFile({
            filename: path.join(logDirectory + "/error", "%DATE%.log"),
            datePattern: "DD-MM-YYYY",
            level: "error",
            maxSize: "20m",
            maxFiles: "14d",
            zippedArchive: true,
            format: format.combine(skipFileLogs(), format.json()),
        }),
        new transports.DailyRotateFile({
            filename: path.join(logDirectory + "/combined", "%DATE%.log"),
            datePattern: "DD-MM-YYYY",
            maxSize: "20m",
            maxFiles: "14d",
            zippedArchive: true,
            format: format.combine(skipFileLogs(), format.json()),
        }),
    ],
});

if (NODE_ENV !== "production") {
    logger.add(
        new transports.Console({
            format: format.combine(
                format.timestamp({ format: "HH:mm:ss" }),
                format.colorize({ all: false, message: true, level: true, colors: { info: "blue", error: "red", warn: "yellow", debug: "green" } }),
                consoleFormat
            )
        })
    );
}

export default logger;