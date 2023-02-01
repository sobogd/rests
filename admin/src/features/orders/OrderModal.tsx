import { Alert, Button, Chip, Grid, List, ListItem, ListItemText, Modal, Typography } from "@mui/material";
import { grey, teal } from "@mui/material/colors";
import { Box } from "@mui/system";
import React from "react";
import { ordersService } from "../../services/orders";
import Header from "../../shared/header";
import { ordersSlice } from "../../slices/orders";
import { useAppDispatch, useAppSelector } from "../../store";
import { ModalScrollable } from "../../styles/common";
import { backgroundDefault } from "../../styles/theme";
import { roundFive } from "../../utils/roundFive";

const discounts = [0, 10];

export const OrderModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isLoading: isLoadingOrders, orderForBill, discountForBill } = useAppSelector((s) => s.orders);
  const { items: positions, isLoading: isLoadingPositions } = useAppSelector((s) => s.positions);

  const isAllPositionFinished = orderForBill?.ordersPositions?.filter((op) => !op.finishTime).length === 0;

  const additionalsForPosition = orderForBill?.ordersPositions
    ?.filter((op) => !!op.additional?.length)
    .map((op) => op.additional);

  const positionsForOrder: any = orderForBill?.ordersPositions?.map((op) => {
    const position = positions.find((pi) => Number(pi.id) === Number(op.positionId));
    return { ...position, additional: op.additional };
  });

  const arrayAdditional: any = [];
  if (!!additionalsForPosition?.length) {
    additionalsForPosition.forEach((afp) => {
      const splitted = afp?.split("/");
      splitted?.forEach((spl) => {
        const colAndId = spl.split("-");
        const pos = positions.find((pi) => Number(pi.id) === Number(colAndId[1]));
        arrayAdditional.push(`${pos?.name} - ${Number(pos?.price) * Number(colAndId[0])}`);
      });
    });
  }

  let summary = 0;

  const handleFinishOrder = (id: string, discount: number) => () => {
    dispatch(
      ordersService.finish({
        id,
        discount,
      })
    ).then(() => {
      dispatch(ordersService.search());
    });
  };

  return (
    <Modal
      style={{ background: backgroundDefault }}
      open={!!orderForBill && !isLoadingOrders && !isLoadingPositions}
    >
      <>
        <Header title="Оплата заказа" onClickBack={() => dispatch(ordersSlice.actions.closeBillModal())} />
        <ModalScrollable>
          {!isAllPositionFinished && (
            <Alert icon={false} severity="error" style={{ marginBottom: 10 }}>
              Не все позиции в заказе были завершены!
            </Alert>
          )}
          {!!orderForBill?.comment && (
            <Alert severity="info" icon={false} style={{ marginBottom: 25 }}>
              {orderForBill?.comment}
            </Alert>
          )}
          <Typography variant="h5" marginBottom={1}>
            Состав заказа
          </Typography>
          <List disablePadding style={{ background: "none", marginBottom: 20 }}>
            {!!positionsForOrder?.length &&
              positionsForOrder?.map((e: any) => {
                const primary = (
                  <Grid container spacing={1}>
                    <Grid item xs={10}>
                      {e?.name}
                    </Grid>
                    <Grid item xs={2} style={{ textAlign: "right" }}>
                      {Number(e?.price) > 0 ? e?.price : null}
                    </Grid>
                  </Grid>
                );

                summary = summary + Number(e.price);

                const secondary: any[] = [];

                if (e.additional?.length) {
                  const splitted = e.additional?.split("/");

                  splitted?.forEach((spl: any) => {
                    const colAndId = spl.split("-");
                    const pos = positions.find((pi) => Number(pi.id) === Number(colAndId[1]));
                    const price = Number(pos?.price) * Number(colAndId[0]);
                    summary = summary + price;

                    secondary.push(
                      <Grid container spacing={1}>
                        <Grid item xs={10}>
                          {pos?.name}
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: "right" }}>
                          {Number(pos?.price) > 0 ? pos?.price : null}
                        </Grid>
                      </Grid>
                    );
                  });
                }

                return (
                  <ListItem disablePadding divider>
                    <ListItemText
                      primary={primary}
                      secondary={<React.Fragment>{secondary}</React.Fragment>}
                    />
                  </ListItem>
                );
              })}
          </List>
          {!isAllPositionFinished ? (
            <Alert icon={false} severity="error">
              Не все позиции в заказе были завершены!
            </Alert>
          ) : (
            <>
              <Typography variant="h5" marginBottom={1}>
                Данные для оплаты
              </Typography>
              <Typography variant="body1" marginBottom={2}>
                Выберите процент скидки, система рассчитает итоговую сумму заказа с учетом скидки.
              </Typography>
              <Box style={{ margin: -5, marginBottom: 15 }}>
                {discounts.map((d) => (
                  <Chip
                    label={d}
                    variant="outlined"
                    style={{
                      margin: 5,
                      borderColor: d !== discountForBill ? grey[200] : teal[400],
                      color: d !== discountForBill ? grey[200] : teal[400],
                    }}
                    onClick={() => dispatch(ordersSlice.actions.setDiscountForBill(d))}
                  />
                ))}
              </Box>
              <List disablePadding style={{ background: "none", marginBottom: 20 }}>
                <ListItem disablePadding divider>
                  <ListItemText
                    primary={
                      <Grid container spacing={1}>
                        <Grid item xs={8}>
                          Итого
                        </Grid>
                        <Grid item xs={4} style={{ textAlign: "right" }}>
                          {summary} TL
                        </Grid>
                      </Grid>
                    }
                  />
                </ListItem>
                <ListItem disablePadding divider>
                  <ListItemText
                    primary={
                      <Grid container>
                        <Grid item xs={8}>
                          Итого с учетом скидки
                        </Grid>
                        <Grid item xs={4} style={{ textAlign: "right" }}>
                          {roundFive(summary - summary * (discountForBill / 100))} TL
                        </Grid>
                      </Grid>
                    }
                  />
                </ListItem>
              </List>
              <Button
                fullWidth
                variant="contained"
                onClick={handleFinishOrder(orderForBill?.id || "", discountForBill)}
                style={{ marginBottom: 40 }}
              >
                {roundFive(summary - summary * (discountForBill / 100))} TL оплачено
              </Button>
            </>
          )}
        </ModalScrollable>
      </>
    </Modal>
  );
};
