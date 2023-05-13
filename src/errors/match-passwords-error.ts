import { BaseError } from './base-error';

class MatchPasswordsError extends BaseError {
  override get name(): string {
    return 'MatchPasswordsError';
  }
}

export { MatchPasswordsError };
