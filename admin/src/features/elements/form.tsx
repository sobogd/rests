import { Button, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../../shared/header";
import { AlertStyled, MyForm } from "../../styles/common";
import { elementsSlice } from "../../slices/elements";
import { IElement } from "../../interfaces/elements";
import { validatePrice, validateString } from "../../utils/validate";
import { elementsService } from "../../services/elements";
import YouSure from "../../shared/you-sure";

export const ElementsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { form, error, isOpenYouSure } = useAppSelector((s) => s.elements);
  const { id, element, price } = form;

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(elementsSlice.actions.setFormValue({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmitForm = () => {
    const validatedForm: { [Key in keyof IElement]: { value: string; error: string } } = Object.keys(
      form
    ).reduce((acc, key) => {
      switch (key) {
        case "price":
          return {
            ...acc,
            [key]: { value: form[key].value, error: validatePrice(form[key].value, 1, 1000) },
          };
        case "element":
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
      element: validatedForm.element.value,
      price: validatedForm.price.value,
    };

    if (isValid) {
      dispatch(elementsService[request.id ? "update" : "create"](request));
    } else {
      dispatch(elementsSlice.actions.setFormData(validatedForm));
    }
  };

  const handleClickEnter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmitForm();
  };

  const handleDeleteItem = () => {
    dispatch(
      elementsService.remove({
        id: id.value,
        element: element.value,
        price: price.value,
      })
    );
  };

  return (
    <>
      <Header
        title={id.value ? "Edit element" : "New element"}
        onClickBack={() => dispatch(elementsSlice.actions.toggleIsOpenForm())}
      />
      <YouSure
        onClickYes={handleDeleteItem}
        onClickNo={() => dispatch(elementsSlice.actions.toggleIsOpenYouSure())}
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
          label={"Element title"}
          variant="outlined"
          helperText={element.error}
          error={!!element.error}
          required
          name="element"
          value={element.value}
          onChange={handleChangeValue}
        />
        <TextField
          inputProps={{ form: { autocomplete: "off" } }}
          label={"Price"}
          variant="outlined"
          helperText={price.error}
          error={!!price.error}
          required
          name="price"
          value={price.value}
          type="number"
          InputProps={{ endAdornment: <InputAdornment position="end">TL</InputAdornment> }}
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
            onClick={() => dispatch(elementsSlice.actions.toggleIsOpenYouSure())}
          >
            Delete
          </Button>
        )}
      </MyForm>
    </>
  );
};
