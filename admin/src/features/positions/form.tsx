import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../../shared/header";
import { AlertStyled, MyForm, MyFormSubtitle } from "../../styles/common";
import { validatePrice, validateString } from "../../utils/validate";
import YouSure from "../../shared/you-sure";
import { positionsSlice } from "../../slices/positions";
import {
  IPositionAdditional,
  IPositionCategory,
  IPositionComposition,
  IPositionValues,
} from "../../interfaces/positions";
import { positionsService } from "../../services/positions";
import styled from "@emotion/styled";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { backgroundDefault } from "../../styles/theme";
import { elementsService } from "../../services/elements";
import { categoriesService } from "../../services/categories";

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

export const PositionsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    form: { values, composition, categories, additional, isAdditional },
    error,
    isOpenYouSure,
    items: allPositions,
  } = useAppSelector((s) => s.positions);
  const { items: elements } = useAppSelector((s) => s.elements);
  const { items: allCategories } = useAppSelector((s) => s.categories);
  const { id, name, price, description } = values;

  React.useEffect(() => {
    dispatch(elementsService.search());
    dispatch(categoriesService.search());
  }, []);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(positionsSlice.actions.setFormValue({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmitForm = () => {
    const validatedValues: { [Key in keyof IPositionValues]: { value: string; error: string } } = Object.keys(
      values
    ).reduce((acc, key) => {
      switch (key) {
        case "price":
          return {
            ...acc,
            [key]: { value: values[key].value, error: validatePrice(values[key].value, 1, 1000) },
          };
        case "name":
          return {
            ...acc,
            [key]: { value: values[key].value, error: validateString(values[key].value, 2, 100) },
          };
        default:
          return acc;
      }
    }, values);

    const validatedComposition: { [Key in keyof IPositionComposition]: { value: string; error: string } }[] =
      composition.map((c) =>
        Object.keys(c).reduce((acc, key) => {
          switch (key) {
            case "element":
              return {
                ...acc,
                [key]: {
                  value: c[key].value,
                  error: validatePrice(
                    c[key].value,
                    Math.min(...elements.map((e) => Number(e.id))),
                    Math.max(...elements.map((e) => Number(e.id)))
                  ),
                },
              };
            case "weight":
              return {
                ...acc,
                [key]: { value: c[key].value, error: validatePrice(c[key].value, 1, 100) },
              };
            default:
              return acc;
          }
        }, c)
      );

    const validatedCategories: { [Key in keyof IPositionCategory]: { value: string; error: string } }[] =
      categories.map((c) =>
        Object.keys(c).reduce((acc, key) => {
          switch (key) {
            case "categoryId":
              return {
                ...acc,
                [key]: {
                  value: c[key].value,
                  error: validatePrice(
                    c[key].value,
                    Math.min(...allCategories.map((e) => Number(e.id))),
                    Math.max(...allCategories.map((e) => Number(e.id)))
                  ),
                },
              };
            default:
              return acc;
          }
        }, c)
      );

    const validatedAdditional: { [Key in keyof IPositionAdditional]: { value: string; error: string } }[] =
      additional.map((c) =>
        Object.keys(c).reduce((acc, key) => {
          switch (key) {
            case "positionId":
              return {
                ...acc,
                [key]: {
                  value: c[key].value,
                  error: validatePrice(
                    c[key].value,
                    Math.min(...allPositions.map((e) => Number(e.id))),
                    Math.max(...allPositions.map((e) => Number(e.id)))
                  ),
                },
              };
            default:
              return acc;
          }
        }, c)
      );

    const isValid =
      !Object.values(validatedValues).filter((f) => f.error).length &&
      !validatedCategories.filter((f) => f.categoryId.error).length &&
      !validatedAdditional.filter((f) => f.positionId.error).length &&
      !validatedComposition.filter((f) => f.element.error).length &&
      !validatedComposition.filter((f) => f.weight.error).length;

    const request = {
      id: validatedValues.id.value,
      name: validatedValues.name.value,
      price: validatedValues.price.value,
      description: validatedValues.description.value,
      composition: validatedComposition.map((c) => ({
        element: c.element.value,
        weight: c.weight.value,
      })),
      categories: validatedCategories.map((c) => ({
        categoryId: c.categoryId.value,
      })),
      additional: !isAdditional
        ? validatedAdditional.map((c) => ({
            positionId: c.positionId.value,
          }))
        : [],
      isAdditional: isAdditional,
    };

    if (isValid) {
      dispatch(positionsService[request.id ? "update" : "create"](request));
    } else {
      dispatch(
        positionsSlice.actions.setFormData({
          values: validatedValues,
          composition: validatedComposition,
          categories: validatedCategories,
          additional: validatedAdditional,
          isAdditional,
        })
      );
    }
  };

  const handleClickEnter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmitForm();
  };

  const handleDeleteItem = () => {
    dispatch(positionsService.remove({ id: id.value }));
  };

  return (
    <>
      <Header
        title={id.value ? "Edit position" : "New position"}
        onClickBack={() => dispatch(positionsSlice.actions.toggleIsOpenForm())}
      />
      <YouSure
        onClickYes={handleDeleteItem}
        onClickNo={() => dispatch(positionsSlice.actions.toggleIsOpenYouSure())}
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
          label={"Title"}
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
        <MyFormSubtitle>Composition</MyFormSubtitle>
        {composition.length > 0 &&
          composition.map((c, index) => (
            <ElementField>
              <RemoveButton onClick={() => dispatch(positionsSlice.actions.removeComposition(index))}>
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
                    dispatch(positionsSlice.actions.setCompositionValue({ name, value, index }))
                  }
                >
                  {elements.map((i) => (
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
                  dispatch(positionsSlice.actions.setCompositionValue({ name, value, index }))
                }
              />
            </ElementField>
          ))}
        <Button
          onClick={() => dispatch(positionsSlice.actions.addComposition())}
          variant="outlined"
          sx={{
            marginBottom: "20px",
            marginTop: "-5px",
          }}
        >
          Add element
        </Button>
        <MyFormSubtitle>Categories</MyFormSubtitle>
        {categories.length > 0 &&
          categories.map((c, index) => (
            <ElementField>
              <RemoveButton onClick={() => dispatch(positionsSlice.actions.removeCategory(index))}>
                <DeleteForeverIcon />
              </RemoveButton>
              <FormControl>
                <InputLabel id={"categoryId" + index + "label"}>Category</InputLabel>
                <Select
                  labelId={"categoryId" + index}
                  id={"categoryId" + index}
                  value={c.categoryId.value}
                  name="categoryId"
                  error={!!c.categoryId.error}
                  label="Category"
                  required
                  onChange={({ target: { name, value } }) =>
                    dispatch(positionsSlice.actions.setCategoryValue({ name, value, index }))
                  }
                >
                  {allCategories.map((i) => (
                    <MenuItem value={i.id}>{i.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ElementField>
          ))}
        <Button
          onClick={() => dispatch(positionsSlice.actions.addCategory())}
          variant="outlined"
          sx={{
            marginBottom: "20px",
            marginTop: "-5px",
          }}
        >
          Add category
        </Button>
        <MyFormSubtitle>Additional positions</MyFormSubtitle>
        <FormControl>
          <FormControlLabel
            style={{ marginBottom: 20 }}
            control={
              <Checkbox
                checked={isAdditional}
                style={{ paddingTop: 0, paddingBottom: 0 }}
                onChange={() => dispatch(positionsSlice.actions.toggleIsAdditional())}
              />
            }
            label="This is additional position"
          />
        </FormControl>
        {additional.length > 0 &&
          !isAdditional &&
          additional.map((a, index) => (
            <ElementField>
              <RemoveButton onClick={() => dispatch(positionsSlice.actions.removeAdditional(index))}>
                <DeleteForeverIcon />
              </RemoveButton>
              <FormControl>
                <InputLabel id={"positionId" + index + "label"}>Position</InputLabel>
                <Select
                  labelId={"positionId" + index}
                  id={"positionId" + index}
                  value={a.positionId.value}
                  name="positionId"
                  error={!!a.positionId.error}
                  label="Position"
                  required
                  onChange={({ target: { name, value } }) =>
                    dispatch(positionsSlice.actions.setAdditionalValue({ name, value, index }))
                  }
                >
                  {allPositions
                    .filter((i) => i.isAdditional)
                    .map((i) => (
                      <MenuItem value={i.id}>{i.name}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </ElementField>
          ))}
        {!isAdditional && (
          <Button
            onClick={() => dispatch(positionsSlice.actions.addAdditional())}
            variant="outlined"
            sx={{
              marginBottom: "20px",
              marginTop: "-5px",
            }}
          >
            Add position
          </Button>
        )}
        <Button variant="contained" onClick={handleSubmitForm}>
          {id.value ? "Save" : "Add"}
        </Button>
        {!!id.value && (
          <Button
            style={{ marginTop: 10 }}
            color="error"
            variant="outlined"
            onClick={() => dispatch(positionsSlice.actions.toggleIsOpenYouSure())}
          >
            Delete
          </Button>
        )}
      </MyForm>
    </>
  );
};
