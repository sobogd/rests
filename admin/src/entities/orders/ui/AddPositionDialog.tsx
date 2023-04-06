import { TextField } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "app/store";
import { EPositionFormSteps, ordersModel } from "../model";
import {
  ButtonStyled,
  Item,
  NewModal,
  NewModalBackButton,
  NewModalBody,
  NewModalCloseButton,
  NewModalContainer,
  NewModalFooter,
  NewModalHeader,
  TextSpan,
  TitleH1,
} from "../../../app/styles";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IPosition } from "../../positions";
import { AdditionalCalc } from "./syles";

export const AddPositionDialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories, positions, orders } = useAppSelector((s) => s);
  const { positionsForm } = orders;

  const handleCloseAddPositionDialog = () => {
    dispatch(ordersModel.actions.toggleIsOpenPositionForm());
  };

  const handleBackAddPositionDialog = () => {
    let prevStep = EPositionFormSteps.CATEGORY;

    if (positionsForm.step === EPositionFormSteps.ADDITIONAL) {
      prevStep = EPositionFormSteps.POSITION;
    }

    if (positionsForm.step === EPositionFormSteps.COMMENT) {
      const foundedPosition = positions.items.find(
        (p) => p.id === positionsForm.positionId
      );
      prevStep = foundedPosition?.additional?.length
        ? EPositionFormSteps.ADDITIONAL
        : EPositionFormSteps.POSITION;
    }

    dispatch(ordersModel.actions.setPositionFormStep(prevStep));
  };

  const handleNextStep = () => {
    if (positionsForm.step === EPositionFormSteps.COMMENT) {
      dispatch(ordersModel.actions.savePositionForm(positionsForm.editIndex));
    }
    if (positionsForm.step === EPositionFormSteps.ADDITIONAL) {
      dispatch(
        ordersModel.actions.setPositionFormStep(EPositionFormSteps.COMMENT)
      );
    }
  };

  const handleClickPosition = (position: IPosition) => () => {
    dispatch(ordersModel.actions.setSelectedPositionId(position.id));
    dispatch(
      ordersModel.actions.setPositionFormStep(
        position.additional.length
          ? EPositionFormSteps.ADDITIONAL
          : EPositionFormSteps.COMMENT
      )
    );
  };

  const renderSelectCategory = () =>
    categories.items.map((c) => (
      <ButtonStyled
        style={{ marginBottom: 10 }}
        onClick={() => {
          dispatch(ordersModel.actions.setSelectedCategoryId(c.id));
          dispatch(
            ordersModel.actions.setPositionFormStep(EPositionFormSteps.POSITION)
          );
        }}
      >
        {c.name}
      </ButtonStyled>
    ));

  const renderSelectPosition = () => {
    const filteredPositions = positions.items
      .filter((p) => !p.isAdditional)
      .filter((p) =>
        p.categories
          .map((c) => c.categoryId)
          .includes(positionsForm.categoryId?.toString() || "")
      )
      .sort((a, b) => (a.sort && b.sort && a.sort < b.sort ? -1 : 1));

    return filteredPositions.map((position) => (
      <ButtonStyled bottom={10} onClick={handleClickPosition(position)}>
        {position.name}
      </ButtonStyled>
    ));
  };

  const renderSelectAdditional = () => {
    const foundedPosition = positions.items.find(
      (p) => p.id === positionsForm.positionId
    );

    if (!foundedPosition?.additional?.length || !positions?.items?.length) {
      return null;
    }

    const additionalIds = foundedPosition.additional.map((a) =>
      Number(a.positionId)
    );

    const additionals = positions.items
      .filter((p) => p.isAdditional)
      .filter((p) => additionalIds.includes(Number(p.id)))
      .sort((a, b) => (a.sort && b.sort && a.sort < b.sort ? -1 : 1));

    if (!additionals?.length) {
      return null;
    }

    return additionals.map((p) => {
      const foundedAdditionalInForm = positionsForm.additional?.find(
        (a) => a.id === p.id
      );

      return (
        <Item paddingX={20} paddingY={10} bottom={10}>
          <TextSpan bottom={10}>{p.name}</TextSpan>
          <AdditionalCalc>
            <ButtonStyled
              onClick={() =>
                dispatch(ordersModel.actions.additionalMinus(p.id))
              }
            >
              -
            </ButtonStyled>
            <TextSpan>{foundedAdditionalInForm?.count || 0}</TextSpan>
            <ButtonStyled
              onClick={() => dispatch(ordersModel.actions.additionalPlus(p.id))}
            >
              +
            </ButtonStyled>
          </AdditionalCalc>
        </Item>
      );
    });
  };

  const renderComment = () => {
    if (
      !positionsForm.step ||
      positionsForm.step !== EPositionFormSteps.COMMENT
    ) {
      return null;
    }

    return (
      <TextField
        label={"Comment for position"}
        multiline
        minRows={10}
        style={{ marginBottom: 0 }}
        variant="outlined"
        value={positionsForm.comment}
        onChange={(e) =>
          dispatch(ordersModel.actions.setPositionFormComment(e.target.value))
        }
      />
    );
  };

  return (
    <NewModal open={!!positionsForm.isOpened}>
      <NewModalContainer>
        <NewModalHeader>
          <TitleH1 size={20}>Adding position</TitleH1>
        </NewModalHeader>
        <NewModalCloseButton onClick={handleCloseAddPositionDialog}>
          <CloseIcon />
        </NewModalCloseButton>
        {positionsForm.step !== EPositionFormSteps.CATEGORY && (
          <NewModalBackButton onClick={handleBackAddPositionDialog}>
            <ArrowBackIcon />
          </NewModalBackButton>
        )}
        <NewModalBody>
          {positionsForm.step === EPositionFormSteps.CATEGORY &&
            renderSelectCategory()}
          {positionsForm.step === EPositionFormSteps.POSITION &&
            renderSelectPosition()}
          {positionsForm.step === EPositionFormSteps.ADDITIONAL &&
            renderSelectAdditional()}
          {positionsForm.step === EPositionFormSteps.COMMENT && renderComment()}
        </NewModalBody>
        {[
          EPositionFormSteps.ADDITIONAL,
          EPositionFormSteps.COMMENT,
          undefined,
        ].includes(positionsForm.step) && (
          <NewModalFooter>
            <ButtonStyled onClick={handleNextStep}>Next</ButtonStyled>
          </NewModalFooter>
        )}
      </NewModalContainer>
    </NewModal>
  );
};
