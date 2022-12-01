import styled from "@emotion/styled";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React from "react";
import { elementsService } from "../../../services/elements";
import { menuSlice } from "../../../slices/positions";
import { useAppDispatch, useAppSelector } from "../../../store";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { backgroundDefault } from "../../../styles/theme";

const ElementField = styled.div`
  display: flex;
  border: 1px solid #00897b;
  border-radius: 5px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 20px 0;
  position: relative;
  margin-bottom: 20px;

  .MuiFormControl-root {
    width: 100%;
  }
`;

const RemoveButton = styled.button`
  background: ${backgroundDefault};
  position: absolute;
  top: -15px;
  right: 20px;

  .svg {
    color: ${backgroundDefault};
  }
`;

export const PositionFormComposition: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.elements);
  const { composition } = useAppSelector((s) => s.menu.form);
  console.log(composition);

  React.useEffect(() => {
    dispatch(elementsService.search());
  }, []);

  const handleAddComposition = () => {
    dispatch(menuSlice.actions.addComposition());
  };

  const handleRemoveComposition = (index: number) => () => {
    dispatch(menuSlice.actions.removeComposition(index));
  };

  return (
    <>
      {composition.length > 0 &&
        composition.map((c, index) => (
          <ElementField>
            <RemoveButton onClick={handleRemoveComposition(index)}>
              <DeleteForeverIcon />
            </RemoveButton>
            <FormControl>
              <InputLabel id={"element" + index + "label"}>Element</InputLabel>
              <Select
                labelId={"element" + index}
                id={"element" + index}
                value={c.element.value}
                name="element"
                error={!!c.element.error}
                label="Element"
                required
                onChange={({ target: { name, value } }) =>
                  dispatch(menuSlice.actions.setCompositionValue({ name, value, index }))
                }
              >
                {items.map((i) => (
                  <MenuItem value={i.id}>{i.element}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              inputProps={{ form: { autocomplete: "off" } }}
              label={"Weigth/Quantity"}
              variant="outlined"
              helperText={c.weight.error}
              error={!!c.weight.error}
              required
              name="weight"
              value={c.weight.value}
              type="number"
              InputProps={{ endAdornment: <InputAdornment position="end">g/pcs</InputAdornment> }}
              onChange={({ target: { name, value } }) =>
                dispatch(menuSlice.actions.setCompositionValue({ name, value, index }))
              }
            />
          </ElementField>
        ))}
      <Button
        onClick={handleAddComposition}
        variant="outlined"
        sx={{
          marginBottom: "20px",
          marginTop: "-5px",
        }}
      >
        Add new element to composition
      </Button>
    </>
  );
};
