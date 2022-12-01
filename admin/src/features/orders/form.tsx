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
import { Button, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import { backUrl } from "../..";
import { ITable } from "../../interfaces/tables";

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
  }
`;

export const OrdersForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { form, error, isOpenYouSure, activeStep, selectedTable } = useAppSelector((s) => s.orders);
  const { imageSrc, items: tables } = useAppSelector((s) => s.tables);
  // const { id, name, description } = form;

  React.useEffect(() => {
    dispatch(tablesService.findImage());
    dispatch(tablesService.search());
  }, []);

  const handleSelectTable = (t: ITable) => () => {
    dispatch(ordersSlice.actions.setSelectedTable(t));
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
      content: <>positions</>,
    },
  ];

  return (
    <>
      <Header title="Новый заказ" onClickBack={() => dispatch(ordersSlice.actions.toggleIsOpenForm())} />
      {/* <YouSure
        onClickYes={handleDeleteItem}
        onClickNo={() => dispatch(categoriesSlice.actions.toggleIsOpenYouSure())}
        isOpen={isOpenYouSure}
      /> */}
      {error ? (
        <AlertStyled style={{ marginBottom: 20 }} severity="error">
          {error}
        </AlertStyled>
      ) : null}
      {accordions?.map((a) => (
        <AccordionStyled
          expanded={activeStep === a.step}
          onChange={() => dispatch(ordersSlice.actions.setActiveStep(a.step))}
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
