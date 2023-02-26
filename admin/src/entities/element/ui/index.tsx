import { useAppSelector } from "app/store";
import React from "react";
import Loading from "shared/loading";
import { ElementsForm } from "./form";
import { ElementsList } from "./list";

export const Elements: React.FC = () => {
  const { isOpenForm, isLoading } = useAppSelector((s) => s.elements);

  return (
    <>
      <Loading isLoading={isLoading} />
      {isOpenForm ? <ElementsForm /> : <ElementsList />}
    </>
  );
};
