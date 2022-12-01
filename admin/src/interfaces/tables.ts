export interface ITableImage {
  filePath?: string;
}

export interface ITable {
  id: string;
  number: string;
  name: string;
  positionX: string;
  positionY: string;
}

export interface ITablesState {
  items: ITable[];
  form: { [Key in keyof ITable]: { value: string; error: string } };
  imageSrc?: string;
  isLoading: boolean;
  isOpenForm: boolean;
  isOpenYouSure: boolean;
  error: string;
}
