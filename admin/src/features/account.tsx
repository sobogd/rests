import { Avatar, Button, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { tablesService } from "../services/tables";
import Header from "../shared/header";
import Loading from "../shared/loading";
import { signOut } from "../slices/user";
import { useAppDispatch, useAppSelector } from "../store";
import { MyFormSubtitle } from "../styles/common";

const backUrl = "http://localhost:4000";

export const Account: React.FC = () => {
  const dispatch = useAppDispatch();
  const { imageSrc, isLoading } = useAppSelector((s) => s.tables);

  React.useEffect(() => {
    dispatch(tablesService.findImage());
  }, []);

  const handleSignOut = () => {
    sessionStorage.setItem("token", "");
    dispatch(signOut());
  };

  const handleChangeTableImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await dispatch(tablesService.uploadImage(e.target.files));
      dispatch(tablesService.findImage());
    }
  };

  return (
    <>
      <Header onClickBack={handleSignOut} title="General" />
      <Loading isLoading={isLoading} />
      <MyFormSubtitle>Scheme of tables</MyFormSubtitle>
      <Stack direction="row" spacing={2}>
        {!!imageSrc && <Avatar alt="Table Image" src={backUrl + imageSrc} sx={{ width: 34, height: 34 }} />}
        <Button variant="contained" component="label">
          {imageSrc ? "Change image" : "Upload image"}
          <input hidden accept="image/*" multiple type="file" onChange={handleChangeTableImage} />
        </Button>
      </Stack>
    </>
  );
};
