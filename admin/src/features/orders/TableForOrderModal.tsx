import { Button, Grid, IconButton, List, ListItem, ListItemText, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { IDiscount } from "../../interfaces/discounts";
import { IOrder } from "../../interfaces/orders";
import Header from "../../shared/header";
import { ordersSlice } from "../../slices/orders";
import { useAppDispatch, useAppSelector } from "../../store";
import { ModalScrollable } from "../../styles/common";
import { backgroundDefault } from "../../styles/theme";

export const TableForOrderModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const { items: orders, isLoading: isLoadingOrders, tableForModal } = useAppSelector((s) => s.orders);
  const { items: tables, isLoading: isLoadingTables } = useAppSelector((s) => s.tables);
  const { items: positions, isLoading: isLoadingPositions } = useAppSelector((s) => s.positions);

  const [billOrder, setBillOrder] = React.useState<IOrder | null>(null);
  const [discount, setDiscount] = React.useState<IDiscount | null>(null);

  const orderForTable = React.useMemo(() => {
    return orders.filter((o) => Number(o.tableId) === Number(tableForModal?.id));
  }, [tableForModal]);

  return (
    <Modal
      style={{ background: backgroundDefault }}
      open={!!tableForModal && !isLoadingOrders && !isLoadingTables && !isLoadingPositions}
    >
      <>
        <Header
          title={`Orders for table №${tableForModal?.number}`}
          onClickBack={() => dispatch(ordersSlice.actions.setTableForModal(undefined))}
        />
        <ModalScrollable>
          {/* <List disablePadding>
            {!!orderForTable.length &&
              orderForTable.map((o) => (
                <ListItem
                  divider
                  disablePadding
                  secondaryAction={<IconButton edge="end" style={{ right: -10 }}></IconButton>}
                >
                  <ListItemText primary={} secondary={"222"} />
                </ListItem>
              ))}
          </List> */}
          <List disablePadding style={{ background: "none" }}>
            {!!orderForTable.length &&
              orderForTable?.map((i) => {
                const table = tables.find((t) => Number(t.id) === Number(i.tableId));

                return (
                  <ListItem disablePadding style={{ marginBottom: 10 }}>
                    <ListItemText
                      primary={i.comment ? i.comment : table?.name}
                      secondary={
                        <React.Fragment>
                          <Box marginBottom={1}>{`Order №${i.id} / Table №${table?.number}`}</Box>
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <Button
                                fullWidth
                                variant="contained"
                                onClick={() => dispatch(ordersSlice.actions.setOrderForBill(i))}
                              >
                                Bill
                              </Button>
                            </Grid>
                            <Grid item xs={6}>
                              <Button
                                fullWidth
                                color="warning"
                                variant="contained"
                                onClick={() =>
                                  dispatch(
                                    ordersSlice.actions.startEditItem({
                                      ...i,
                                      selectedTable: tables.find((t) => t.id === i.tableId),
                                    })
                                  )
                                }
                              >
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
        </ModalScrollable>
      </>
    </Modal>
  );
};
