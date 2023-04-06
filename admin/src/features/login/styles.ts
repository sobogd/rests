import { styled } from "@mui/material";

export const LoginBackIconButton = styled("button")`
  cursor: pointer;
  position: absolute;
  top: -20px;
  left: -20px;
  background: #07facb;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  padding: 9px;
  svg {
    color: black;
    font-size: 22px;
  }

  :hover {
    background: #661fe7;

    svg {
      color: white;
    }
  }
`;
