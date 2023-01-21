import {
  Alert,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../../shared/header";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { ordersService } from "../../services/orders";
import { ordersSlice } from "../../slices/orders";
import { tablesService } from "../../services/tables";
import Loading from "../../shared/loading";
import { roundFive } from "../../utils/roundFive";
import { Box } from "@mui/system";
import { IOrder } from "../../interfaces/orders";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import { backgroundDefault } from "../../styles/theme";
import { IDiscount } from "../../interfaces/discounts";
import { table } from "console";

const discounts = [
  { id: "1", name: "Without discount", discount: "0" },
  { id: "2", name: "Discount for cash", discount: "10" },
  { id: "3", name: "Chat Fethiyane", discount: "10" },
];

const methods = [
  { id: "1", name: "Card", color: "warning" },
  { id: "2", name: "Cash", color: "success" },
  { id: "3", name: "IBAN", color: "info" },
];

const OrderTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 15px 0 25px;
  td {
    border: 1px solid #474747;
    padding: 5px 10px;
  }
`;

const ScrollableBox = styled(Box)`
  height: 100%;
  max-height: calc(100% - 60px);
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  width: 100%;
  position: absolute;
  left: 0;
  padding: 0 30px;
  background: none;
`;

export const OrdersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((s) => s.orders);
  const { items: tableItems, isLoading: isTableLoading } = useAppSelector((s) => s.tables);
  const { items: positionsItems, isLoading: isPositionsLoading } = useAppSelector((s) => s.positions);
  const [billOrder, setBillOrder] = React.useState<IOrder | null>(null);
  const [discount, setDiscount] = React.useState<IDiscount | null>(null);

  const handleEditItem = (i: any) => () => {
    dispatch(
      ordersSlice.actions.startEditItem({
        ...i,
        selectedTable: tableItems.find((t) => t.id === i.tableId),
      })
    );
  };

  const handleFinishOrder = (id: string, discount: number) => () => {
    dispatch(
      ordersService.finish({
        id,
        discount,
      })
    ).then(() => {
      setBillOrder(null);
      setDiscount(null);
      dispatch(ordersService.search());
    });
  };

  const billOrderView = useMemo(() => {
    const result: any = [];

    if (!billOrder) {
      return result;
    }

    const isAllPositionFinished = billOrder?.ordersPositions?.filter((op) => !op.finishTime).length === 0;

    if (!isAllPositionFinished) {
      result.push(
        <Alert icon={false} severity="error">
          Not all position was ended!
        </Alert>
      );

      return result;
    }

    result.push(
      <FormControl fullWidth style={{ marginTop: 20 }}>
        <InputLabel>Select discount</InputLabel>
        <Select
          value={discount?.id}
          label="Select discount"
          onChange={(e) => setDiscount(discounts.find((d) => d.id === e.target.value) || null)}
        >
          {discounts.map((d) => (
            <MenuItem value={d.id}>{d.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );

    if (!discount) {
      return result;
    }

    const additionalsForPosition = billOrder.ordersPositions
      ?.filter((op) => !!op.additional?.length)
      .map((op) => op.additional);

    const positionsList: any = billOrder.ordersPositions?.map((op) => {
      const position = positionsItems.find((pi) => Number(pi.id) === Number(op.positionId));
      return { ...position, additional: op.additional };
    });

    const arrayAdditional: any = [];
    if (!!additionalsForPosition?.length) {
      additionalsForPosition.forEach((afp) => {
        const splitted = afp?.split("/");
        splitted?.forEach((spl) => {
          const colAndId = spl.split("-");
          const pos = positionsItems.find((pi) => Number(pi.id) === Number(colAndId[1]));
          arrayAdditional.push(`${pos?.name} - ${Number(pos?.price) * Number(colAndId[0])}`);
        });
      });
    }

    if (positionsList?.length) {
      let summary = 0;

      result.push(
        <OrderTable>
          {positionsList?.map((e: any) => {
            const result = [];

            result.push(
              <tr>
                <td>
                  <Typography variant="body2">{e?.name}</Typography>
                </td>
                <td>
                  <Typography variant="body2">{e?.price}</Typography>
                </td>
              </tr>
            );

            summary = summary + Number(e.price);

            if (e.additional?.length) {
              const splitted = e.additional?.split("/");
              splitted?.forEach((spl: any) => {
                const colAndId = spl.split("-");
                const pos = positionsItems.find((pi) => Number(pi.id) === Number(colAndId[1]));
                const price = Number(pos?.price) * Number(colAndId[0]);
                summary = summary + price;

                result.push(
                  <tr>
                    <td style={{ paddingLeft: 20 }}>
                      <Typography variant="body2">{pos?.name}</Typography>
                    </td>
                    <td>
                      <Typography variant="body2">{pos?.price}</Typography>
                    </td>
                  </tr>
                );
              });
            }

            return result;
          })}
          <tr>
            <td>
              <Typography variant="body2" fontWeight={600}>
                Итого
              </Typography>
            </td>
            <td>
              <Typography variant="body2" fontWeight={600}>
                {roundFive(summary)}
              </Typography>
            </td>
          </tr>
          {Number(discount.discount) > 0 && [
            <tr>
              <td>
                <Typography variant="body2" fontWeight={600}>
                  Скидка
                </Typography>
              </td>
              <td>
                <Typography variant="body2" fontWeight={600}>
                  -{discount.discount}%
                </Typography>
              </td>
            </tr>,
            <tr>
              <td>
                <Typography variant="body2" fontWeight={600}>
                  Итого со скидкой
                </Typography>
              </td>
              <td>
                <Typography variant="body2" fontWeight={600}>
                  {roundFive(summary - summary * (Number(discount.discount) / 100))}
                </Typography>
              </td>
            </tr>,
          ]}
        </OrderTable>
      );

      methods.forEach((m: any) => {
        result.push(
          <Button
            fullWidth
            color={m.color}
            variant="contained"
            style={{ marginTop: 15 }}
            onClick={handleFinishOrder(billOrder.id, Number(discount?.discount))}
          >
            {m.name}
          </Button>
        );
      });
    }

    return result;
  }, [billOrder, discount]);

  return (
    <>
      <Loading isLoading={isLoading || isTableLoading || isPositionsLoading} />
      <Header title="Orders" onClickAdd={() => dispatch(ordersSlice.actions.toggleIsOpenForm())} />
      <Modal
        style={{ background: backgroundDefault }}
        open={!!billOrder && !isLoading && !isTableLoading && !isPositionsLoading}
        onClose={() => {
          setBillOrder(null);
          setDiscount(null);
        }}
      >
        <ScrollableBox>
          <Typography variant="h6" marginBottom={2}>
            Bill creating
          </Typography>
          {billOrderView}
        </ScrollableBox>
      </Modal>
      <List disablePadding>
        {items?.map((i) => {
          const table = tableItems.find((t) => t.id === i.tableId);

          return (
            <ListItem disablePadding style={{ marginBottom: 10 }}>
              <ListItemText
                primary={table?.name}
                secondary={
                  <React.Fragment>
                    <Box marginBottom={1}>{`Order №${i.id} / Table №${table?.number}`}</Box>
                    {i.comment && <Box marginBottom={1}>{i.comment}</Box>}
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={() => setBillOrder(i)}>
                          Bill
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button fullWidth color="warning" variant="contained" onClick={handleEditItem(i)}>
                          Edit
                        </Button>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
