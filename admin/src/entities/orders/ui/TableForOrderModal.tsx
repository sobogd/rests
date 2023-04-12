import { useAppDispatch, useAppSelector } from "app/store";
import {
  ButtonStyled,
  Item,
  NewModal,
  NewModalBody,
  NewModalCloseButton,
  NewModalContainer,
  NewModalHeader,
  TextSpan,
  TitleH1,
} from "app/styles";
import React from "react";
import { IOrder, ordersModel } from "../model";
import CloseIcon from "@mui/icons-material/Close";
import { getTimeInFormat } from "../../../utils/timeInFormat";

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

  const handleCloseModal = () => {
    dispatch(ordersModel.actions.setTableForModal(undefined));
  };

  const handleBillOrder = (order: IOrder) => () => {
    dispatch(ordersModel.actions.setOrderForBill(order));
  };

  const handleEditOrder = (order: IOrder) => () => {
    dispatch(
      ordersModel.actions.startEditItem({
        ...order,
        selectedTable: tables.find((t) => t.id === order.tableId),
      })
    );
  };

  return (
    <NewModal
      open={!!tableForModal && !isLoadingOrders && !isLoadingTables}
      onClose={handleCloseModal}
    >
      <NewModalContainer>
        <NewModalHeader>
          <TitleH1 size={20}>
            Orders for table:
            <br /> {tableForModal?.name}
          </TitleH1>
        </NewModalHeader>
        <NewModalCloseButton onClick={handleCloseModal}>
          <CloseIcon />
        </NewModalCloseButton>
        <NewModalBody>
          {!!orderForTable.length &&
            orderForTable?.map((order) => {
              return (
                <Item bottom={10} paddingX={20} paddingY={10}>
                  <TextSpan>Order №{order.id}</TextSpan>
                  <TextSpan>From {getTimeInFormat(order.created)}</TextSpan>
                  {!!order.comment && (
                    <TextSpan>Comment: {order.comment}</TextSpan>
                  )}
                  <ButtonStyled
                    bottom={10}
                    top={10}
                    onClick={handleBillOrder(order)}
                  >
                    Bill
                  </ButtonStyled>
                  <ButtonStyled onClick={handleEditOrder(order)}>
                    Edit
                  </ButtonStyled>
                </Item>
              );
            })}
        </NewModalBody>
      </NewModalContainer>
    </NewModal>
  );
};
