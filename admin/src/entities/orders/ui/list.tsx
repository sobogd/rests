import React from "react";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import DoneIcon from "@mui/icons-material/Done";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { TableForOrderModal } from "./TableForOrderModal";
import { OrderModal } from "./OrderModal";
import { useAppDispatch, useAppSelector } from "app/store";
import { ordersModel } from "../model";
import Loading from "shared/loading";
import { API_URL } from "shared/config";
import { TableSelectWrapper, TableSetBlock } from "./syles";
import TableBarIcon from "@mui/icons-material/TableBar";

export const OrdersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, tableForModal, orderForBill } = useAppSelector(
    (s) => s.orders
  );
  const { isLoading: isTableLoading } = useAppSelector((s) => s.tables);
  const { isLoading: isPositionsLoading } = useAppSelector((s) => s.positions);
  const { imageSrc, items: tables } = useAppSelector((s) => s.tables);

  const tableListWithReadyStatus = React.useMemo(() => {
    return tables
      .map((t) => {
        const ordersForTable = items.filter(
          (i) => Number(i.tableId) === Number(t.id)
        );
        return {
          ...t,
          isHaveOrders: !!ordersForTable.length,
          countReadyOrders: ordersForTable.filter((oft) => !!oft.finishTime)
            .length,
        };
      })
      .filter((t) => t.isHaveOrders);
  }, [tables, items]);

  const tableForModalView = React.useMemo(() => {
    if (!!tableForModal) {
      return <TableForOrderModal />;
    }
  }, [tableForModal]);

  const orderModalView = React.useMemo(() => {
    if (!!orderForBill) {
      return <OrderModal />;
    }
  }, [orderForBill]);

  return (
    <>
      <Loading isLoading={isLoading || isTableLoading || isPositionsLoading} />
      {tableForModalView}
      {orderModalView}
      <TableSelectWrapper>
        <img
          src={`${API_URL}${imageSrc}`}
          srcSet={`${API_URL}${imageSrc}`}
          alt={"Tables with orders"}
          width="100%"
          height="100%"
        />
        {tableListWithReadyStatus?.map((t) => (
          <TableSetBlock
            key={t.id}
            positionY={t.positionY}
            positionX={t.positionX}
            isSelected={false}
            onClick={() => dispatch(ordersModel.actions.setTableForModal(t))}
          >
            {!!t.countReadyOrders ? <DoneIcon /> : <AutorenewIcon />}
          </TableSetBlock>
        ))}
      </TableSelectWrapper>
    </>
  );
};
