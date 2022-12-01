import React from "react";
import Loading from "../../shared/loading";
import { useAppSelector } from "../../store";
import { CategoriesForm } from "./form";
import { CategoriesList } from "./list";

export const Categories: React.FC = () => {
  const { isOpenForm, isLoading } = useAppSelector((s) => s.categories);

  return (
    <>
      <Loading isLoading={isLoading} />
      {isOpenForm ? <CategoriesForm /> : <CategoriesList />}
    </>
  );
};
