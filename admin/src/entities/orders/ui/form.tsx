import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { AddPositionDialog } from "./AddPositionDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TableBarIcon from "@mui/icons-material/TableBar";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useAppDispatch, useAppSelector } from "app/store";
import { pagesModel } from "entities/pages";
import { ordersModel } from "../model";
import { ordersService } from "shared/api";
import {
  ButtonStyled,
  ErrorBox,
  Item,
  ItemIconsBlock,
  NewModal,
  NewModalCloseButton,
  NewModalContainer,
  TextSpan,
  TitleH1,
} from "app/styles";
import { API_URL } from "shared/config";
import { TableSelectWrapper, TableSetBlock } from "./syles";
import { grey } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PositionsFilling } from "./PositionsFilling";

export const OrdersForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    error,
    comment,
    positionsForm,
    selectedTable,
    selectedPositions,
    orderId,
    positionDialogIndex,
  } = useAppSelector((s) => s.orders);
  const { imageSrc, items: tables } = useAppSelector((s) => s.tables);
  const { items: positions } = useAppSelector((s) => s.positions);

  React.useEffect(() => {
    dispatch(
      pagesModel.actions.setHeaderComponent(
        <Box
          display="flex"
          justifyContent="space-between"
          flexGrow={1}
          alignItems="center"
        >
          <Typography variant="h6">
            {!!positionsForm.isOpened ? "Position adding" : "New order"}
          </Typography>
          {!!positionsForm.isOpened ? (
            <HighlightOffIcon
              onClick={() =>
                dispatch(ordersModel.actions.toggleIsOpenPositionForm())
              }
            />
          ) : (
            <HighlightOffIcon
              onClick={() => dispatch(ordersModel.actions.toggleIsOpenForm())}
            />
          )}
        </Box>
      )
    );
  }, [positionsForm.isOpened]);

  const handleSendOrder = () => {
    if (orderId) {
      dispatch(
        ordersService.updateOrder({
          positions: selectedPositions.map((p) => ({
            id: p.id,
            positionId: p.positionId,
            additional: p.additional || [],
            comment: p.comment || "",
          })),
          tableId: selectedTable?.id,
          comment: comment || "",
          orderId,
        })
      );
    } else {
      dispatch(
        ordersService.createOrder({
          positions: selectedPositions.map((p) => ({
            positionId: p.positionId,
            additional: p.additional || [],
            comment: p.comment || "",
          })),
          tableId: selectedTable?.id,
          comment: comment || "",
          createTime: new Date().toISOString(),
        })
      );
    }
  };

  const titleDescription = React.useMemo(() => {
    return selectedTable?.id
      ? `Selected table: №${selectedTable?.number} (${selectedTable?.name})`
      : "Please, select table for this order:";
  }, [selectedTable]);

  return (
    <>
      <AddPositionDialog />
      {!!error && <ErrorBox style={{ marginBottom: 20 }}>{error}</ErrorBox>}
      <TitleH1 bottom={5}>Select table:</TitleH1>
      <TextSpan bottom={20}>{titleDescription}</TextSpan>
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
            onClick={() => dispatch(ordersModel.actions.setSelectedTable(t))}
          >
            <TableBarIcon />
          </TableSetBlock>
        ))}
      </TableSelectWrapper>
      <PositionsFilling />
      <TitleH1 top={30} bottom={5}>
        Comment for order:
      </TitleH1>
      <TextSpan bottom={20}>Fill order description or name of client</TextSpan>
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
      {!!selectedPositions?.length && selectedTable?.id ? (
        <ButtonStyled style={{ marginTop: 15 }} onClick={handleSendOrder}>
          {orderId ? "Сохранить изменения" : "Отправить заказ на кухню"}
        </ButtonStyled>
      ) : (
        <ErrorBox>
          Для создания заказа необходимо выбрать столик и заполнить хотя бы одну
          позицию!
        </ErrorBox>
      )}
    </>
  );
};
