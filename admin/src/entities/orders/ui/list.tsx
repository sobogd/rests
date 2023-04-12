import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { TableForOrderModal } from "./TableForOrderModal";
import { OrderModal } from "./OrderModal";
import { useAppDispatch, useAppSelector } from "app/store";
import { EOrderStatus, ordersModel } from "../model";
import { API_URL } from "config";
import { TableSelectWrapper, TableSetBlock } from "./syles";
import { ButtonStyled } from "../../../app/styles";

export const OrdersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, tableForModal, orderForBill } = useAppSelector(
    (s) => s.orders
  );
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
          countReadyOrders: ordersForTable.filter(
            (o) => o.status === EOrderStatus.FINISHED
          ).length,
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

  const handleOpenNewOrderModal = () => {
    dispatch(ordersModel.actions.toggleIsOpenForm());
  };

  return (
    <>
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
      <ButtonStyled top={15} onClick={handleOpenNewOrderModal}>
        New order
      </ButtonStyled>
    </>
  );
};
