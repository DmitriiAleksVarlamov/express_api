import { BaseError } from './base-error';

class ServerError extends BaseError {
  override get name(): string {
    return 'ServerError';
  }
}

export { ServerError };
