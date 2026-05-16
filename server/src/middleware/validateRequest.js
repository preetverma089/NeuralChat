import { validationResult } from "express-validator";

/**
 * Reads express-validator results and short-circuits with 422 if invalid.
 * Keeps controllers clean — no manual validationResult() calls needed.
 */
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }
  next();
};
