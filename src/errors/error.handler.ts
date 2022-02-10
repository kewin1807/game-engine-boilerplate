import {
  Application,
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from "express";
import { ApplicationError } from "./app.error";
import logger from "../logger";

export default function (app: Application) {
  app.use(() => {
    throw new ApplicationError(400, "This route is not correct");
  });

  // request error handler
  app.use(
    (
      err: ApplicationError,
      _req: ExpressRequest,
      res: ExpressResponse,
      next: NextFunction
    ) => {
      if (err instanceof ApplicationError) {
        if (err.message) {
          logger.error(err.message);
          return res
            .status(err.code)
            .send({ errorCode: err.code, message: err.message });
        } else {
          return res.sendStatus(err.code);
        }
      }

      next(err);
    }
  );

  // Log all errors
  app.use(function (
    err: any,
    req: ExpressRequest,
    _res: ExpressResponse,
    next: NextFunction
  ) {
    if (err instanceof Error) {
      logger.error(
        `${req.method} ${req.path}: Unhandled request error. ${err.message}`
      );
    } else if (typeof err === "string") {
      logger.error(
        `${req.method} ${req.path}: Unhandled request error. ${err}`
      );
    }

    next(err);
  });

  // Optional fallthrough error handler
  app.use(function onError(
    err: Error,
    _req: ExpressRequest,
    res: ExpressResponse,
    _next: NextFunction
  ) {
    res.statusCode = 500;
    res.end(err.message + "\n");
  });
}
