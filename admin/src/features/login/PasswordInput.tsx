import React from "react";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";
import { userSlice } from "../../slices/user";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { grey } from "@mui/material/colors";
import { Stack } from "@mui/system";
import { authorization } from "../../services/user";

export const PasswordInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedUser, inputtedPassword } = useAppSelector((s) => s.user);

  React.useEffect(() => {
    if (inputtedPassword?.length === 4 && selectedUser?.login) {
      dispatch(authorization({ login: selectedUser.login, password: inputtedPassword }));
    }
  }, [inputtedPassword]);

  const renderGridButton = (letter: string, type: "letter" | "back" | "clear") => {
    let color: any = "primary";
    if (type === "back") color = "warning";
    if (type === "clear") color = "error";

    return (
      <Button
        variant="contained"
        color={color}
        style={{ margin: 0, height: 60, fontWeight: 600, fontSize: 20 }}
        onClick={() => {
          if (type === "letter") dispatch(userSlice.actions.setPasswordLetter(letter));
          if (type === "back") dispatch(userSlice.actions.removeLastPasswordLetter());
          if (type === "clear") dispatch(userSlice.actions.removePasswordLetters());
        }}
      >
        {letter}
      </Button>
    );
  };

  return (
    <>
      <Stack direction="row" spacing={2} marginBottom={2}>
        <ArrowBackIcon
          style={{ marginTop: 4 }}
          onClick={() => dispatch(userSlice.actions.removeSelectedUser())}
        />
        <Typography variant="h6" fontWeight={600}>
          {selectedUser?.name}
        </Typography>
      </Stack>
      <Box marginBottom={3} height={70}>
        <ButtonGroup variant="outlined" fullWidth>
          {[0, 1, 2, 3].map((n) => (
            <Button
              variant="contained"
              style={{
                margin: 0,
                fontSize: 20,
                height: 70,
                background: grey[50],
                color: grey[900],
                fontWeight: 600,
              }}
            >
              {inputtedPassword[n]}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <Box>
        <ButtonGroup variant="outlined" fullWidth>
          {renderGridButton("1", "letter")}
          {renderGridButton("2", "letter")}
          {renderGridButton("3", "letter")}
        </ButtonGroup>
        <ButtonGroup variant="outlined" fullWidth>
          {renderGridButton("4", "letter")}
          {renderGridButton("5", "letter")}
          {renderGridButton("6", "letter")}
        </ButtonGroup>
        <ButtonGroup variant="outlined" fullWidth>
          {renderGridButton("7", "letter")}
          {renderGridButton("8", "letter")}
          {renderGridButton("9", "letter")}
        </ButtonGroup>
        <ButtonGroup variant="outlined" fullWidth>
          {renderGridButton("<", "back")}
          {renderGridButton("0", "letter")}
          {renderGridButton("x", "clear")}
        </ButtonGroup>
      </Box>
    </>
  );
};
