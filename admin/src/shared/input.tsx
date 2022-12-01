import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import React from "react";

const TextFieldStyled = styled(TextField)`
  margin-bottom: 20px;
`;

const Input: React.FC<{
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  field: { value: string; error: string; name: string; label: string };
  type?: string;
}> = ({ field, onChange, type }) => {
  return (
    <TextFieldStyled
      inputProps={{ form: { autocomplete: "off" } }}
      id={field.name}
      label={field.label}
      variant="outlined"
      name={field.name}
      error={!!field.error}
      helperText={field.error}
      value={field.value}
      type={type || "text"}
      onChange={onChange}
    />
  );
};

export default Input;
