import { BaseError } from './base-error';

class BadRequest extends BaseError {
  override get name(): string {
    return 'BadRequest';
  }
}

export { BadRequest };
