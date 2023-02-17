import React from "react";
import { Box, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";
import { userSlice } from "../../slices/user";

export const UsersForCompany: React.FC = () => {
  const dispatch = useAppDispatch();
  const { usersForCompany } = useAppSelector((s) => s.user);

  return (
    <Box marginTop={1} display="flex" flexDirection="column">
      {usersForCompany.map((u) => (
        <Button
          variant="contained"
          style={{ fontWeight: 600, margin: 0, marginBottom: 10, height: 40 }}
          onClick={() => dispatch(userSlice.actions.setSelectedUser(u))}
        >
          {u.name}
        </Button>
      ))}
    </Box>
  );
};