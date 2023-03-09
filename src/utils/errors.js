export class ServerError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

export class ResourceNotFoundError extends ServerError {
  constructor(message) {
    super(message, 404);
  }
}
