import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useAppDispatch, useAppSelector } from "app/store";
import { IPosition, positionsModel } from "../model";
import {
  ButtonStyled,
  Item,
  ItemIconsBlock,
  TextSpan,
} from "../../../app/styles";
import { grey } from "@mui/material/colors";

export const PositionsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.positions);

  const handleAddNewPosition = () => {
    dispatch(positionsModel.actions.toggleIsOpenForm());
  };

  const handleClickEdit = (position: IPosition) => () => {
    dispatch(positionsModel.actions.startEditItem(position));
  };

  return (
    <>
      <ButtonStyled onClick={handleAddNewPosition} bottom={20}>
        Add new position
      </ButtonStyled>
      {!!items.length &&
        items.map((position) => (
          <Item
            isHaveIcons
            paddingX={20}
            paddingY={10}
            bottom={10}
            key={position.id}
          >
            <TextSpan>{position.name}</TextSpan>
            <TextSpan color={grey[500]}>{position.price}</TextSpan>
            <ItemIconsBlock>
              <ModeEditOutlineIcon onClick={handleClickEdit(position)} />
            </ItemIconsBlock>
          </Item>
        ))}
    </>
  );
};
