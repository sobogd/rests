import React from "react";
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { getUsersForCompany } from "shared/api";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { IUser, usersModel } from "../../entities/users";

export const UsersList: React.FC = () => {
  const { usersForCompany } = useAppSelector((s) => s.users);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getUsersForCompany());
  }, []);

  const handleEditUser = (user: IUser) => () => {
    dispatch(usersModel.actions.setFormData(user));
  };

  return (
    <List>
      {!!usersForCompany?.length &&
        usersForCompany.map((user) => {
          return (
            <ListItem
              divider
              key={user.login}
              secondaryAction={
                <IconButton edge="end" onClick={handleEditUser(user)}>
                  <AutoFixHighIcon />
                </IconButton>
              }
              style={{ paddingLeft: 0 }}
            >
              <ListItemText id={user.login} primary={user.name} />
            </ListItem>
          );
        })}
    </List>
  );
};
