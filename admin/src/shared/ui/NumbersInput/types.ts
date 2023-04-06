import { ENumbersButtonType } from "./enums";

export type TNumbersInputProps = {
  maxLength: number;
  onFinishInput: (numbers: string) => void;
};

export type TNumberInputButton = { letter: string; type: ENumbersButtonType };
