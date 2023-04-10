import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useAppDispatch, useAppSelector } from "app/store";
import { IPosition, positionsModel } from "../model";
import {
  backgroundDefault,
  ButtonStyled,
  Item,
  ItemIconsBlock,
  primaryColor,
  textDefaultWhiteColor,
  TextSpan,
} from "../../../app/styles";
import { grey } from "@mui/material/colors";
import { Box, Chip } from "@mui/material";

export const PositionsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.positions);
  const { items: categoryItems } = useAppSelector((s) => s.categories);
  const [filters, setFilters] = React.useState<
    { label: string; value: any; type: string }[]
  >([]);

  const allFilters = [
    { label: "Is additional", value: true, type: "isAdditional" },
    ...categoryItems.map((i) => ({
      label: i.name,
      value: i.id,
      type: "category",
    })),
  ];

  const handleChangeFilter = (filter: any) => () => {
    if (filters.map((f) => f.value).includes(filter.value)) {
      setFilters(filters.filter((f) => f.value !== filter.value));
    } else {
      setFilters([...filters, filter]);
    }
  };

  const handleAddNewPosition = () => {
    dispatch(positionsModel.actions.toggleIsOpenForm());
  };

  const handleClickEdit = (position: IPosition) => () => {
    dispatch(positionsModel.actions.startEditItem(position));
  };

  const filteredItems: IPosition[] = React.useMemo(() => {
    if (filters?.length) {
      console.log({ items });
      return items
        .filter((item) => {
          const itemCategoriesIds = item.categories.map((c) => c.categoryId);
          const filtersCategoriesIds = filters
            .filter((f) => f.type === "category")
            .map((f) => f.value);

          return !!filtersCategoriesIds.length
            ? !!itemCategoriesIds.filter((id) =>
                filtersCategoriesIds.includes(id)
              ).length
            : true;
        })
        .filter((item) =>
          !!filters.find((f) => f.type === "isAdditional")
            ? item.isAdditional
            : true
        );
    }
    return items;
  }, [items, filters]);

  return (
    <>
      <ButtonStyled onClick={handleAddNewPosition} bottom={15}>
        Add new position
      </ButtonStyled>
      {(items?.length > 5 || !!filters?.length) && (
        <Box marginBottom={1}>
          {allFilters.map((filter) => (
            <Chip
              style={
                filters.map((f) => f.value).includes(filter.value)
                  ? {
                      background: primaryColor,
                      borderColor: primaryColor,
                      color: textDefaultWhiteColor,
                      marginRight: 5,
                      marginBottom: 5,
                    }
                  : {
                      background: backgroundDefault,
                      borderColor: grey[700],
                      color: grey[700],
                      marginRight: 5,
                      marginBottom: 5,
                    }
              }
              label={filter.label}
              onClick={handleChangeFilter(filter)}
              variant="outlined"
            />
          ))}
        </Box>
      )}
      {!!filteredItems.length &&
        filteredItems.map((position) => (
          <Item
            isHaveIcons
            paddingX={20}
            paddingY={10}
            bottom={10}
            key={position.id}
          >
            <TextSpan>{position.name}</TextSpan>
            <TextSpan color={grey[500]}>{position.price}</TextSpan>
            <ItemIconsBlock>
              <ModeEditOutlineIcon onClick={handleClickEdit(position)} />
            </ItemIconsBlock>
          </Item>
        ))}
    </>
  );
};
