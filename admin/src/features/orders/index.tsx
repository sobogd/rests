import React from "react";
import { categoriesService } from "../../services/categories";
import { ordersService } from "../../services/orders";
import { positionsService } from "../../services/positions";
import { tablesService } from "../../services/tables";
import Loading from "../../shared/loading";
import { useAppDispatch, useAppSelector } from "../../store";
import { OrdersForm } from "./form";
import { OrdersList } from "./list";

export const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading: isLoadingPositions } = useAppSelector((s) => s.positions);
  const { isOpenForm, isLoading: isLoadingOrders } = useAppSelector((s) => s.orders);
  const { isLoading: isLoadingTables } = useAppSelector((s) => s.tables);
  const { isLoading: isLoadingCategories } = useAppSelector((s) => s.categories);

  React.useEffect(() => {
    if (!isOpenForm) {
      dispatch(tablesService.findImage());
      dispatch(positionsService.search());
      dispatch(categoriesService.search());
      dispatch(ordersService.search());
      dispatch(tablesService.search());
    }
  }, [isOpenForm]);

  return (
    <>
      <Loading isLoading={isLoadingPositions || isLoadingOrders || isLoadingTables || isLoadingCategories} />
      {isOpenForm ? <OrdersForm /> : <OrdersList />}
    </>
  );
};
