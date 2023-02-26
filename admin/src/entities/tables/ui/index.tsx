import { useAppSelector } from "app/store";
import React from "react";
import Loading from "shared/loading";
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
