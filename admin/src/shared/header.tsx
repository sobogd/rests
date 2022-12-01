import React from "react";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import { textDefaultColor } from "../styles/theme";
import { grey } from "@mui/material/colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const HeaderContainer = styled.header<{ isSpaceBetween: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ isSpaceBetween }) => (isSpaceBetween ? "space-between" : "flex-start")};
  border-bottom: 1px solid ${grey[800]};
  padding-bottom: 15px;
  margin-bottom: 20px;
`;

const ButtonBack = styled.button`
  width: 24px;
  height: 24px;
  margin-right: 15px;
`;

const ButtonAdd = styled.button`
  width: 24px;
  height: 24px;
  margin-left: 14px;
`;

const Header: React.FC<{ title: string; onClickBack?: () => void; onClickAdd?: () => void }> = ({
  title,
  onClickBack,
  onClickAdd,
}) => {
  return (
    <HeaderContainer isSpaceBetween={!!onClickAdd}>
      {onClickBack && (
        <ButtonBack onClick={onClickBack}>
          <ArrowBackIcon sx={{ color: textDefaultColor }} />
        </ButtonBack>
      )}
      <Typography variant="h1" component="h1">
        {title}
      </Typography>
      {onClickAdd && (
        <ButtonAdd onClick={onClickAdd}>
          <AddCircleOutlineIcon sx={{ color: textDefaultColor }} />
        </ButtonAdd>
      )}
    </HeaderContainer>
  );
};

export default Header;
