import { Button, Slider, Stack, TextField } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "app/store";
import { ITable, tablesModel } from "../model";
import { tablesService } from "shared/api";
import { validatePrice, validateString } from "utils/validate";
import Header from "shared/header";
import YouSure from "shared/you-sure";
import { AlertStyled, MyForm, MyFormSubtitle } from "app/styles";
import { backUrl } from "index";

const TableSetBlock = styled.div<{ positionX: string; positionY: string }>`
  position: relative;

  ::before {
    content: "";
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background: #00897b;
    box-shadow: 0px 0px 13px -2px #00897b;
    position: absolute;
    margin: -20px;
    bottom: ${({ positionY }) => positionY}%;
    left: ${({ positionX }) => positionX}%;
    border: 5px solid #fff;
  }
`;

export const TablesForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { form, error, isOpenYouSure, imageSrc } = useAppSelector((s) => s.tables);
  const { id, number, name, positionX, positionY } = form;

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(tablesModel.actions.setFormValue({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmitForm = () => {
    const validatedForm: { [Key in keyof ITable]: { value: string; error: string } } = Object.keys(
      form
    ).reduce((acc, key) => {
      switch (key) {
        case "number":
          return {
            ...acc,
            [key]: { value: form[key].value, error: validatePrice(form[key].value, 1, 100) },
          };
        case "name":
          return {
            ...acc,
            [key]: { value: form[key].value, error: validateString(form[key].value, 2, 100) },
          };
        default:
          return acc;
      }
    }, form);

    const isValid = !Object.values(validatedForm).filter((f) => f.error).length;

    const request = {
      id: validatedForm.id.value,
      name: validatedForm.name.value,
      number: validatedForm.number.value,
      positionX: validatedForm.positionX.value.toString(),
      positionY: validatedForm.positionY.value.toString(),
    };

    if (isValid) {
      dispatch(tablesService[request.id ? "updateTable" : "createTable"](request));
    } else {
      dispatch(tablesModel.actions.setFormData(validatedForm));
    }
  };

  const handleClickEnter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmitForm();
  };

  const handleDeleteItem = () => {
    dispatch(
      tablesService.removeTable({
        id: id.value,
        name: name.value,
        number: number.value,
        positionX: positionX.value,
        positionY: positionY.value,
      })
    );
  };

  return (
    <>
      <Header
        title={id.value ? "Edit element" : "New element"}
        onClickBack={() => dispatch(tablesModel.actions.toggleIsOpenForm())}
      />
      <YouSure
        onClickYes={handleDeleteItem}
        onClickNo={() => dispatch(tablesModel.actions.toggleIsOpenYouSure())}
        isOpen={isOpenYouSure}
      />
      <MyForm onSubmit={handleClickEnter}>
        {error ? (
          <AlertStyled style={{ marginBottom: 20 }} severity="error">
            {error}
          </AlertStyled>
        ) : null}
        <TextField
          inputProps={{ form: { autocomplete: "off" } }}
          label={"Number"}
          variant="outlined"
          helperText={number.error}
          error={!!number.error}
          required
          name="number"
          value={number.value}
          type="number"
          onChange={handleChangeValue}
        />
        <TextField
          inputProps={{ form: { autocomplete: "off" } }}
          label={"Element title"}
          variant="outlined"
          helperText={name.error}
          error={!!name.error}
          required
          name="name"
          value={name.value}
          onChange={handleChangeValue}
        />
        <MyFormSubtitle>Position on the map</MyFormSubtitle>
        <Stack spacing={1} direction="row" marginBottom={7} height={300}>
          <div>
            <TableSetBlock positionX={positionX.value} positionY={positionY.value}>
              <img
                src={`${backUrl}${imageSrc}?w=248&fit=crop&auto=format`}
                srcSet={`${backUrl}${imageSrc}?w=248&fit=crop&auto=format&dpr=2 2x`}
                width="300"
                height="300"
                alt={"234324"}
                loading="lazy"
              />
            </TableSetBlock>
            <Slider
              orientation="horizontal"
              name="positionX"
              onChange={(e) => handleChangeValue(e as any)}
              value={Number(positionX.value)}
            />
          </div>
          <Slider
            orientation="vertical"
            name="positionY"
            onChange={(e) => handleChangeValue(e as any)}
            value={Number(positionY.value)}
          />
        </Stack>
        <Button variant="contained" onClick={handleSubmitForm}>
          {id.value ? "Save" : "Add"}
        </Button>
        {!!id.value && (
          <Button
            style={{ marginTop: 10 }}
            color="error"
            variant="outlined"
            onClick={() => dispatch(tablesModel.actions.toggleIsOpenYouSure())}
          >
            Delete
          </Button>
        )}
      </MyForm>
    </>
  );
};
