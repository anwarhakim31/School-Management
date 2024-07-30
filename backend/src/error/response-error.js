class ResponseError extends Error {
  constructor(status, message) {
    props(message);
    this.status = status;
  }
}

export default ResponseError;
