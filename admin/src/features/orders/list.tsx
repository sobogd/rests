import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../../shared/header";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { ordersService } from "../../services/orders";
import { ordersSlice } from "../../slices/orders";
import { tablesService } from "../../services/tables";
import Loading from "../../shared/loading";

const roundFive = (a: any) => {
  var b = a % 5;
  b && (a = a - b + 5);

  return a;
};

export const OrdersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((s) => s.orders);
  const { items: tableItems, isLoading: isTableLoading } = useAppSelector((s) => s.tables);
  const { items: positionsItems, isLoading: isPositionsLoading } = useAppSelector((s) => s.positions);

  const handleEditItem = (i: any) => () => {
    dispatch(
      ordersSlice.actions.startEditItem({
        ...i,
        selectedTable: tableItems.find((t) => t.id === i.tableId),
      })
    );
  };

  return (
    <>
      <Loading isLoading={isLoading || isTableLoading || isPositionsLoading} />
      <Header title="Orders" onClickAdd={() => dispatch(ordersSlice.actions.toggleIsOpenForm())} />
      <List disablePadding>
        {items?.map((i) => {
          const table = tableItems.find((t) => t.id === i.tableId);

          const additionalsForPosition = i.ordersPositions
            ?.filter((op) => !!op.additional?.length)
            .map((op) => op.additional);
          const positionsList: any = i.ordersPositions?.map((op) => {
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

          return (
            <ListItem
              divider
              disablePadding
              secondaryAction={
                <IconButton edge="end" style={{ right: -10 }} onClick={handleEditItem(i)}>
                  <ModeEditOutlineIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${table?.number} - ${table?.name}`}
                secondary={
                  <>
                    {(() => {
                      let summary = 0;

                      const r = [];

                      r.push(
                        positionsList.map((e: any) => {
                          const result = [];

                          result.push(
                            <div>
                              {e?.name} {!!Number(e?.price) && <b style={{ fontWeight: 600 }}>{e?.price}</b>}
                            </div>
                          );

                          summary = summary + Number(e.price);

                          if (e.additional?.length) {
                            const splitted = e.additional?.split("/");
                            splitted?.forEach((spl: any) => {
                              console.log({ spl });
                              const colAndId = spl.split("-");
                              const pos = positionsItems.find((pi) => Number(pi.id) === Number(colAndId[1]));
                              const price = Number(pos?.price) * Number(colAndId[0]);
                              summary = summary + price;

                              result.push(
                                <div style={{ paddingLeft: 20 }}>
                                  {pos?.name}{" "}
                                  {!!Number(pos?.price) && <b style={{ fontWeight: 600 }}>{pos?.price}</b>}
                                  <br></br>
                                </div>
                              );
                            });
                          }

                          return result;
                        })
                      );

                      r.push(
                        <div style={{ marginTop: 5, fontWeight: 400, color: "white" }}>
                          Итого картой: {summary}
                        </div>
                      );

                      r.push(
                        <div style={{ marginTop: 5, fontWeight: 400, color: "white" }}>
                          Итого наличными: {roundFive(summary * 0.9)}
                        </div>
                      );

                      return r;
                    })()}
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
