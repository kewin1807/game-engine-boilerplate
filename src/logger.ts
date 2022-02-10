import { createLogger, format, transports } from "winston";

const LOG_FILE_PATH = "logs/api.log";

// const file = new transports.File({ filename: LOG_FILE_PATH });
const console = new transports.Console();

// const logFormat = printf(
//   ({ level, message, label: logLabel, timestamp: logTimestamp }) => {
//     return `${logTimestamp} [${logLabel}] ${level}: ${message}`;
//   }
// );

const logger = createLogger({
  transports: new transports.File({
    filename: LOG_FILE_PATH,
    format: format.combine(
      format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
      format.align(),
      format.printf(
        (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
      )
    ),
  }),
});

if (process.env.NODE_ENV !== "production") {
  logger.add(console);
}

export default logger;
