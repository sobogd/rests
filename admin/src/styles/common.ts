import styled from "@emotion/styled";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  BottomNavigation,
  Box,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { grey, red, teal } from "@mui/material/colors";
import { backgroundDefault } from "./theme";

export const Container = styled.section`
  background: ${grey[900]};
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ScrollableZone = styled.section`
  height: 100%;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  padding: 20px;
  width: 100%;
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

export const AccordionSummaryStyled = styled(AccordionSummary)`
  background: #2f2f2f;
  min-height: auto !important;

  &.Mui-expanded {
    background: #01695c;
  }

  .Mui-expanded {
    margin: 12px 0 !important;
  }

  .MuiTypography-body2 {
    color: #9c9c9c;
  }

  .MuiAccordionSummary-content {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const AccordionStyled = styled(Accordion)`
  background: ${backgroundDefault};
  box-shadow: none;
`;

export const AccordionDetailsStyled = styled(AccordionDetails)`
  border: 1px solid #01695c;
`;

export const ScrollableBox = styled(Box)`
  height: 100%;
  max-height: calc(100% - 60px);
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  width: 100%;
  position: absolute;
  left: 0;
  padding: 0 30px;
  background: none;
`;

export const ModalStyled = styled(Modal)`
  width: 100%;
`;

export const ModalTitle = styled.h2`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  width: calc(100% + 60px);
  margin: -30px;
  background: #5e5e5e;
`;

export const ModalScrollable = styled.div`
  height: 100%;
  max-height: calc(100% - 60px);
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  width: 100%;
  position: absolute;
  left: 0;
  padding: 0 20px 20px;
  background: none;
`;
