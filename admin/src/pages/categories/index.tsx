import { useAppSelector } from "app/store";
import { CategoriesForm, CategoriesList } from "entities/categories";
import React from "react";

export const Categories: React.FC = () => {
  const { isOpenForm } = useAppSelector((s) => s.categories);

  return <>{isOpenForm ? <CategoriesForm /> : <CategoriesList />}</>;
};
