import { Avatar, Button, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/store";
import { MyFormSubtitle } from "app/styles";
import { usersModel } from "entities/users";
import React from "react";
import { tablesService } from "shared/api";
import { backUrl } from "..";
import Header from "../shared/header";
import Loading from "../shared/loading";

export const Account: React.FC = () => {
  const dispatch = useAppDispatch();
  const { imageSrc, isLoading } = useAppSelector((s) => s.tables);

  React.useEffect(() => {
    dispatch(tablesService.findImage());
  }, []);

  const handleSignOut = () => {
    sessionStorage.setItem("token", "");
    dispatch(usersModel.actions.signOut());
  };

  const handleChangeTableImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await dispatch(tablesService.uploadImage(e.target.files));
      dispatch(tablesService.findImage());
    }
  };

  return (
    <>
      <Header onClickBack={handleSignOut} title="Основное" />
      <Loading isLoading={isLoading} />
      <MyFormSubtitle>Схема ресторана</MyFormSubtitle>
      <Stack direction="row" spacing={2}>
        {!!imageSrc && (
          <Avatar alt="Схема ресторана" src={backUrl + imageSrc} sx={{ width: 34, height: 34 }} />
        )}
        <Button variant="contained" component="label">
          {imageSrc ? "Изменить схему" : "Загрузить схему"}
          <input hidden accept="image/*" multiple type="file" onChange={handleChangeTableImage} />
        </Button>
      </Stack>
    </>
  );
};
