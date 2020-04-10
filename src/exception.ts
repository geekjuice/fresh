export class Exception extends Error {
  public code: number;

  constructor(message?: string, code = 1) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}

export default (message?: string, code?: number): Exception =>
  new Exception(message, code);
