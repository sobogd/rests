import { ENumbersButtonType } from "./enums";
import { TNumberInputButton } from "./types";

export const CNumberButtons: TNumberInputButton[][] = [
  [
    { letter: "1", type: ENumbersButtonType.NUMBER },
    { letter: "2", type: ENumbersButtonType.NUMBER },
    { letter: "3", type: ENumbersButtonType.NUMBER },
  ],
  [
    { letter: "4", type: ENumbersButtonType.NUMBER },
    { letter: "5", type: ENumbersButtonType.NUMBER },
    { letter: "6", type: ENumbersButtonType.NUMBER },
  ],
  [
    { letter: "7", type: ENumbersButtonType.NUMBER },
    { letter: "8", type: ENumbersButtonType.NUMBER },
    { letter: "9", type: ENumbersButtonType.NUMBER },
  ],
  [
    { letter: "<", type: ENumbersButtonType.CLEAR_ONE },
    { letter: "0", type: ENumbersButtonType.NUMBER },
    { letter: "x", type: ENumbersButtonType.CLEAR_ALL },
  ],
];
