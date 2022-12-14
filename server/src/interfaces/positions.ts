export interface IPosition {
  id?: number;
  name: string;
  description: string;
  price: string;
  isAdditional: boolean;
}

export interface ICreatePositionRequest extends IPosition {
  categories: { categoryId: number }[];
  composition: { element: number; weight: string }[];
  additional: { positionId: number }[];
}
