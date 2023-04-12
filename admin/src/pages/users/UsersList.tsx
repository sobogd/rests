import React from "react";
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { IUser, usersModel } from "../../entities/users";
import { ButtonStyled, Item, ItemIconsBlock, TextSpan } from "../../app/styles";
import { grey } from "@mui/material/colors";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

export const UsersList: React.FC = () => {
  const { usersForCompany } = useAppSelector((s) => s.users);
  const dispatch = useAppDispatch();

  const handleEditUser = (user: IUser) => () => {
    dispatch(usersModel.actions.setFormData(user));
  };

  const handleAddUser = () => {
    dispatch(usersModel.actions.toggleIsOpenModal());
  };

  return (
    <>
      <ButtonStyled onClick={handleAddUser} bottom={15}>
        Add new position
      </ButtonStyled>
      {!!usersForCompany?.length &&
        usersForCompany.map((user) => (
          <Item
            isHaveIcons
            paddingX={20}
            paddingY={10}
            bottom={10}
            key={user.id}
          >
            <TextSpan>{user.name}</TextSpan>
            <ItemIconsBlock>
              <ModeEditOutlineIcon onClick={handleEditUser(user)} />
            </ItemIconsBlock>
          </Item>
        ))}
    </>
  );
};
