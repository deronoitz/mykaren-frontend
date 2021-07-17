export function sendError(res, error) {
  res.status(error.code).json(error);
}

export function sendErrorNotFound(res) {
  return sendError(res, {
    code: 404,
    name: "not-found",
    message: "Not found",
  });
}
export function sendFromError(res, e) {
  let code = 500;
  let name = e.errorInfo?.code || e.code || e.name;

  if (e.message === "Token is expired.") {
    code = 401;
    name = "auth/token-expired";
  }

  return sendError(res, {
    code,
    name,
    message: e.message,
  });
}

export function sendResult(res,data) {
  res.status(200).json({
    message: "Success",
    data,
  });
}