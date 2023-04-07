import styled from "@emotion/styled";
import { Alert, Modal, Typography } from "@mui/material";
import {
  deepPurple,
  grey,
  indigo,
  purple,
  red,
  teal,
} from "@mui/material/colors";
import {
  backgroundDefault,
  primaryColor,
  textDefaultColor,
  textDefaultWhiteColor,
} from "./theme";

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

export const WrapperScrolled = styled.section`
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
`;

export const BodyContainer = styled.section<{ isFullHeight?: boolean }>`
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  width: 100%;
  background-color: #f9f7ff;
  height: ${({ isFullHeight }) =>
    isFullHeight ? "100%" : "calc(100% - 56px)"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ErrorBox = styled.span`
  box-shadow: 0px 4px 35px rgba(43, 13, 98, 0.1);
  background: rgb(221 18 55 / 2%);
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 10px;
  color: #dd1237;
  margin-bottom: 15px;
  display: flex;
`;

export const ButtonStyled = styled.button<{
  size?: number;
  top?: number;
  bottom?: number;
  background?: string;
  color?: string;
  height?: number;
}>`
  margin-top: ${(p) => p.top + "px" || 0};
  margin-bottom: ${(p) => p.bottom + "px" || 0};
  min-height: ${(p) => p.height || 45}px;
  height: ${(p) => (p.height ? p.height + "px" : "auto")};
  min-width: 45px;
  font-size: ${(p) => p.size || 16}px;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 2px 2px 14px -7px ${(p) => p.background || primaryColor};
  font-weight: 500;
  background: ${(p) => p.background || primaryColor};
  color: ${(p) => p.color || textDefaultWhiteColor};
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${(p) => p.color || textDefaultWhiteColor};
    margin-right: 10px;
  }

  :hover {
    opacity: 0.8;
  }
`;

export const TitleH1 = styled.h1<{
  size?: number;
  top?: number;
  bottom?: number;
}>`
  font-size: ${(p) => p.size || 22}px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  margin-top: ${(p) => p.top + "px" || 0};
  margin-bottom: ${(p) => p.bottom + "px" || 0};
  display: flex;
  width: 100%;
`;

export const TextSpan = styled.span<{
  size?: number;
  top?: number;
  bottom?: number;
  color?: string;
}>`
  font-size: ${(p) => p.size || 15}px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  margin-top: ${(p) => p.top || 0}px;
  margin-bottom: ${(p) => p.bottom || 0}px;
  display: flex;
  width: 100%;
  color: ${(p) => p.color || "inherit"};
`;

export const Item = styled.div<{
  paddingX?: number;
  paddingY?: number;
  top?: number;
  bottom?: number;
  isHaveIcons?: boolean;
}>`
  border-radius: 10px;
  box-shadow: 1px 1px 11px -3px rgb(102 31 231 / 23%);
  margin-top: ${(p) => p.top || 0}px;
  margin-bottom: ${(p) => p.bottom || 0}px;
  padding: ${(p) => p.paddingY || 0}px ${(p) => p.paddingX || 0}px
    ${(p) => p.paddingY || 0}px ${(p) => p.paddingX || 0}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  ${(p) => p.isHaveIcons && `padding-right: ${45 + (p.paddingX || 0)}px;`}
`;

export const ItemIconsBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 45px;
  border-left: 1px solid #ede7fa;

  svg {
    color: ${primaryColor};
  }
`;

export const NewModal = styled(Modal)`
  .MuiBackdrop-root {
    background-color: ${backgroundDefault};
    opacity: 0.9 !important;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NewModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 95%;
  background: #f9f7ff;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 35px rgba(43, 13, 98, 0.1);
  margin: 15px;
  outline: none !important;
`;

export const NewModalHeader = styled.header`
  flex: 0 0 auto;
  display: flex;
  flex-direction: revert;
  justify-content: flex-start;
  width: calc(100% + 40px);
  border-bottom: 1px solid #e3d6fb;
  margin: 0 -20px;
  padding: 0 20px 15px;
`;

export const NewModalFooter = styled.footer`
  flex: 0 0 auto;
  display: flex;
  flex-direction: revert;
  justify-content: flex-start;
  width: calc(100% + 40px);
  border-top: 1px solid #e3d6fb;
  margin: 0 -20px;
  padding: 15px 20px 0;
`;

export const NewModalBody = styled.div`
  overflow: scroll;
  width: calc(100% + 40px);
  margin: 0 -20px;
  padding: 15px 20px;
`;

export const NewModalCloseButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: -20px;
  right: -20px;
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

export const NewModalBackButton = styled.button`
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
