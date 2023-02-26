import React from "react";
import { Box, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/store";
import { usersModel } from "entities/users";

export const UsersForCompany: React.FC = () => {
  const dispatch = useAppDispatch();
  const { usersForCompany } = useAppSelector((s) => s.users);

  return (
    <Box marginTop={1} display="flex" flexDirection="column">
      {usersForCompany.map((u) => (
        <Button
          variant="contained"
          style={{ fontWeight: 600, margin: 0, marginBottom: 10, height: 40 }}
          onClick={() => dispatch(usersModel.actions.setSelectedUser(u))}
        >
          {u.name}
        </Button>
      ))}
    </Box>
  );
};
