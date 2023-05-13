import { BaseError } from './base-error';

class MongoServerError extends BaseError {
  override get name(): string {
    return 'MongoServerError';
  }
}

export { MongoServerError };
