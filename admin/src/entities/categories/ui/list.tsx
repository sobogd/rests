import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Header from "shared/header";
import { categoriesModel } from "../model";
import { categoriesService } from "shared/api";
import { useAppDispatch, useAppSelector } from "app/store";

export const CategoriesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.categories);

  React.useEffect(() => {
    dispatch(categoriesService.searchCategories());
  }, []);

  return (
    <>
      <Header
        title="Список категорий"
        onClickAdd={() => dispatch(categoriesModel.actions.toggleIsOpenForm())}
      />
      <List disablePadding>
        {!!items.length &&
          items.map((i) => (
            <ListItem
              divider
              disablePadding
              secondaryAction={
                <IconButton
                  edge="end"
                  style={{ right: -10 }}
                  onClick={() =>
                    dispatch(categoriesModel.actions.startEditItem(i))
                  }
                >
                  <ModeEditOutlineIcon />
                </IconButton>
              }
            >
              <ListItemText primary={i.name} secondary={i.description} />
            </ListItem>
          ))}
      </List>
    </>
  );
};
