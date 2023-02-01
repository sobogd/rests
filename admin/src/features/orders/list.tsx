import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../../shared/header";
import { ordersSlice } from "../../slices/orders";
import Loading from "../../shared/loading";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { backUrl } from "../..";
import DoneIcon from "@mui/icons-material/Done";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { TableForOrderModal } from "./TableForOrderModal";
import { OrderModal } from "./OrderModal";

const TableSetBlock = styled.span`
  position: absolute;
  width: 35px;
  height: 35px;
  margin: -13px;
  cursor: pointer;
  background: #01695c;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #212121;
`;

export const OrdersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, tableForModal, orderForBill } = useAppSelector((s) => s.orders);
  const { isLoading: isTableLoading } = useAppSelector((s) => s.tables);
  const { isLoading: isPositionsLoading } = useAppSelector((s) => s.positions);
  const { imageSrc, items: tables } = useAppSelector((s) => s.tables);

  const tableListWithReadyStatus = React.useMemo(() => {
    return tables
      .map((t) => {
        const ordersForTable = items.filter((i) => Number(i.tableId) === Number(t.id));
        return {
          ...t,
          isHaveOrders: !!ordersForTable.length,
          countReadyOrders: ordersForTable.filter((oft) => !!oft.finishTime).length,
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
      <Header title="Orders" onClickAdd={() => dispatch(ordersSlice.actions.toggleIsOpenForm())} />
      {tableForModalView}
      {orderModalView}
      <Box position={"relative"}>
        <img
          src={`${backUrl}${imageSrc}?w=248&fit=crop&auto=format`}
          srcSet={`${backUrl}${imageSrc}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={"Tables with orders"}
        />
        {tableListWithReadyStatus?.map((t) => (
          <TableSetBlock
            style={{ bottom: `${t.positionY}%`, left: `${t.positionX}%` }}
            onClick={() => dispatch(ordersSlice.actions.setTableForModal(t))}
          >
            {!!t.countReadyOrders ? <DoneIcon /> : <AutorenewIcon />}
          </TableSetBlock>
        ))}
      </Box>
    </>
  );
};
