import { BaseError } from './base-error';

class FileNotFoundError extends BaseError {
  override get name(): string {
    return 'FileNotFoundError';
  }
}

export { FileNotFoundError };
