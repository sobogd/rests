import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/store";
import React from "react";
import { tablesService } from "api";
import { API_URL } from "config";
import { CompanyPassword } from "../../features/companyPassword";

export const Account: React.FC = () => {
  const dispatch = useAppDispatch();
  const { imageSrc } = useAppSelector((s) => s.tables);

  React.useEffect(() => {
    dispatch(tablesService.findImage());
  }, []);

  const handleChangeTableImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      await dispatch(tablesService.uploadImage(e.target.files));
      dispatch(tablesService.findImage());
    }
  };

  return (
    <>
      <Typography variant="h6" marginBottom={3}>
        Schema of company area
      </Typography>
      <Stack direction="row" spacing={2}>
        {!!imageSrc && (
          <Avatar
            alt="Схема ресторана"
            src={API_URL + imageSrc}
            sx={{ width: 34, height: 34 }}
          />
        )}
        <Button variant="contained" component="label">
          {imageSrc ? "Изменить схему" : "Загрузить схему"}
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={handleChangeTableImage}
          />
        </Button>
      </Stack>
      <Box marginTop={4}>
        <CompanyPassword />
      </Box>
    </>
  );
};
