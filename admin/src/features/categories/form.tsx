import { Button, TextField } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../../shared/header";
import { AlertStyled, MyForm } from "../../styles/common";
import { validateString } from "../../utils/validate";
import YouSure from "../../shared/you-sure";
import { categoriesSlice } from "../../slices/categories";
import { ICategory } from "../../interfaces/categories";
import { categoriesService } from "../../services/categories";

export const CategoriesForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { form, error, isOpenYouSure } = useAppSelector((s) => s.categories);
  const { id, name, description } = form;

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(categoriesSlice.actions.setFormValue({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmitForm = () => {
    const validatedForm: { [Key in keyof ICategory]: { value: string; error: string } } = Object.keys(
      form
    ).reduce((acc, key) => {
      switch (key) {
        case "name":
          return {
            ...acc,
            [key]: { value: form[key].value, error: validateString(form[key].value, 1, 1000) },
          };
        case "description":
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
      description: validatedForm.description.value,
    };

    if (isValid) {
      dispatch(categoriesService[request.id ? "update" : "create"](request));
    } else {
      dispatch(categoriesSlice.actions.setFormData(validatedForm));
    }
  };

  const handleClickEnter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmitForm();
  };

  const handleDeleteItem = () => {
    dispatch(
      categoriesService.remove({
        id: id.value,
        name: name.value,
        description: description.value,
      })
    );
  };

  return (
    <>
      <Header
        title={id.value ? "Edit category" : "New category"}
        onClickBack={() => dispatch(categoriesSlice.actions.toggleIsOpenForm())}
      />
      <YouSure
        onClickYes={handleDeleteItem}
        onClickNo={() => dispatch(categoriesSlice.actions.toggleIsOpenYouSure())}
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
        <Button variant="contained" onClick={handleSubmitForm}>
          {id.value ? "Save" : "Add"}
        </Button>
        {!!id.value && (
          <Button
            style={{ marginTop: 10 }}
            color="error"
            variant="outlined"
            onClick={() => dispatch(categoriesSlice.actions.toggleIsOpenYouSure())}
          >
            Delete
          </Button>
        )}
      </MyForm>
    </>
  );
};
