import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { categoriesModel } from "../model";
import { categoriesService } from "api";
import { useAppDispatch, useAppSelector } from "app/store";

export const CategoriesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.categories);

  React.useEffect(() => {
    dispatch(categoriesService.searchCategories());
  }, []);

  return (
    <>
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
