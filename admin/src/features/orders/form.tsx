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
import { Button, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
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

const TableSetBlock = styled.div`
  position: relative;
  width: 100%;
  margin-top: 7px;

  img {
    width: 100%;
    height: 100%;
  }

  span {
    position: absolute;
    width: 60px;
    height: 60px;
    margin: -30px;
    cursor: pointer;
    background: #01695c;
    border-radius: 60px;
    border: 6px solid #fff;
  }
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

  const handleFinishOrderCard = () => {
    if (orderId) {
      dispatch(
        ordersService.finish({
          id: orderId,
          type: "card",
        })
      ).then(() => {
        dispatch(ordersService.search());
      });
    }
  };

  const handleFinishOrderCash = () => {
    if (orderId) {
      dispatch(
        ordersService.finish({
          id: orderId,
          type: "cash",
        })
      ).then(() => {
        dispatch(ordersService.search());
      });
    }
  };

  const accordions = [
    {
      title: "Выберите столик",
      subtitle: !!selectedTable ? `№${selectedTable.number}: ${selectedTable.name}` : undefined,
      step: EOrderSteps.TABLE,
      disabled: false,
      content: (
        <>
          <TableSetBlock>
            <img
              src={`${backUrl}${imageSrc}?w=248&fit=crop&auto=format`}
              srcSet={`${backUrl}${imageSrc}?w=248&fit=crop&auto=format&dpr=2 2x`}
              width="300"
              height="300"
              alt={"234324"}
              loading="lazy"
            />
            {tables?.map((t) => (
              <span
                style={{ bottom: `${t.positionY}%`, left: `${t.positionX}%` }}
                onClick={handleSelectTable(t)}
              />
            ))}
          </TableSetBlock>
          {!!selectedTable && (
            <Button
              fullWidth
              style={{ marginTop: 15 }}
              variant="outlined"
              onClick={() => dispatch(ordersSlice.actions.setActiveStep(EOrderSteps.FILLING))}
            >
              Далее
            </Button>
          )}
        </>
      ),
    },
    {
      title: "Заполните позиции",
      // subtitle: !!selectedTable ? `№${selectedTable.number}: ${selectedTable.name}` : undefined,
      step: EOrderSteps.FILLING,
      disabled: !selectedTable,
      content: (
        <>
          <AddPositionModal />
          <List>
            {!!selectedPositions?.length &&
              selectedPositions.map((p, index) => {
                const positionData = positions.find((pos) => pos.id === p.positionId);

                return (
                  <ListItem
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          onClick={() => dispatch(ordersSlice.actions.deletePosition(index))}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText
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
            style={{ marginTop: 15 }}
            variant="outlined"
            onClick={() => dispatch(ordersSlice.actions.toggleIsOpenPositionForm())}
          >
            Добавить позицию
          </Button>
          {!!selectedPositions.length && (
            <Button
              fullWidth
              style={{ marginTop: 15 }}
              variant="contained"
              onClick={() => dispatch(ordersSlice.actions.setActiveStep(EOrderSteps.ADDITIONAL))}
            >
              Далее
            </Button>
          )}
        </>
      ),
    },
    {
      title: "Дополнительная информация",
      // subtitle: !!selectedTable ? `№${selectedTable.number}: ${selectedTable.name}` : undefined,
      step: EOrderSteps.ADDITIONAL,
      disabled: !selectedPositions.length,
      content: (
        <>
          <TextField
            inputProps={{ form: { autocomplete: "off" } }}
            label={"Комментарий к позиции"}
            multiline
            maxRows={15}
            minRows={15}
            variant="outlined"
            required
            name="description"
            value={comment}
            fullWidth
            onChange={(e) => dispatch(ordersSlice.actions.setComment(e.target.value))}
            style={{ marginTop: 15, marginBottom: 0 }}
          />
          <Button fullWidth style={{ marginTop: 15 }} variant="contained" onClick={handleSendOrder}>
            {orderId ? "Сохранить изменения" : "Отправить заказ на кухню"}
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Header
        title={orderId ? "Редактирование заказа" : "Новый заказ"}
        onClickBack={() => dispatch(ordersSlice.actions.toggleIsOpenForm())}
      />
      {!!orderId && [
        <Button
          fullWidth
          style={{ marginBottom: 15 }}
          color="warning"
          variant="contained"
          onClick={handleFinishOrderCard}
        >
          Оплачено картой
        </Button>,
        <Button
          fullWidth
          style={{ marginBottom: 15 }}
          color="success"
          variant="contained"
          onClick={handleFinishOrderCash}
        >
          Оплачено наличными
        </Button>,
      ]}
      {error ? (
        <AlertStyled style={{ marginBottom: 20 }} severity="error">
          {error}
        </AlertStyled>
      ) : null}
      {accordions?.map((a) => (
        <AccordionStyled
          expanded={activeStep === a.step}
          onChange={() => dispatch(ordersSlice.actions.setActiveStep(a.step))}
          disabled={a.disabled}
        >
          <AccordionSummaryStyled
            expandIcon={<ExpandMoreIcon />}
            aria-controls={a.step + "_content"}
            id={a.step + "_header"}
          >
            <Typography variant="body1">{a.title}</Typography>
            {!!a.subtitle && <Typography variant="body2">{a.subtitle}</Typography>}
          </AccordionSummaryStyled>
          <AccordionDetailsStyled>{a.content}</AccordionDetailsStyled>
        </AccordionStyled>
      ))}
    </>
  );
};
