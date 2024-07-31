import ResponseError from "../error/response-error.js";

const errorMiddleware = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res.status(err.status).json({ success: false, message: err.message }).end();
  } else {
    res
      .status(500)
      .json({
        success: false,
        message: err.message,
      })
      .end();
  }
};

export default errorMiddleware;
