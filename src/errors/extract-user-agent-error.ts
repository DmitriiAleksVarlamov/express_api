import { BaseError } from './base-error';

class ExtractUserAgentError extends BaseError {
  override get name(): string {
    return 'ExtractUserAgentError';
  }
}

export { ExtractUserAgentError };
