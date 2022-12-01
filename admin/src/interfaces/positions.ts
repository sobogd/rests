// export interface IMenuState {
//   id: string;
//   isOpenForm: boolean;
//   isLoading: boolean;
//   form: IMenuForm;
//   error: string;
// }

// export interface IMenuForm {
//   name: IMenuFormData;
//   description: IMenuFormData;
//   weight: IMenuFormData;
//   price: IMenuFormData;
//   composition: {
//     element: IMenuFormData;
//     weight: IMenuFormData;
//   }[];
// }

// export interface IMenuFormData {
//   value: string;
//   error: string;
// }

// export interface IMenuFormInputs {
//   name: string;
//   description: string;
//   composition: string;
//   weight: number;
//   price: number;
// }

// export interface IPosition {

// }

// export interface IPositionsState {
//   items: IPosition[];
//   form: { [Key in keyof IPosition]: { value: string; error: string } };
//   isLoading: boolean;
//   isOpenForm: boolean;
//   isOpenYouSure: boolean;
//   error: string;
// }

export interface IPosition {
  id: string;
  name: string;
  description: string;
  price: string;
  composition: IPositionComposition[];
  categories: IPositionCategory[];
  additional: IPositionAdditional[];
  isAdditional: boolean;
}

export interface IPositionValues {
  id: string;
  name: string;
  description: string;
  price: string;
}

export interface IPositionComposition {
  element: string;
  weight: string;
}

export interface IPositionCategory {
  categoryId: string;
}

export interface IPositionAdditional {
  positionId: string;
}

export interface IPositionsState {
  items: IPosition[];
  form: {
    values: { [Key in keyof IPositionValues]: { value: string; error: string } };
    composition: { [Key in keyof IPositionComposition]: { value: string; error: string } }[];
    categories: { [Key in keyof IPositionCategory]: { value: string; error: string } }[];
    additional: { [Key in keyof IPositionAdditional]: { value: string; error: string } }[];
    isAdditional: boolean;
  };
  isLoading: boolean;
  isOpenForm: boolean;
  isOpenYouSure: boolean;
  error: string;
}
