import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { backgroundDefault, primaryColor } from "../app/styles";

export const LoadingContainer = styled.div<{ isLoading: boolean }>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${backgroundDefault};
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${({ isLoading }) => (isLoading ? "initial" : "none")};
  opacity: ${({ isLoading }) => (isLoading ? "1" : "0")};

  svg {
    color: ${primaryColor};
  }
`;

const Loading: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return (
    <LoadingContainer isLoading={isLoading}>
      <CircularProgress />
    </LoadingContainer>
  );
};

export default Loading;
