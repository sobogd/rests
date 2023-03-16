import { useAppSelector } from "app/store";
import { PositionsForm, PositionsList } from "entities/positions";
import React from "react";

export const Positions: React.FC = () => {
  const { isOpenForm } = useAppSelector((s) => s.positions);

  return isOpenForm ? <PositionsForm /> : <PositionsList />;
};
