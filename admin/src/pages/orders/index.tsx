import React from "react";
import { useAppDispatch, useAppSelector } from "app/store";
import { ordersService } from "shared/api";
import { OrdersForm, OrdersList } from "entities/orders";
import { WrapperScrolled } from "../../app/styles";

export const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpenForm } = useAppSelector((s) => s.orders);

  React.useEffect(() => {
    if (!isOpenForm) dispatch(ordersService.searchOrders());
  }, [isOpenForm]);

  return (
    <WrapperScrolled>
      <OrdersForm />
      <OrdersList />
    </WrapperScrolled>
  );
};
