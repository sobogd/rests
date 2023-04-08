import React from "react";
import { TextField } from "@mui/material";
import { AddPositionDialog } from "./AddPositionDialog";
import TableBarIcon from "@mui/icons-material/TableBar";
import { useAppDispatch, useAppSelector } from "app/store";
import { ordersModel } from "../model";
import { ordersService } from "shared/api";
import {
  ButtonStyled,
  ErrorBox,
  NewModal,
  NewModalBody,
  NewModalCloseButton,
  NewModalContainer,
  NewModalFooter,
  NewModalHeader,
  TextSpan,
  TitleH1,
} from "app/styles";
import { API_URL } from "shared/config";
import { TableSelectWrapper, TableSetBlock } from "./syles";
import { grey } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import { PositionsFilling } from "./PositionsFilling";

export const OrdersForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    error,
    comment,
    selectedTable,
    selectedPositions,
    orderId,
    isOpenForm,
  } = useAppSelector((s) => s.orders);
  const { imageSrc, items: tables } = useAppSelector((s) => s.tables);

  const handleSendOrder = () => {
    if (orderId) {
      dispatch(
        ordersService.updateOrder({
          positions: selectedPositions.map((p) => ({
            id: p.id,
            positionId: p.positionId,
            additional: p.additional || undefined,
            comment: p.comment || undefined,
          })),
          tableId: selectedTable?.id,
          comment: comment || undefined,
          id: orderId,
        })
      );
    } else {
      dispatch(
        ordersService.createOrder({
          positions: selectedPositions.map((p) => ({
            positionId: p.positionId,
            additional: p.additional || undefined,
            comment: p.comment || undefined,
          })),
          tableId: selectedTable?.id,
          comment: comment || undefined,
        })
      );
    }
  };

  const titleDescription = React.useMemo(() => {
    return selectedTable?.id
      ? `Selected table: №${selectedTable?.number} (${selectedTable?.name})`
      : "Please, select table for this order:";
  }, [selectedTable]);

  const handleCloseModal = () => {
    dispatch(ordersModel.actions.toggleIsOpenForm());
  };

  const isDisableSaveButton = !selectedPositions?.length || !selectedTable?.id;

  return (
    <NewModal open={isOpenForm} onClose={handleCloseModal}>
      <NewModalContainer maxWidth={500}>
        <NewModalHeader>
          <TitleH1 size={22}>New order</TitleH1>
        </NewModalHeader>
        <NewModalCloseButton onClick={handleCloseModal}>
          <CloseIcon />
        </NewModalCloseButton>
        <NewModalBody>
          <AddPositionDialog />
          {!!error && <ErrorBox style={{ marginBottom: 20 }}>{error}</ErrorBox>}
          <TitleH1 bottom={0} size={18}>
            Select table:
          </TitleH1>
          <TextSpan bottom={20} color={grey[600]}>
            {titleDescription}
          </TextSpan>
          <TableSelectWrapper>
            <img
              src={`${API_URL}${imageSrc}`}
              srcSet={`${API_URL}${imageSrc}`}
              alt={"Tables with orders"}
              width="100%"
              height="100%"
            />
            {tables?.map((t) => (
              <TableSetBlock
                key={t.id}
                positionY={t.positionY}
                positionX={t.positionX}
                isSelected={selectedTable?.id === t.id}
                onClick={() =>
                  dispatch(ordersModel.actions.setSelectedTable(t))
                }
              >
                <TableBarIcon />
              </TableSetBlock>
            ))}
          </TableSelectWrapper>
          <PositionsFilling />
          <TitleH1 top={30} bottom={5}>
            Comment for order:
          </TitleH1>
          <TextSpan bottom={20}>
            Fill order description or name of client
          </TextSpan>
          <TextField
            inputProps={{ form: { autocomplete: "off" } }}
            multiline
            maxRows={15}
            minRows={5}
            variant="outlined"
            required
            name="description"
            value={comment}
            fullWidth
            onChange={(e) =>
              dispatch(ordersModel.actions.setComment(e.target.value))
            }
          />
          {isDisableSaveButton && (
            <ErrorBox>
              For continue you need fill the table and positions
            </ErrorBox>
          )}
        </NewModalBody>
        <NewModalFooter>
          <ButtonStyled
            disabled={isDisableSaveButton}
            onClick={handleSendOrder}
          >
            Save order
          </ButtonStyled>
        </NewModalFooter>
      </NewModalContainer>
    </NewModal>
  );
};
