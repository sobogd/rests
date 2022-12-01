export interface ICategory {
  id: string;
  name: string;
  description: string;
}

export interface ICategoriesState {
  items: ICategory[];
  form: { [Key in keyof ICategory]: { value: string; error: string } };
  isLoading: boolean;
  isOpenForm: boolean;
  isOpenYouSure: boolean;
  error: string;
}
