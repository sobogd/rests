import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React from "react";
import {
  ButtonStyled,
  ErrorBox,
  NewModal,
  NewModalBody,
  NewModalCloseButton,
  NewModalContainer,
  NewModalHeader,
  TitleH1,
} from "app/styles";
import { useAppDispatch, useAppSelector } from "app/store";
import {
  archivePosition,
  categoriesService,
  createPosition,
  elementsService,
  updatePosition,
} from "api";
import { IPosition, positionsModel } from "../model";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { ICategory } from "../../categories/model";
import { red } from "@mui/material/colors";

type Form = {
  name: string;
  description?: string;
  price: number;
  sort: number;
  categories: ICategory[];
  additional: IPosition[];
  isAdditional: boolean;
};

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    price: yup
      .number()
      .required("Price is required")
      .typeError("Price is required (only numbers)"),
    sort: yup.number().required().typeError("Sort is required (only numbers)"),
  })
  .required();

export const PositionsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    openedPosition,
    items: allPositions,
    isOpenForm,
    error,
  } = useAppSelector((s) => s.positions);
  const { items: allCategories } = useAppSelector((s) => s.categories);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Form>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    defaultValues: {
      sort: 500,
      isAdditional: false,
      name: undefined,
      description: undefined,
      price: undefined,
      categories: [],
      additional: [],
    },
  });

  React.useEffect(() => {
    if (!isOpenForm) {
      reset();
    }
  }, [isOpenForm]);

  React.useEffect(() => {
    if (!!openedPosition?.id) {
      const additional = openedPosition.additional
        ?.map((c) => allPositions.find((f) => f.id === c.positionId))
        .filter((c) => !!c?.id) as IPosition[];

      const categories = openedPosition.categories
        ?.map((c) => allCategories.find((f) => f.id === c.categoryId))
        .filter((c) => !!c?.id) as ICategory[];

      setValue("name", openedPosition.name);
      setValue("price", openedPosition.price);
      setValue("description", openedPosition.description);
      setValue("sort", openedPosition?.sort || 500);
      setValue("isAdditional", openedPosition.isAdditional || false);
      setValue("additional", additional || []);
      setValue("categories", categories || []);
    }
  }, [openedPosition]);

  const onSubmit: SubmitHandler<Form> = ({
    name,
    description,
    price,
    categories,
    additional,
    sort,
    isAdditional,
  }) => {
    if (!!openedPosition?.id) {
      dispatch(
        updatePosition({
          id: openedPosition?.id,
          name,
          description: description || undefined,
          price,
          categories: categories?.map((c) => ({ categoryId: c.id })) || [],
          additional: additional?.map((c) => ({ positionId: c.id })) || [],
          sort: sort || 500,
          isAdditional: isAdditional || false,
        })
      );
    } else {
      dispatch(
        createPosition({
          name: name,
          description: description || undefined,
          price: price,
          categories: categories?.map((c) => ({ categoryId: c.id })) || [],
          additional: additional?.map((c) => ({ positionId: c.id })) || [],
          sort: sort || 500,
          isAdditional: isAdditional || false,
        })
      );
    }
  };

  const handleCloseModal = () => {
    dispatch(positionsModel.actions.toggleIsOpenForm());
    reset();
  };

  const handleRemovePosition = () => {
    if (!!openedPosition?.id) {
      dispatch(archivePosition(openedPosition.id));
      reset();
    }
  };

  const isAdditional = watch("isAdditional");

  return (
    <NewModal open={isOpenForm} onClose={handleCloseModal}>
      <NewModalContainer maxWidth={500}>
        <NewModalHeader>
          <TitleH1 size={22}>
            {openedPosition?.id ? "Edit" : "New"} position
          </TitleH1>
        </NewModalHeader>
        <NewModalCloseButton onClick={handleCloseModal}>
          <CloseIcon />
        </NewModalCloseButton>
        <NewModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Name"
                  error={!!errors["name"]?.message}
                  helperText={
                    errors["name"]
                      ? errors["name"]?.message?.toString()
                      : "Fill position name"
                  }
                  variant="outlined"
                  style={{ marginBottom: 15 }}
                  {...field}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Description"
                  error={!!errors["description"]?.message}
                  helperText={
                    errors["description"]
                      ? errors["description"]?.message?.toString()
                      : "Fill position description"
                  }
                  variant="outlined"
                  minRows={3}
                  multiline
                  style={{ marginBottom: 15 }}
                  {...field}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Price"
                  error={!!errors["price"]?.message}
                  helperText={
                    errors["price"]
                      ? errors["price"]?.message?.toString()
                      : "Fill position price"
                  }
                  variant="outlined"
                  style={{ marginBottom: 15 }}
                  {...field}
                />
              )}
            />
            <Controller
              name="sort"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Sorting number"
                  error={!!errors["sort"]?.message}
                  helperText={
                    errors["sort"]
                      ? errors["sort"]?.message?.toString()
                      : "Fill position sorting value"
                  }
                  variant="outlined"
                  style={{ marginBottom: 15 }}
                  {...field}
                />
              )}
            />
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  {...field}
                  options={allCategories}
                  onChange={(e, value) => {
                    field.onChange(value);
                  }}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option: ICategory, value: ICategory) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      label="Categories"
                      placeholder="Select categories"
                      helperText={
                        errors["categories"]
                          ? errors["categories"]?.message?.toString()
                          : "Bind categories for position"
                      }
                      style={{ marginBottom: 15, marginTop: 0 }}
                      error={!!errors["categories"]?.message}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="isAdditional"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  style={{ margin: "-15px 0 10px" }}
                  control={<Checkbox {...field} />}
                  label="Is additional position"
                />
              )}
            />
            {!isAdditional && (
              <Controller
                name="additional"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    {...field}
                    options={allPositions.filter((p) => p.isAdditional)}
                    onChange={(e, value) => {
                      field.onChange(value);
                    }}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(
                      option: IPosition,
                      value: IPosition
                    ) => option.id === value.id}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        label="Additional positions"
                        placeholder="Select additional positions"
                        helperText={
                          errors["additional"]
                            ? errors["additional"]?.message?.toString()
                            : "Bind additional positions for this position"
                        }
                        style={{ marginBottom: 15, marginTop: 0 }}
                        error={!!errors["additional"]?.message}
                      />
                    )}
                  />
                )}
              />
            )}
            {!!error && (
              <ErrorBox style={{ marginBottom: 25 }}>{error}</ErrorBox>
            )}
            <ButtonStyled type="submit">Save position</ButtonStyled>
          </form>
          {!!openedPosition?.id && (
            <ButtonStyled
              top={15}
              onClick={handleRemovePosition}
              background={red[800]}
            >
              Remove position
            </ButtonStyled>
          )}
        </NewModalBody>
      </NewModalContainer>
    </NewModal>
  );
};
