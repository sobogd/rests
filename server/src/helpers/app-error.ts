export default class AppError extends Error {
  public code: number;
  public message: any;

  constructor(code: number, message: any) {
    super(message);
    this.code = code;
    this.message = message;
  }
}
