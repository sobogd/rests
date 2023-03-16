import { useAppSelector } from "app/store";
import { TablesForm, TablesList } from "entities/tables";
import React from "react";

export const Tables: React.FC = () => {
  const { isOpenForm } = useAppSelector((s) => s.tables);

  return <>{isOpenForm ? <TablesForm /> : <TablesList />}</>;
};
