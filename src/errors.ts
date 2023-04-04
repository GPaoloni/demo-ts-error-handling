export class NotExistsError extends Error {
  cause: Error;

  constructor(error: Error) {
    super(error.message);
    this.cause = error;
    this.name = 'NotExistsError';
    Object.setPrototypeOf(this, NotExistsError.prototype);
  }
}