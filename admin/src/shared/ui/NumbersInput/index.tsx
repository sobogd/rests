import React from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  NumbersInputBox,
  NumbersInputButton,
  NumbersInputedButton,
  NumbersInputLine,
} from "./styles";
import { ENumbersButtonType } from "./enums";
import { CNumberButtons } from "./consts";
import { TNumbersInputProps } from "./types";

export const NumbersInput: React.FC<TNumbersInputProps> = ({
  onFinishInput,
  maxLength,
}) => {
  const [numbers, setNumbers] = React.useState<string>("");

  const handleClickKeyboard = (target: any) => {
    console.log({ target });
  };

  React.useEffect(() => {
    const allowedLetters = ["1", "2", "3", "4", "5", "7", "8", "6", "9", "0"];

    const onKeypress = (e: any) => {
      if (allowedLetters.includes(e.key)) handleClickNumber(e.key);
      if (e.key === "Backspace") handleClearLastNumber();
    };

    document.addEventListener("keydown", onKeypress);
    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, [numbers]);

  React.useEffect(() => {
    if (numbers.length === maxLength) {
      onFinishInput(numbers);
      setNumbers("");
    }
  }, [numbers]);

  const handleClickNumber = (number: string) => {
    if (numbers.length < maxLength) setNumbers(numbers + number);
  };

  const handleClearLastNumber = () => {
    if (numbers.length) setNumbers(numbers.slice(0, -1));
  };

  const handleClearAllNumbers = () => {
    if (numbers.length) setNumbers("");
  };

  const handleClickButton = (type: ENumbersButtonType, value: string) => () => {
    switch (type) {
      case ENumbersButtonType.CLEAR_ALL:
        return handleClearAllNumbers();
      case ENumbersButtonType.CLEAR_ONE:
        return handleClearLastNumber();
      case ENumbersButtonType.NUMBER:
        handleClickNumber(value);
    }
  };

  return (
    <>
      <NumbersInputLine>
        {Array(maxLength)
          .fill("")
          .map((_, index) => (
            <NumbersInputedButton key={index}>
              {numbers[index]}
            </NumbersInputedButton>
          ))}
      </NumbersInputLine>
      <NumbersInputBox>
        {CNumberButtons.map((numbersRow, index) => (
          <NumbersInputLine key={index + numbersRow[0].letter}>
            {numbersRow.map(({ letter, type }) => (
              <NumbersInputButton
                buttonType={type}
                onClick={handleClickButton(type, letter)}
                key={letter}
              >
                {letter}
              </NumbersInputButton>
            ))}
          </NumbersInputLine>
        ))}
      </NumbersInputBox>
    </>
  );
};
