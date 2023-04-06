import { styled } from "@mui/material";
import { ENumbersButtonType } from "./enums";

export const NumbersInputedButton = styled("span")`
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

export const NumbersInputButton = styled("button")<{
  buttonType: ENumbersButtonType;
}>`
  height: 50px;
  font-size: 19px;
  width: 50px;
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 2px 2px 7px -3px #661fe7;
  background: #661fe7;
  font-weight: 500;
  background: ${({ buttonType }) => {
    switch (buttonType) {
      case ENumbersButtonType.CLEAR_ALL:
        return "#07facb";
      case ENumbersButtonType.CLEAR_ONE:
        return "#07facb";
      default:
        return "#661fe7";
    }
  }};
  color: ${({ buttonType }) => {
    switch (buttonType) {
      case ENumbersButtonType.CLEAR_ALL:
        return "black";
      case ENumbersButtonType.CLEAR_ONE:
        return "black";
      default:
        return "white";
    }
  }};

  :hover {
    background: ${({ buttonType }) => {
      switch (buttonType) {
        case ENumbersButtonType.CLEAR_ALL:
          return "#661fe7";
        case ENumbersButtonType.CLEAR_ONE:
          return "#661fe7";
        default:
          return "#07facb";
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

export const NumbersInputLine = styled("div")`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const NumbersInputBox = styled("div")`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;
