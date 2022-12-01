import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { menuSlice } from "../../../slices/positions";
import { useAppDispatch, useAppSelector } from "../../../store";

export const PositionFormGeneral: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { name, description, price } = useAppSelector((s) => s.menu.form);

  const handleChangeField = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(menuSlice.actions.setFormValue({ name, value }));
  };

  return (
    <>
      <TextField
        inputProps={{ form: { autocomplete: "off" } }}
        label={"Title"}
        variant="outlined"
        helperText={name.error}
        error={!!name.error}
        required
        name="name"
        value={name.value}
        onChange={handleChangeField}
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
        onChange={handleChangeField}
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
        onChange={handleChangeField}
      />
    </>
  );
};
