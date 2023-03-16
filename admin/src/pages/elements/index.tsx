import { useAppSelector } from "app/store";
import { ElementsForm, ElementsList } from "entities/element";
import React from "react";

export const Elements: React.FC = () => {
  const { isOpenForm } = useAppSelector((s) => s.elements);

  return <>{isOpenForm ? <ElementsForm /> : <ElementsList />}</>;
};
