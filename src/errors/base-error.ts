import { StatusCode } from '../constants';

class BaseError extends Error {
  cause?: Error;
  code?: number;

  constructor(message: string | Error, code?: StatusCode) {
    if (message instanceof Error) {
      super(message.message);
      this.cause = message;
      this.code = code;
    } else {
      super(message);
      this.code = code;
    }
  }

  override get name(): string {
    return 'BaseError';
  }
}

export { BaseError };
