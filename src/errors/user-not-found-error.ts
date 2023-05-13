import { BaseError } from './base-error';

class UserNotFoundError extends BaseError {
  override get name(): string {
    return 'UserNotFoundError';
  }
}

export { UserNotFoundError };
