export interface IElement {
  id: string;
  element: string;
  price: string;
  priceForCount: string;
}

export interface IElementState {
  items: IElement[];
  form: { [Key in keyof IElement]: { value: string; error: string } };
  isLoading: boolean;
  isOpenForm: boolean;
  isOpenYouSure: boolean;
  error: string;
}
