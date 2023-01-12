import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../../shared/header";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { ordersService } from "../../services/orders";
import { ordersSlice } from "../../slices/orders";
import { tablesService } from "../../services/tables";
import Loading from "../../shared/loading";

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
          const positionsIds = i.ordersPositions?.map((op) => Number(op.positionId)) || [];
          const additionalsForPosition = i.ordersPositions
            ?.filter((op) => !!op.additional?.length)
            .map((op) => op.additional);
          const positionsList: any = positionsItems
            .filter((pi) => positionsIds.includes(Number(pi.id)))
            .map((pi) => `${pi.name} - ${pi.price}`);

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
                    {positionsList.map((e: any) => {
                      return (
                        <div>
                          {e}
                          <br></br>
                        </div>
                      );
                    })}
                    {arrayAdditional.map((e: any) => {
                      return (
                        <div style={{ paddingLeft: 20 }}>
                          {e}
                          <br></br>
                        </div>
                      );
                    })}
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
