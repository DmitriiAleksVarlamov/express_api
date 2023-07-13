import { BaseError } from './base-error';

class UrlNotFoundError extends BaseError {
  override get name(): string {
    return 'UrlNotFoundError';
  }
}

export { UrlNotFoundError };
