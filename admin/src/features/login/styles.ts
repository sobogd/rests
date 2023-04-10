import { styled } from "@mui/material";
import { primaryColor, secondaryColor } from "../../app/styles";

export const LoginBackIconButton = styled("button")`
  cursor: pointer;
  position: absolute;
  top: -20px;
  left: -20px;
  background: ${secondaryColor};
  height: 40px;
  width: 40px;
  border-radius: 20px;
  padding: 9px;
  svg {
    color: black;
    font-size: 22px;
  }

  :hover {
    background: ${primaryColor};

    svg {
      color: white;
    }
  }
`;
