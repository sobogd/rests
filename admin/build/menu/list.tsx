import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAppDispatch } from "../../store";
import Header from "../../shared/header";

export const MenuList: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(positionsSearch());
  }, []);

  const handleClickAddButton = () => {
    dispatch(toggleAddingPositionForm());
  };

  return (
    <>
      <Header title="Menu items" />
      <List>
        <ListItemButton onClick={handleClickAddButton}>
          <ListItemIcon>
            <AddCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Add new position" />
        </ListItemButton>
        <ListItemButton onClick={() => {}}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {true ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={true} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </>
  );
};
