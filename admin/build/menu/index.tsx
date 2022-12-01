import { Button, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { setFormData, setFormValue, toggleAddingPositionForm } from "../../../slices/menu";
import { useAppDispatch, useAppSelector } from "../../../store";
import Loading from "../../../shared/loading";
import Header from "../../../shared/header";
import { AlertStyled, MyForm, MyFormSubtitle } from "../../../styles/common";
import { getHelperText } from "../../../utils/getHelperText";
import { IMenuForm, IMenuFormData } from "../../../interfaces/menu";
import { menuCreate } from "../../../services/menu";
import { elementsService } from "../../../services/elements";
import { PositionFormGeneral } from "./general-part";
import { PositionFormComposition } from "./composition-part";

export const MenuForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector((s) => s.menu);
  const { items } = useAppSelector((s) => s.elements);

  const handleCloseAddingForm = () => {
    dispatch(toggleAddingPositionForm());
  };
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormValue({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmitForm = () => {
    // const validatedForm = (Object.keys(form) as (keyof IMenuForm)[]).reduce((acc, key) => {
    //   const errors = [];

    // if (["name", "description"].includes(key)) {
    //   if (form[key].value.length === 0) {
    //     errors.push(getHelperText("required"));
    //   } else if (form[key].value.length < 3) {
    //     errors.push(getHelperText("minLength"));
    //   } else if (form[key].value.length > 1000) {
    //     errors.push(getHelperText("maxLength"));
    //   }
    // }

    // if (["price", "weight"].includes(key)) {
    //   if (Number(form[key].value) < 1) {
    //     errors.push(getHelperText("min"));
    //   } else if (Number(form[key].value) > 10000) {
    //     errors.push(getHelperText("max"));
    //   }
    // }

    //   return { ...acc, [key]: { ...form[key], error: errors.join(",") } };
    // }, {});

    const validatedForm = {};

    const isValid = !(Object.values(validatedForm) as IMenuFormData[]).filter((f: IMenuFormData) => f.error)
      .length;

    if (isValid) {
      dispatch(menuCreate(validatedForm as IMenuForm));
    } else {
      dispatch(setFormData(validatedForm as IMenuForm));
    }
  };

  const handleClickEnter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmitForm();
  };

  return (
    <>
      <Header title="Add menu item" onClickBack={handleCloseAddingForm} />
      <MyForm onSubmit={handleClickEnter}>
        <Loading isLoading={false} />

        {/* {true ? <AlertStyled severity="error">"error"</AlertStyled> : null} */}

        <MyFormSubtitle>General</MyFormSubtitle>
        <PositionFormGeneral />
        <MyFormSubtitle>Composition</MyFormSubtitle>
        <PositionFormComposition />

        <Button variant="contained" onClick={handleSubmitForm}>
          Add
        </Button>
      </MyForm>
    </>
  );
};
