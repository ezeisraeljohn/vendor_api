const winston = require("winston");
const util = require("util");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

// Define the logs directory path (Don't modify now)

const logDir = path.join(__dirname, "../../logs");

// Ensure the logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Create a new winston logger instance
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      const metaString =
        meta && Object.keys(meta).length
          ? util.inspect(meta, { depth: null })
          : "";
      return `${timestamp} ${level}: ${message} ${metaString}`;
    })
  ),
  defaultMeta: {
    service: process.env.APP_NAME || "vendor_api",
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
      level: "info",
    }),
  ],
});

module.exports = logger;
