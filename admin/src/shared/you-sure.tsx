import { Button, Typography } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { teal } from "@mui/material/colors";

const YouSureContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000000cf;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${({ isOpen }) => (isOpen ? "initial" : "none")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
`;

const YouSureModal = styled.div`
  background: ${teal[50]};
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

const YouSureText = styled(Typography)`
  color: ${teal[800]};
`;

const YouSureButtons = styled.div`
  display: flex;
  flex-direction: revert;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;

  button {
    width: 100%;
    margin: 0 10px;
  }
`;

const YouSure: React.FC<{
  onClickYes?: () => void;
  onClickNo?: () => void;
  isOpen: boolean;
  title?: string;
  onClickYesText?: string;
  onClickNoText?: string;
}> = ({
  onClickYes,
  onClickNo,
  isOpen,
  title,
  onClickYesText,
  onClickNoText,
}) => (
  <YouSureContainer isOpen={isOpen}>
    <YouSureModal>
      <YouSureText>{title || "Вы уверены?"}</YouSureText>
      <YouSureButtons>
        {!!onClickNo && (
          <Button color="error" variant="outlined" onClick={onClickNo}>
            {onClickNoText || "Нет"}
          </Button>
        )}
        {!!onClickYes && (
          <Button variant="contained" onClick={onClickYes}>
            {onClickYesText || "Да"}
          </Button>
        )}
      </YouSureButtons>
    </YouSureModal>
  </YouSureContainer>
);

export default YouSure;
