import { sendErrorNotFound, sendFromError, sendResult } from "modules/response";

export function apiWrapper(
  method,
  fn
) {
  return async (req, res) => {
    try {
      switch (req.method.toLowerCase()) {
        case method:
          let result = await fn(req, res);
          sendResult(res, result);
          break;

        default:
          sendErrorNotFound(res);
          break;
      }
    } catch (err) {
      sendFromError(res, err);
    }
  };
}