import React from "react";
import { Alert, Box, Button, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { AddPositionModal } from "./modal";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TableBarIcon from "@mui/icons-material/TableBar";
import { grey, teal } from "@mui/material/colors";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useAppDispatch, useAppSelector } from "app/store";
import { pagesModel } from "entities/pages";
import { ordersModel } from "../model";
import { ITable } from "entities/tables";
import { ordersService } from "shared/api";
import { AlertStyled } from "app/styles";
import { API_URL } from "shared/config";

const TableSetBlock = styled.div`
  position: absolute;
  width: 35px;
  height: 35px;
  margin: -13px;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${grey[800]};
`;

export const OrdersForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error, comment, positionsForm, selectedTable, selectedPositions, orderId } = useAppSelector(
    (s) => s.orders
  );
  const { imageSrc, items: tables } = useAppSelector((s) => s.tables);
  const { items: positions } = useAppSelector((s) => s.positions);

  React.useEffect(() => {
    dispatch(
      pagesModel.actions.setHeaderComponent(
        <Box display="flex" justifyContent="space-between" flexGrow={1} alignItems="center">
          <Typography variant="h6">{!!positionsForm.isOpened ? "Position adding" : "New order"}</Typography>
          {!!positionsForm.isOpened ? (
            <HighlightOffIcon onClick={() => dispatch(ordersModel.actions.toggleIsOpenPositionForm())} />
          ) : (
            <HighlightOffIcon onClick={() => dispatch(ordersModel.actions.toggleIsOpenForm())} />
          )}
        </Box>
      )
    );
  }, [positionsForm.isOpened]);

  const handleSelectTable = (t: ITable) => () => {
    dispatch(ordersModel.actions.setSelectedTable(t));
  };

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

  return !!positionsForm.isOpened ? (
    <AddPositionModal />
  ) : (
    <>
      {error ? (
        <AlertStyled style={{ marginBottom: 20 }} severity="error">
          {error}
        </AlertStyled>
      ) : null}
      <Typography variant="h5" marginBottom={1}>
        Выбор столика
      </Typography>
      <Typography variant="body1" marginBottom={2}>
        {selectedTable?.id
          ? `Выбран столик №${selectedTable?.number} (${selectedTable?.name})`
          : "Пожалуйста, выберете столик для заказа:"}
      </Typography>
      <Box
        position={"relative"}
        marginBottom={2}
        width="calc(100vw - 32px)"
        height="calc(100vw - 32px)"
        overflow="hidden"
      >
        <img
          src={`${API_URL}${imageSrc}`}
          srcSet={`${API_URL}${imageSrc}`}
          alt={"Tables with orders"}
          width="100%"
          height="100%"
        />
        {tables?.map((t) => (
          <TableSetBlock
            style={{
              bottom: `${t.positionY}%`,
              left: `${t.positionX}%`,
              background: t.id !== selectedTable?.id ? grey[500] : teal[800],
            }}
            onClick={() => dispatch(ordersModel.actions.setSelectedTable(t))}
          >
            <TableBarIcon />
          </TableSetBlock>
        ))}
      </Box>
      <Typography variant="h5" marginBottom={1} marginTop={4}>
        Заполнение позиций
      </Typography>
      {!selectedPositions?.length && (
        <Typography variant="body1" marginBottom={2}>
          Пожалуйста, заполните позиции:
        </Typography>
      )}

      <List disablePadding style={{ marginBottom: 15 }}>
        {!!selectedPositions?.length &&
          selectedPositions.map((p, index: number) => {
            const positionData = positions.find((pos) => pos.id === p.positionId);

            return (
              <ListItem
                disablePadding
                divider={index !== selectedPositions?.length - 1}
                style={{ paddingTop: 5, paddingBottom: 5 }}
                secondaryAction={[
                  <ContentCopyIcon
                    style={{ marginLeft: 7 }}
                    onClick={() => dispatch(ordersModel.actions.copyPosition(index))}
                  />,
                  <DeleteIcon
                    style={{ marginLeft: 7 }}
                    onClick={() => dispatch(ordersModel.actions.deletePosition(index))}
                  />,
                ]}
              >
                <ListItemText
                  style={{ paddingRight: 100 }}
                  primary={positionData?.name}
                  secondary={
                    <>
                      {p.additional?.map((a) => {
                        const foundedAdditional = positions.find((add: any) => add.id === a.id);
                        return (
                          <>
                            {a.count}x {foundedAdditional?.name}
                            <br />
                          </>
                        );
                      })}
                      {p.comment}
                    </>
                  }
                />
              </ListItem>
            );
          })}
      </List>
      <Button
        fullWidth
        style={{ marginBottom: 25 }}
        variant="contained"
        onClick={() => dispatch(ordersModel.actions.toggleIsOpenPositionForm())}
      >
        Добавить позицию
      </Button>
      <Typography variant="h5" marginBottom={1} marginTop={1}>
        Комментарий к заказу
      </Typography>
      <Typography variant="body1" marginBottom={2}>
        Введите пожелания к заказу или комментарий для раздельной оплаты.
      </Typography>
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
        onChange={(e) => dispatch(ordersModel.actions.setComment(e.target.value))}
      />
      {!!selectedPositions?.length && selectedTable?.id ? (
        <Button fullWidth style={{ marginTop: 15 }} variant="contained" onClick={handleSendOrder}>
          {orderId ? "Сохранить изменения" : "Отправить заказ на кухню"}
        </Button>
      ) : (
        <Alert severity="error" icon={false}>
          Для создания заказа необходимо выбрать столик и заполнить хотя бы одну позицию!
        </Alert>
      )}
    </>
  );
};
