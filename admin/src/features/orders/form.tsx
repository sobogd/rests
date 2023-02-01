import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../../shared/header";
import {
  AccordionDetailsStyled,
  AccordionStyled,
  AccordionSummaryStyled,
  AlertStyled,
  MyForm,
} from "../../styles/common";
import { ordersSlice } from "../../slices/orders";
import { tablesService } from "../../services/tables";
import { EOrderSteps } from "../../enums/orders";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import { backUrl } from "../..";
import { ITable } from "../../interfaces/tables";
import { positionsService } from "../../services/positions";
import { AddPositionModal } from "./modal";
import { categoriesService } from "../../services/categories";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ordersService } from "../../services/orders";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TableBarIcon from "@mui/icons-material/TableBar";
import { grey, teal } from "@mui/material/colors";

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
  const { error, comment, activeStep, selectedTable, selectedPositions, orderId } = useAppSelector(
    (s) => s.orders
  );
  const { imageSrc, items: tables } = useAppSelector((s) => s.tables);
  const { items: positions } = useAppSelector((s) => s.positions);

  const handleSelectTable = (t: ITable) => () => {
    dispatch(ordersSlice.actions.setSelectedTable(t));
  };

  const handleSendOrder = () => {
    if (orderId) {
      dispatch(
        ordersService.update({
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
        ordersService.create({
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

  return (
    <>
      <Header
        title={orderId ? "Редактирование заказа" : "Новый заказ"}
        onClickBack={() => dispatch(ordersSlice.actions.toggleIsOpenForm())}
      />
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
      <Box position={"relative"} marginBottom={2}>
        <img
          src={`${backUrl}${imageSrc}?w=248&fit=crop&auto=format`}
          srcSet={`${backUrl}${imageSrc}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={"Tables with orders"}
        />
        {tables?.map((t) => (
          <TableSetBlock
            style={{
              bottom: `${t.positionY}%`,
              left: `${t.positionX}%`,
              background: t.id !== selectedTable?.id ? grey[500] : teal[800],
            }}
            onClick={() => dispatch(ordersSlice.actions.setSelectedTable(t))}
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
      <AddPositionModal />
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
                    onClick={() => dispatch(ordersSlice.actions.copyPosition(index))}
                  />,
                  <DeleteIcon
                    style={{ marginLeft: 7 }}
                    onClick={() => dispatch(ordersSlice.actions.deletePosition(index))}
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
        onClick={() => dispatch(ordersSlice.actions.toggleIsOpenPositionForm())}
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
        onChange={(e) => dispatch(ordersSlice.actions.setComment(e.target.value))}
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
