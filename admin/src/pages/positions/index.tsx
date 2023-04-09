import { useAppDispatch, useAppSelector } from "app/store";
import { PositionsForm, PositionsList } from "entities/positions";
import React from "react";
import { WrapperScrolled } from "../../app/styles";
import {
  categoriesService,
  elementsService,
  searchPositions,
} from "../../shared/api";

export const Positions: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpenForm = useAppSelector((s) => s.positions.isOpenForm);

  React.useEffect(() => {
    dispatch(elementsService.searchElements());
    dispatch(categoriesService.searchCategories());
  }, []);

  React.useEffect(() => {
    if (!isOpenForm) {
      dispatch(searchPositions());
    }
  }, [isOpenForm]);

  return (
    <WrapperScrolled>
      <PositionsForm />
      <PositionsList />
    </WrapperScrolled>
  );
};
