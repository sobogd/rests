export default class FieldsError extends Error {
  public fields: string;

  constructor(fields: string) {
    super(fields);
    this.fields = fields;
  }
}
