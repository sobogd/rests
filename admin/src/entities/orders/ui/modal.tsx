import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "app/store";
import { EPositionFormSteps, ordersModel } from "../model";
import { teal } from "@mui/material/colors";

const AdditionalSelectBlock = styled(Typography)`
  font-size: 18px;
  margin-bottom: 10px;
  padding-bottom: 18px;
  border-bottom: 1px solid #414241;
  color: #fff;
  p {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
`;

export const AddPositionModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories, positions, orders } = useAppSelector((s) => s);
  const { positionsForm } = orders;

  const renderSelectCategory = () =>
    categories.items.map((c) => (
      <Button
        fullWidth
        style={{ marginBottom: 20 }}
        variant="contained"
        onClick={() => {
          dispatch(ordersModel.actions.setSelectedCategoryId(c.id));
          dispatch(ordersModel.actions.setPositionFormStep(EPositionFormSteps.POSITION));
        }}
      >
        {c.name}
      </Button>
    ));

  const renderSelectPosition = () => {
    const filteredPositions = positions.items
      .filter((p) => !p.isAdditional)
      .filter((p) =>
        p.categories.map((c) => c.categoryId).includes(positionsForm.categoryId?.toString() || "")
      )
      .sort((a, b) => (a.sort && b.sort && a.sort < b.sort ? -1 : 1));

    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {filteredPositions.map((p) => (
          <Grid item xs={6}>
            <Button
              fullWidth
              style={{ fontWeight: 600, height: "100%", background: teal[800], fontSize: 13 }}
              variant="contained"
              onClick={() => {
                dispatch(ordersModel.actions.setSelectedPositionId(p.id));
                dispatch(
                  ordersModel.actions.setPositionFormStep(
                    p.additional.length ? EPositionFormSteps.ADDITIONAL : EPositionFormSteps.COMMENT
                  )
                );
              }}
            >
              {p.name}
              <br />
              {p.description}
            </Button>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderSelectAdditional = () => {
    const foundedPosition = positions.items.find((p) => p.id === positionsForm.positionId);

    if (!foundedPosition?.additional?.length || !positions?.items?.length) {
      return null;
    }

    const additionalIds = foundedPosition.additional.map((a) => Number(a.positionId));

    const additionals = positions.items
      .filter((p) => p.isAdditional)
      .filter((p) => additionalIds.includes(Number(p.id)))
      .sort((a, b) => (a.sort && b.sort && a.sort < b.sort ? -1 : 1));

    if (!additionals?.length) {
      return null;
    }

    return (
      <Grid container rowSpacing={1} columnSpacing={4}>
        {additionals.map((p) => {
          const foundedAdditionalInForm = positionsForm.additional?.find((a) => a.id === p.id);

          return (
            <Grid item xs={6}>
              <Typography variant="body2" marginBottom={1}>
                {p.name}
              </Typography>
              <Grid container rowSpacing={1} columnSpacing={0}>
                <Grid item xs={4} padding={0}>
                  <Button
                    variant="contained"
                    style={{ minWidth: 0 }}
                    fullWidth
                    onClick={() => dispatch(ordersModel.actions.additionalMinus(p.id))}
                  >
                    -
                  </Button>
                </Grid>
                <Grid item xs={4} padding={0} display="flex" justifyContent="center" alignItems="center">
                  <Typography variant="body2">{foundedAdditionalInForm?.count || 0}</Typography>
                </Grid>
                <Grid item xs={4} padding={0}>
                  <Button
                    variant="contained"
                    style={{ minWidth: 0 }}
                    fullWidth
                    onClick={() => dispatch(ordersModel.actions.additionalPlus(p.id))}
                  >
                    +
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          );
        })}

        <Button
          fullWidth
          style={{ marginTop: 20 }}
          variant="contained"
          onClick={() => {
            dispatch(ordersModel.actions.setPositionFormStep(EPositionFormSteps.COMMENT));
          }}
        >
          Далее
        </Button>
      </Grid>
    );
  };

  const renderComment = () => {
    if (!positionsForm.step || positionsForm.step !== EPositionFormSteps.COMMENT) {
      return null;
    }

    return (
      <>
        <TextField
          inputProps={{ form: { autocomplete: "off" } }}
          label={"Комментарий к позиции"}
          multiline
          maxRows={15}
          minRows={15}
          variant="outlined"
          required
          name="description"
          value={positionsForm.comment}
          onChange={(e) => dispatch(ordersModel.actions.setPositionFormComment(e.target.value))}
        />
        <Button
          fullWidth
          style={{ marginBottom: 20 }}
          variant="contained"
          onClick={() => {
            dispatch(ordersModel.actions.savePositionForm(positionsForm.editIndex));
          }}
        >
          {positionsForm.editIndex !== undefined ? "Сохранить" : "Добавить позицию"}
        </Button>
      </>
    );
  };

  return (
    <>
      {positionsForm.step === EPositionFormSteps.CATEGORY && renderSelectCategory()}
      {positionsForm.step === EPositionFormSteps.POSITION && renderSelectPosition()}
      {positionsForm.step === EPositionFormSteps.ADDITIONAL && renderSelectAdditional()}
      {positionsForm.step === EPositionFormSteps.COMMENT && renderComment()}
    </>
  );
};
