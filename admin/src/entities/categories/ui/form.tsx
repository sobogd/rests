import { Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/store";
import { AlertStyled, MyForm } from "app/styles";
import React from "react";
import { categoriesService } from "api";
import YouSure from "shared/you-sure";
import { validateString } from "utils/validate";
import { categoriesModel, ICategory } from "../model";

export const CategoriesForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { form, error, isOpenYouSure } = useAppSelector((s) => s.categories);
  const { id, name, description } = form;

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      categoriesModel.actions.setFormValue({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleSubmitForm = () => {
    const validatedForm: {
      [Key in keyof ICategory]: { value: string; error: string };
    } = Object.keys(form).reduce((acc, key) => {
      switch (key) {
        case "name":
          return {
            ...acc,
            [key]: {
              value: form[key].value,
              error: validateString(form[key].value, 1, 1000),
            },
          };
        case "description":
          return {
            ...acc,
            [key]: {
              value: form[key].value,
              error: validateString(form[key].value, 2, 100),
            },
          };
        default:
          return acc;
      }
    }, form);

    const isValid = !Object.values(validatedForm).filter((f) => f.error).length;

    const request = {
      id: Number(validatedForm.id.value),
      name: validatedForm.name.value,
      description: validatedForm.description.value,
    };

    if (isValid) {
      dispatch(
        categoriesService[request.id ? "updateCategory" : "createCategory"](
          request
        )
      );
    } else {
      dispatch(categoriesModel.actions.setFormData(validatedForm));
    }
  };

  const handleClickEnter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmitForm();
  };

  const handleDeleteItem = () => {
    dispatch(
      categoriesService.removeCategory({
        id: Number(id.value),
        name: name.value,
        description: description.value,
      })
    );
  };

  return (
    <>
      <YouSure
        onClickYes={handleDeleteItem}
        onClickNo={() =>
          dispatch(categoriesModel.actions.toggleIsOpenYouSure())
        }
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
          label={"Наименование"}
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
          label={"Описание"}
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
          {id.value ? "Сохранить" : "Добавить"}
        </Button>
        {!!id.value && (
          <Button
            style={{ marginTop: 10 }}
            color="error"
            variant="outlined"
            onClick={() =>
              dispatch(categoriesModel.actions.toggleIsOpenYouSure())
            }
          >
            Удалить
          </Button>
        )}
      </MyForm>
    </>
  );
};
