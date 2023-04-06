import styled from "@emotion/styled";
import {
  primaryColor,
  secondaryColor,
  textDefaultColor,
  textDefaultWhiteColor,
} from "../../../app/styles";

export const TableSetBlock = styled.div<{
  positionY: string;
  positionX: string;
  isSelected: boolean;
}>`
  position: absolute;
  width: 35px;
  height: 35px;
  margin: -13px;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${textDefaultColor};
  bottom: ${(p) => p.positionY}%;
  left: ${(p) => p.positionX}%;
  background: ${(p) => (!p.isSelected ? secondaryColor : primaryColor)};

  svg {
    color: ${(p) => (!p.isSelected ? textDefaultColor : textDefaultWhiteColor)};
  }
`;

export const TableSelectWrapper = styled.div`
  position: relative;
  width: calc(100vw - 32px);
  height: calc(100vw - 32px);
  overflow: hidden;
  max-width: 500px;
  max-height: 500px;
  border-radius: 10px;
  box-shadow: 1px 1px 11px -3px rgb(102 31 231 / 23%);
`;

export const AdditionalCalc = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  span {
    justify-content: center;
    font-size: 20px;
    padding: 0 20px;
  }
`;
