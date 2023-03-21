import styled from "@emotion/styled";
import { Alert, Typography } from "@mui/material";
import { grey, red, teal } from "@mui/material/colors";

export const AlertStyled = styled(Alert)`
  background-color: ${red["900"]};
  color: ${red["50"]};
  margin-bottom: 10px;

  .MuiAlert-icon {
    color: ${red["50"]};
  }
`;

export const MyForm = styled.form`
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;
export const MyFormSubtitle = styled(Typography)`
  padding: 0;
  color: ${teal["600"]};
  margin: 0 0 20px;
  font-weight: 500;
`;

export const ModalScrollable = styled.div`
  height: 100%;
  max-height: calc(100% - 60px);
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  position: absolute;
  left: 0;
  padding: 0 20px 20px;
  background: none;
`;

export const Container = styled.section`
  background: ${grey[900]};
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Wrapper = styled.section`
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

export const BodyContainer = styled.section<{ isFullHeight?: boolean }>`
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  width: 100%;
  padding: 16px;
  background-color: ${grey["900"]};
  height: ${({ isFullHeight }) =>
    isFullHeight ? "100%" : "calc(100% - 64px)"};
`;
