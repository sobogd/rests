import { Button, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { ordersSlice } from "../../slices/orders";
import { MyForm, MyFormSubtitle } from "../../styles/common";
import styled from "@emotion/styled";
import { EOrderSteps } from "../../enums/orders";

const TableSetBlock = styled.div`
  position: relative;
  width: calc(100vw - 40px);
  height: calc(100vw - 40px);

  img {
    width: 100%;
    height: 100%;
  }
`;

const TableSetBlockItem = styled(Typography)`
  position: absolute;
  width: 40px;
  height: 40px;
  background: #00897b;
  box-shadow: 0px 0px 13px -2px #00897b;
  border: 5px solid #fff;
  margin: -20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
`;

const backUrl = "http://localhost:4000";

export const OrdersTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { form, error, isOpenYouSure, activeStep, selectedTable } = useAppSelector((s) => s.orders);
  const { imageSrc, items: tables } = useAppSelector((s) => s.tables);

  return (
    <MyForm onSubmit={(e) => e.preventDefault()}>
      <MyFormSubtitle>Выберите столик на карте</MyFormSubtitle>
      <TableSetBlock>
        <img
          src={`${backUrl}${imageSrc}?w=248&fit=crop&auto=format`}
          srcSet={`${backUrl}${imageSrc}?w=248&fit=crop&auto=format&dpr=2 2x`}
          width="300"
          height="300"
          alt={"234324"}
          loading="lazy"
        />
        {!!tables &&
          tables.map((t) => (
            <TableSetBlockItem
              style={{ bottom: `${t.positionY}%`, left: `${t.positionX}%` }}
              onClick={() => dispatch(ordersSlice.actions.setSelectedTable(t))}
            >
              {t.number}
            </TableSetBlockItem>
          ))}
      </TableSetBlock>
      {!!selectedTable && (
        <>
          <Typography variant="h6" component="h6" marginTop={2}>
            Выбран столик №{selectedTable.number}
          </Typography>
          <Typography variant="subtitle2" component="p">
            {selectedTable.name}
          </Typography>
          <Button
            style={{ marginTop: 20 }}
            variant="contained"
            onClick={() => dispatch(ordersSlice.actions.setActiveStep(EOrderSteps.FORM))}
          >
            Далее
          </Button>
        </>
      )}
    </MyForm>
  );
};
