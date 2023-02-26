import React from "react";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import DoneIcon from "@mui/icons-material/Done";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { TableForOrderModal } from "./TableForOrderModal";
import { OrderModal } from "./OrderModal";
import { useAppDispatch, useAppSelector } from "app/store";
import { backUrl } from "index";
import { ordersModel } from "../model";
import Loading from "shared/loading";

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
      {tableForModalView}
      {orderModalView}
      <Box
        position={"relative"}
        marginBottom={2}
        width="calc(100vw - 32px)"
        height="calc(100vw - 32px)"
        overflow="hidden"
      >
        <img
          src={`${backUrl}${imageSrc}`}
          srcSet={`${backUrl}${imageSrc}`}
          alt={"Tables with orders"}
          width="100%"
          height="100%"
        />
        {tableListWithReadyStatus?.map((t) => (
          <TableSetBlock
            style={{ bottom: `${t.positionY}%`, left: `${t.positionX}%` }}
            onClick={() => dispatch(ordersModel.actions.setTableForModal(t))}
          >
            {!!t.countReadyOrders ? <DoneIcon /> : <AutorenewIcon />}
          </TableSetBlock>
        ))}
      </Box>
    </>
  );
};
