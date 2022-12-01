import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../../shared/header";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { categoriesService } from "../../services/categories";
import { categoriesSlice } from "../../slices/categories";

export const CategoriesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.categories);

  React.useEffect(() => {
    dispatch(categoriesService.search());
  }, []);

  return (
    <>
      <Header
        title="Category items"
        onClickAdd={() => dispatch(categoriesSlice.actions.toggleIsOpenForm())}
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
                  onClick={() => dispatch(categoriesSlice.actions.startEditItem(i))}
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
