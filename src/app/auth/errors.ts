export class UserNotFoundException extends Error {
  constructor(message: string) {
  super(message);
  // Set the prototype explicitly.
  Object.setPrototypeOf(this, UserNotFoundException.prototype);
  }

}
