export class HttpError extends Error {
  private _code: number;

  constructor(code: number, message: string) {
    super(message)
    this._code = code;
  }

  getCode(): number {
    return this._code
  }

}
