import React from "react";
import { useAppDispatch, useAppSelector } from "app/store";
import { ordersModel } from "../model";
import {
  ButtonStyled,
  Item,
  ItemIconsBlock,
  TextSpan,
  TitleH1,
} from "../../../app/styles";
import { grey } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PositionDialog } from "./PositionDialog";

export const PositionsFilling: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPositions } = useAppSelector((s) => s.orders);
  const { items: positions } = useAppSelector((s) => s.positions);

  const handleClickPosition = (index: number) => () => {
    dispatch(ordersModel.actions.setPositionDialogIndex(index));
  };

  const handleAddNewPosition = () => {
    dispatch(ordersModel.actions.toggleIsOpenPositionForm());
  };

  const selectedPositionsList = React.useMemo(() => {
    return (
      !!selectedPositions?.length &&
      selectedPositions.map((p, index: number) => {
        const positionData = positions.find((pos) => pos.id === p.positionId);

        return (
          <Item top={10} bottom={0} paddingX={20} paddingY={10} isHaveIcons>
            <TextSpan>{positionData?.name}</TextSpan>
            <TextSpan color={grey[500]}>
              {p.additional?.map((a) => {
                const foundedAdditional = positions.find(
                  (add: any) => add.id === a.id
                );
                return (
                  <>
                    {a.count}x {foundedAdditional?.name}
                    <br />
                  </>
                );
              })}
              {p.comment}
            </TextSpan>
            <ItemIconsBlock>
              <MoreVertIcon onClick={handleClickPosition(index)} />
            </ItemIconsBlock>
          </Item>
        );
      })
    );
  }, [selectedPositions, positions]);

  return (
    <>
      <PositionDialog />
      <TitleH1 top={30} bottom={5}>
        Fill order positions:
      </TitleH1>
      {!selectedPositions?.length && (
        <TextSpan>Please press the button bellow and fill position</TextSpan>
      )}
      {selectedPositionsList}
      <ButtonStyled top={20} onClick={handleAddNewPosition}>
        Add position
      </ButtonStyled>
    </>
  );
};
