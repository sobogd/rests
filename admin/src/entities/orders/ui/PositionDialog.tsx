import React from "react";
import { useAppDispatch, useAppSelector } from "app/store";
import { ordersModel } from "../model";
import {
  ButtonStyled,
  NewModal,
  NewModalCloseButton,
  NewModalContainer,
  TitleH1,
} from "../../../app/styles";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";

export const PositionDialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { positionDialogIndex } = useAppSelector((s) => s.orders);

  const handleClosePositionDialog = () => {
    dispatch(ordersModel.actions.setPositionDialogIndex(undefined));
  };

  const handleCopyPosition = () => {
    dispatch(ordersModel.actions.copyPosition(positionDialogIndex));
  };

  const handleRemovePosition = () => {
    dispatch(ordersModel.actions.deletePosition(positionDialogIndex));
  };

  return (
    <NewModal
      open={positionDialogIndex !== undefined}
      onClose={handleClosePositionDialog}
    >
      <NewModalContainer>
        <NewModalCloseButton onClick={handleClosePositionDialog}>
          <CloseIcon />
        </NewModalCloseButton>
        <TitleH1 top={0} bottom={20}>
          Actions for position
        </TitleH1>
        <ButtonStyled bottom={10} onClick={handleCopyPosition}>
          <ContentCopyIcon /> Copy position
        </ButtonStyled>
        <ButtonStyled onClick={handleRemovePosition}>
          <DeleteIcon /> Delete position
        </ButtonStyled>
      </NewModalContainer>
    </NewModal>
  );
};
