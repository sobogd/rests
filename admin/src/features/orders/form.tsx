import { Box, Button, Step, StepContent, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../../shared/header";
import { AlertStyled, MyForm } from "../../styles/common";
import { validateString } from "../../utils/validate";
import YouSure from "../../shared/you-sure";
import { categoriesSlice } from "../../slices/categories";
import { ICategory } from "../../interfaces/categories";
import { categoriesService } from "../../services/categories";
import { ordersSlice } from "../../slices/orders";
import { tablesService } from "../../services/tables";
import styled from "@emotion/styled";
import { EOrderSteps } from "../../enums/orders";
import { OrdersTable } from "./table";

const backUrl = "http://localhost:4000";

export const OrdersForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { form, error, isOpenYouSure, activeStep } = useAppSelector((s) => s.orders);
  const { imageSrc, items: tables } = useAppSelector((s) => s.tables);
  // const { id, name, description } = form;

  React.useEffect(() => {
    dispatch(tablesService.findImage());
    dispatch(tablesService.search());
  }, []);

  // const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(categoriesSlice.actions.setFormValue({ name: e.target.name, value: e.target.value }));
  // };

  const handleSubmitForm = () => {
    // const validatedForm: { [Key in keyof ICategory]: { value: string; error: string } } = Object.keys(
    //   form
    // ).reduce((acc, key) => {
    //   switch (key) {
    //     case "name":
    //       return {
    //         ...acc,
    //         [key]: { value: form[key].value, error: validateString(form[key].value, 1, 1000) },
    //       };
    //     case "description":
    //       return {
    //         ...acc,
    //         [key]: { value: form[key].value, error: validateString(form[key].value, 2, 100) },
    //       };
    //     default:
    //       return acc;
    //   }
    // }, form);
    // const isValid = !Object.values(validatedForm).filter((f) => f.error).length;
    // const request = {
    //   id: validatedForm.id.value,
    //   name: validatedForm.name.value,
    //   description: validatedForm.description.value,
    // };
    // if (isValid) {
    //   dispatch(categoriesService[request.id ? "update" : "create"](request));
    // } else {
    //   dispatch(categoriesSlice.actions.setFormData(validatedForm));
    // }
  };

  const handleClickEnter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmitForm();
  };

  // const handleDeleteItem = () => {
  //   dispatch(
  //     categoriesService.remove({
  //       id: id.value,
  //       name: name.value,
  //       description: description.value,
  //     })
  //   );
  // };

  return (
    <>
      <Header title="Новый заказ" onClickBack={() => dispatch(ordersSlice.actions.backStep())} />
      {/* <YouSure
        onClickYes={handleDeleteItem}
        onClickNo={() => dispatch(categoriesSlice.actions.toggleIsOpenYouSure())}
        isOpen={isOpenYouSure}
      /> */}
      {error ? (
        <AlertStyled style={{ marginBottom: 20 }} severity="error">
          {error}
        </AlertStyled>
      ) : null}
      {activeStep === EOrderSteps.TABLE && <OrdersTable />}
      <MyForm onSubmit={handleClickEnter}>
        {/* 
        <TextField
          inputProps={{ form: { autocomplete: "off" } }}
          label={"Category title"}
          variant="outlined"
          helperText={name.error}
          error={!!name.error}
          required
          name="name"
          value={name.value}
          onChange={handleChangeValue}
        />
        <TextField
          inputProps={{ form: { autocomplete: "off" } }}
          label={"Description"}
          multiline
          maxRows={4}
          minRows={2}
          variant="outlined"
          helperText={description.error}
          error={!!description.error}
          required
          name="description"
          value={description.value}
          onChange={handleChangeValue}
        />
       
        {!!id.value && (
          <Button
            style={{ marginTop: 10 }}
            color="error"
            variant="outlined"
            onClick={() => dispatch(categoriesSlice.actions.toggleIsOpenYouSure())}
          >
            Delete
          </Button>
        )} */}
      </MyForm>
    </>
  );
};
