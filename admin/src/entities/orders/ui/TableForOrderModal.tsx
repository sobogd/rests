import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Modal,
} from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "app/store";
import { backgroundDefault, ModalScrollable } from "app/styles";
import React from "react";
import Header from "shared/header";
import { ordersModel } from "../model";

export const TableForOrderModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    items: orders,
    isLoading: isLoadingOrders,
    tableForModal,
  } = useAppSelector((s) => s.orders);
  const { items: tables, isLoading: isLoadingTables } = useAppSelector(
    (s) => s.tables
  );

  const orderForTable = React.useMemo(() => {
    return orders.filter(
      (o) => Number(o.tableId) === Number(tableForModal?.id)
    );
  }, [tableForModal, orders]);

  return (
    <Modal
      style={{ background: backgroundDefault }}
      open={!!tableForModal && !isLoadingOrders && !isLoadingTables}
    >
      <>
        <Header
          title={`Orders for table №${tableForModal?.number}`}
          onClickBack={() =>
            dispatch(ordersModel.actions.setTableForModal(undefined))
          }
        />
        <ModalScrollable>
          <List disablePadding style={{ background: "none" }}>
            {!!orderForTable.length &&
              orderForTable?.map((i) => {
                const table = tables.find(
                  (t) => Number(t.id) === Number(i.tableId)
                );

                return (
                  <ListItem disablePadding style={{ marginBottom: 10 }}>
                    <ListItemText
                      primary={i.comment ? i.comment : table?.name}
                      secondary={
                        <React.Fragment>
                          <Box
                            marginBottom={1}
                          >{`Order №${i.id} / Table №${table?.number}`}</Box>
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <Button
                                fullWidth
                                variant="contained"
                                onClick={() =>
                                  dispatch(
                                    ordersModel.actions.setOrderForBill(i)
                                  )
                                }
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
                                    ordersModel.actions.startEditItem({
                                      ...i,
                                      selectedTable: tables.find(
                                        (t) => t.id === i.tableId
                                      ),
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
