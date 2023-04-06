import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import { EPages, IPageActive, pagesModel } from "entities/pages";
import { usersModel } from "entities/users";
import { useAppDispatch, useAppSelector } from "app/store";
import { CLinks, CPageIcons, CPageNames, CPages } from "app/consts";
import { useLocation, useNavigate } from "react-router-dom";
import { authSlice } from "../../entities/auth";

export const HeaderBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((s) => s.auth);
  const { isOpenMenu, headerComponent } = useAppSelector((s) => s.pages);

  const toggleDrawer = () => {
    dispatch(pagesModel.actions.toggleMenu());
  };

  const handleChangePage = (page: IPageActive) => () => {
    toggleDrawer();
    navigate(CLinks[page.id]);
  };

  const handleSignOut = () => {
    toggleDrawer();
    dispatch(authSlice.actions.signOut());
    navigate(CLinks[EPages.AUTHORIZATION]);
  };

  const activePageId: EPages = React.useMemo(() => {
    return (
      CPages.find((page) => CLinks[page.id] === location.pathname)?.id ||
      EPages.HOME
    );
  }, [location]);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-controls="leftDrawer"
          sx={{ mr: 2 }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={isOpenMenu} onClose={toggleDrawer}>
          <Box
            width={250}
            maxWidth="80vw"
            padding={2}
            paddingLeft={3}
            overflow="hidden auto"
          >
            <List>
              {CPages.filter(
                (page) =>
                  page.permissions.includes(user?.type || "") && page.showInMenu
              ).map((page, index) => (
                <ListItem
                  key={index + page.id}
                  disablePadding
                  onClick={handleChangePage(page)}
                >
                  <ListItemButton>
                    <ListItemIcon>{CPageIcons[page.id]}</ListItemIcon>
                    <ListItemText primary={CPageNames[page.id]} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <List>
              <ListItem disablePadding onClick={handleSignOut}>
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText
                    style={{ fontWeight: 600 }}
                    primary={"Logout"}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        {headerComponent || (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {CPageNames[activePageId]}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};
