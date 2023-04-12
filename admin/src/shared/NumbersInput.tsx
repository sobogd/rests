import React from "react";
import { styled } from "@mui/material";
import { primaryColor, secondaryColor } from "../app/styles";

type TNumbersInputProps = {
  maxLength: number;
  onFinishInput: (numbers: string) => void;
};

type TNumberInputButton = { letter: string; type: ENumbersButtonType };

enum ENumbersButtonType {
  CLEAR_ONE = "CLEAR_ONE",
  CLEAR_ALL = "CLEAR_ALL",
  NUMBER = "NUMBER",
}

const CNumberButtons: TNumberInputButton[][] = [
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

const NumbersInputedButton = styled("span")`
  height: 50px;
  font-size: 19px;
  width: 50px;
  margin: 5px;
  border-radius: 10px;
  box-shadow: 0px 4px 35px rgba(43, 13, 98, 0.1);
  background: #f9f7ff;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NumbersInputButton = styled("button")<{
  buttonType: ENumbersButtonType;
}>`
  height: 50px;
  font-size: 19px;
  width: 50px;
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 2px 2px 7px -3px ${primaryColor};
  background: ${primaryColor};
  font-weight: 500;
  background: ${({ buttonType }) => {
    switch (buttonType) {
      case ENumbersButtonType.CLEAR_ALL:
        return secondaryColor;
      case ENumbersButtonType.CLEAR_ONE:
        return secondaryColor;
      default:
        return primaryColor;
    }
  }};
  color: ${({ buttonType }) => {
    switch (buttonType) {
      case ENumbersButtonType.CLEAR_ALL:
        return "white";
      case ENumbersButtonType.CLEAR_ONE:
        return "white";
      default:
        return "white";
    }
  }};

  :hover {
    background: ${({ buttonType }) => {
      switch (buttonType) {
        case ENumbersButtonType.CLEAR_ALL:
          return primaryColor;
        case ENumbersButtonType.CLEAR_ONE:
          return primaryColor;
        default:
          return secondaryColor;
      }
    }};
    color: ${({ buttonType }) => {
      switch (buttonType) {
        case ENumbersButtonType.CLEAR_ALL:
          return "white";
        case ENumbersButtonType.CLEAR_ONE:
          return "white";
        default:
          return "black";
      }
    }};
  }
`;

const NumbersInputLine = styled("div")`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const NumbersInputBox = styled("div")`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

const NumbersInput: React.FC<TNumbersInputProps> = ({
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

export default NumbersInput;
