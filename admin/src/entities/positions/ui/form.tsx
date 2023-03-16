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
import styled from "@emotion/styled";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  AlertStyled,
  backgroundDefault,
  MyForm,
  MyFormSubtitle,
} from "app/styles";
import { useAppDispatch, useAppSelector } from "app/store";
import {
  categoriesService,
  createPosition,
  elementsService,
  removePosition,
  updatePosition,
} from "shared/api";
import {
  IPositionAdditional,
  IPositionCategory,
  IPositionComposition,
  IPositionValues,
  positionsModel,
} from "../model";
import { validatePrice, validateString } from "shared/utils/validate";
import Header from "shared/header";
import YouSure from "shared/you-sure";

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
    isLoading,
  } = useAppSelector((s) => s.positions);
  const { items: elements } = useAppSelector((s) => s.elements);
  const { items: allCategories } = useAppSelector((s) => s.categories);
  const { id, name, price, description } = values;

  React.useEffect(() => {
    dispatch(elementsService.searchElements());
    dispatch(categoriesService.searchCategories());
  }, []);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      positionsModel.actions.setFormValue({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleSubmitForm = () => {
    const validatedValues: {
      [Key in keyof IPositionValues]: { value: string; error: string };
    } = Object.keys(values).reduce((acc, key) => {
      switch (key) {
        // case "price":
        //   return {
        //     ...acc,
        //     [key]: { value: values[key].value, error: validatePrice(values[key].value, -1, 1000) },
        //   };
        case "name":
          return {
            ...acc,
            [key]: {
              value: values[key].value,
              error: validateString(values[key].value, 2, 100),
            },
          };
        default:
          return acc;
      }
    }, values);

    const validatedComposition: {
      [Key in keyof IPositionComposition]: { value: string; error: string };
    }[] = composition.map((c) =>
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
              [key]: {
                value: c[key].value,
                error: validatePrice(c[key].value, 1, 100),
              },
            };
          default:
            return acc;
        }
      }, c)
    );

    const validatedCategories: {
      [Key in keyof IPositionCategory]: { value: string; error: string };
    }[] = categories.map((c) =>
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

    const validatedAdditional: {
      [Key in keyof IPositionAdditional]: { value: string; error: string };
    }[] = additional.map((c) =>
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
      if (request.id) {
        dispatch(updatePosition(request));
      } else {
        dispatch(createPosition(request));
      }
    } else {
      dispatch(
        positionsModel.actions.setFormData({
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
    dispatch(removePosition({ id: id.value }));
  };

  return (
    <>
      <Header
        title={id.value ? "Изменение позиции меню" : "Новая позиция меню"}
        onClickBack={() => dispatch(positionsModel.actions.toggleIsOpenForm())}
      />
      <YouSure
        onClickYes={handleDeleteItem}
        onClickNo={() => dispatch(positionsModel.actions.toggleIsOpenYouSure())}
        isOpen={isOpenYouSure && !isLoading}
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
        <TextField
          inputProps={{ form: { autocomplete: "off" } }}
          label={"Цена"}
          variant="outlined"
          helperText={price.error}
          error={!!price.error}
          required
          name="price"
          value={price.value}
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">TL</InputAdornment>,
          }}
          onChange={handleChangeValue}
        />
        <MyFormSubtitle>Состав</MyFormSubtitle>
        {composition.length > 0 &&
          composition.map((c, index) => (
            <ElementField>
              <RemoveButton
                onClick={() =>
                  dispatch(positionsModel.actions.removeComposition(index))
                }
              >
                <DeleteForeverIcon />
              </RemoveButton>
              <FormControl>
                <InputLabel id={"element" + index + "label"}>
                  Элемент
                </InputLabel>
                <Select
                  labelId={"element" + index}
                  id={"element" + index}
                  value={c.element.value}
                  name="element"
                  error={!!c.element.error}
                  label="Элемент"
                  required
                  onChange={({ target: { name, value } }) =>
                    dispatch(
                      positionsModel.actions.setCompositionValue({
                        name,
                        value,
                        index,
                      })
                    )
                  }
                >
                  {elements.map((i) => (
                    <MenuItem value={i.id}>{i.element}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                inputProps={{ form: { autocomplete: "off" } }}
                label={"Вес/количество"}
                variant="outlined"
                helperText={
                  c.weight.error || `Например: "100" грамм муки или "1" яйцо`
                }
                error={!!c.weight.error}
                required
                name="weight"
                value={c.weight.value}
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">г/шт</InputAdornment>
                  ),
                }}
                onChange={({ target: { name, value } }) =>
                  dispatch(
                    positionsModel.actions.setCompositionValue({
                      name,
                      value,
                      index,
                    })
                  )
                }
              />
            </ElementField>
          ))}
        <Button
          onClick={() => dispatch(positionsModel.actions.addComposition())}
          variant="outlined"
          sx={{
            marginBottom: "20px",
            marginTop: "-5px",
          }}
        >
          Добавить элемент в состав
        </Button>
        <MyFormSubtitle>Категории</MyFormSubtitle>
        {categories.length > 0 &&
          categories.map((c, index) => (
            <ElementField>
              <RemoveButton
                onClick={() =>
                  dispatch(positionsModel.actions.removeCategory(index))
                }
              >
                <DeleteForeverIcon />
              </RemoveButton>
              <FormControl>
                <InputLabel id={"categoryId" + index + "label"}>
                  Категория
                </InputLabel>
                <Select
                  labelId={"categoryId" + index}
                  id={"categoryId" + index}
                  value={c.categoryId.value}
                  name="categoryId"
                  error={!!c.categoryId.error}
                  label="Категория"
                  required
                  onChange={({ target: { name, value } }) =>
                    dispatch(
                      positionsModel.actions.setCategoryValue({
                        name,
                        value,
                        index,
                      })
                    )
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
          onClick={() => dispatch(positionsModel.actions.addCategory())}
          variant="outlined"
          sx={{
            marginBottom: "20px",
            marginTop: "-5px",
          }}
        >
          Добавить категорию для позиции
        </Button>
        <MyFormSubtitle>Дополнительная позиция</MyFormSubtitle>
        <FormControl>
          <FormControlLabel
            style={{ marginBottom: 20 }}
            control={
              <Checkbox
                checked={isAdditional}
                style={{ paddingTop: 0, paddingBottom: 0 }}
                onChange={() =>
                  dispatch(positionsModel.actions.toggleIsAdditional())
                }
              />
            }
            label="Эта позиция является дополнительной"
          />
        </FormControl>
        {additional.length > 0 &&
          !isAdditional &&
          additional.map((a, index) => (
            <ElementField>
              <RemoveButton
                onClick={() =>
                  dispatch(positionsModel.actions.removeAdditional(index))
                }
              >
                <DeleteForeverIcon />
              </RemoveButton>
              <FormControl>
                <InputLabel id={"positionId" + index + "label"}>
                  Дополнительная позиция
                </InputLabel>
                <Select
                  labelId={"positionId" + index}
                  id={"positionId" + index}
                  value={a.positionId.value}
                  name="positionId"
                  error={!!a.positionId.error}
                  label="Дополнительная позиция"
                  required
                  onChange={({ target: { name, value } }) =>
                    dispatch(
                      positionsModel.actions.setAdditionalValue({
                        name,
                        value,
                        index,
                      })
                    )
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
            onClick={() => dispatch(positionsModel.actions.addAdditional())}
            variant="outlined"
            sx={{
              marginBottom: "20px",
              marginTop: "-5px",
            }}
          >
            Добавить дополнительную позицию
          </Button>
        )}
        <Button variant="contained" onClick={handleSubmitForm}>
          Сохранить
        </Button>
        {!!id.value && (
          <Button
            style={{ marginTop: 10 }}
            color="error"
            variant="outlined"
            onClick={() =>
              dispatch(positionsModel.actions.toggleIsOpenYouSure())
            }
          >
            Удалить
          </Button>
        )}
      </MyForm>
    </>
  );
};
