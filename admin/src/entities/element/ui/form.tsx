import { Button, InputAdornment, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/store";
import { AlertStyled, MyForm } from "app/styles";
import React from "react";
import { elementsService } from "api";
import YouSure from "shared/you-sure";
import { validatePrice, validateString } from "utils/validate";
import { elementModel, IElement } from "../model";

export const ElementsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { form, error, isOpenYouSure } = useAppSelector((s) => s.elements);
  const { id, element, price, priceForCount } = form;

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      elementModel.actions.setFormValue({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleSubmitForm = () => {
    const validatedForm: {
      [Key in keyof IElement]: { value: string; error: string };
    } = Object.keys(form).reduce((acc, key) => {
      switch (key) {
        case "price":
          return {
            ...acc,
            [key]: {
              value: form[key].value,
              error: validatePrice(form[key].value, 1, 1500),
            },
          };
        case "element":
          return {
            ...acc,
            [key]: {
              value: form[key].value,
              error: validateString(form[key].value, 2, 100),
            },
          };
        case "priceForCount":
          return {
            ...acc,
            [key]: {
              value: form[key].value,
              error: validatePrice(form[key].value, 1, 500),
            },
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
      priceForCount: validatedForm.priceForCount.value,
    };

    if (isValid) {
      dispatch(
        elementsService[request.id ? "updateElement" : "createElement"](request)
      );
    } else {
      dispatch(elementModel.actions.setFormData(validatedForm));
    }
  };

  const handleClickEnter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmitForm();
  };

  const handleDeleteItem = () => {
    dispatch(
      elementsService.removeElement({
        id: id.value,
        element: element.value,
        price: price.value,
        priceForCount: priceForCount.value,
      })
    );
  };

  return (
    <>
      <YouSure
        onClickYes={handleDeleteItem}
        onClickNo={() => dispatch(elementModel.actions.toggleIsOpenYouSure())}
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
          helperText={element.error || `Например: "Яйца" или "Мука"`}
          error={!!element.error}
          required
          name="element"
          value={element.value}
          onChange={handleChangeValue}
        />
        <TextField
          inputProps={{ form: { autocomplete: "off" } }}
          label={"Цена за упаковку"}
          variant="outlined"
          helperText={price.error}
          error={!!price.error}
          required
          name="price"
          value={price.value}
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">лир</InputAdornment>,
          }}
          onChange={handleChangeValue}
        />
        <TextField
          inputProps={{ form: { autocomplete: "off" } }}
          label={"Вес/количество в упаковке"}
          variant="outlined"
          helperText={
            priceForCount.error ||
            `Например: "1000" грамм муки или "10" штук яиц`
          }
          error={!!priceForCount.error}
          required
          name="priceForCount"
          value={priceForCount.value}
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">г/шт</InputAdornment>,
          }}
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
            onClick={() => dispatch(elementModel.actions.toggleIsOpenYouSure())}
          >
            Удалить
          </Button>
        )}
      </MyForm>
    </>
  );
};
