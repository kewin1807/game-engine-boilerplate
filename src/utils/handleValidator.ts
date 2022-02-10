import { ApplicationError } from "@errors/app.error";
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from "express";
import { ValidationError, validationResult } from "express-validator";

export function handleValidatorMessage(
  req: ExpressRequest,
  _res: ExpressResponse,
  next: NextFunction
) {
  const errorFormatter = ({ location, msg, param }: ValidationError) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${location}[${param}]: ${msg}`;
  };
  const errorValidation = validationResult(req).formatWith(errorFormatter);
  if (!errorValidation.isEmpty()) {
    throw new ApplicationError(400, errorValidation.array()[0]);
  }
  next();
}
