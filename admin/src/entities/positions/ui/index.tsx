import { useAppSelector } from "app/store";
import React from "react";
import Loading from "shared/loading";
import { PositionsForm } from "./form";
import { PositionsList } from "./list";

export const Positions: React.FC = () => {
  const { isOpenForm, isLoading } = useAppSelector((s) => s.positions);

  return (
    <>
      <Loading isLoading={isLoading} />
      {isOpenForm ? <PositionsForm /> : <PositionsList />}
    </>
  );
};
