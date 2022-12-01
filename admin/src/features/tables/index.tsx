import React from "react";
import Loading from "../../shared/loading";
import { useAppSelector } from "../../store";
import { TablesForm } from "./form";
import { TablesList } from "./list";

export const Tables: React.FC = () => {
  const { isOpenForm, isLoading } = useAppSelector((s) => s.tables);

  return (
    <>
      <Loading isLoading={isLoading} />
      {isOpenForm ? <TablesForm /> : <TablesList />}
    </>
  );
};
