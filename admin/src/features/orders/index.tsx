import React from "react";
import Loading from "../../shared/loading";
import { useAppSelector } from "../../store";
import { OrdersForm } from "./form";
import { OrdersList } from "./list";

export const Orders: React.FC = () => {
  const { isOpenForm, isLoading } = useAppSelector((s) => s.orders);

  return (
    <>
      <Loading isLoading={isLoading} />
      {isOpenForm ? <OrdersForm /> : <OrdersList />}
    </>
  );
};
