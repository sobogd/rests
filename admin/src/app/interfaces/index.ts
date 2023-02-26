export interface IFormData {
  error: string;
  value: string;
}

export interface IErrorWithFields {
  fields: string[];
  message: string;
  code: string;
}

export interface IErrorResponse {
  rejectValue: { fields?: string[]; message?: string; code?: string };
}
