import styled from "@emotion/styled";
import { Alert, BottomNavigation, Divider, TextField, Typography } from "@mui/material";
import { grey, red, teal } from "@mui/material/colors";

export const Container = styled.section`
  background: ${grey[900]};
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
`;

export const ScrollableZone = styled.section`
  height: 100%;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  padding: 20px;
`;

export const TextFieldStyled = styled(TextField)`
  input {
    transition: 0.1s;
    margin: 0 -10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .Mui-focused {
    color: ${teal["A100"]} !important;
  }
  .Mui-error {
    color: ${red["400"]} !important;
    :after {
      border-bottom: 1px solid ${red["400"]} !important;
    }
  }
  input: {
    color: ${teal["A100"]};
  }
  :hover {
    ::before {
      border-bottom: 1px solid #7c7c7c;
    }
  }
  .MuiInputBase-root {
    :hover {
      :not(.Mui-disabled) {
        :before {
          border-bottom: 1px solid ${grey[500]};
        }
      }
    }
    :before {
      border-bottom: 1px solid ${grey[600]};
    }
    :after {
      border-bottom: 1px solid ${teal["A100"]};
    }
  }
`;

export const AlertStyled = styled(Alert)`
  background-color: ${red["900"]};
  color: ${red["50"]};
  margin-bottom: 10px;

  .MuiAlert-icon {
    color: ${red["50"]};
  }
`;

export const DividerStyled = styled(Divider)`
  background: ${teal["600"]};
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

export const BottomNavigationStyled = styled(BottomNavigation)`
  background: ${teal[800]};
  width: 100%;
  height: 60px;
  min-height: 60px;
  flex-grow: 1;

  .MuiButtonBase-root svg {
    color: ${grey[900]} !important;
  }

  .Mui-selected {
    color: ${teal[100]} !important;
    svg {
      color: ${teal[100]} !important;
    }
  }
`;
