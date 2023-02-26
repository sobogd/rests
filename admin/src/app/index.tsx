import styled from "@emotion/styled";
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
import { grey } from "@mui/material/colors";
import React from "react";
import { useAppDispatch, useAppSelector } from "./store";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { teal } from "@mui/material/colors";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AppsIcon from "@mui/icons-material/Apps";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { EPages, IPageActive } from "entities/pages";
import { Account } from "features/account";
import { Positions } from "entities/positions";
import { Tables } from "entities/tables";
import { Elements } from "entities/element";
import { Orders } from "entities/orders";
import { Kitchen } from "features/kitchen";
import { Categories } from "entities/categories";
import { Day } from "features/day";
import { pagesModel } from "entities/pages";
import { whoAmI } from "shared/api";
import { usersModel } from "entities/users";
import { Login } from "features/login/Login";

export const Container = styled.section`
  background: ${grey[900]};
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ScrollableZone = styled.section`
  height: 100%;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  width: 100%;
`;

export const CPages: IPageActive[] = [
  {
    permissions: ["manager", "personal", "admin", "kitchen"],
    name: "Account",
    id: EPages.ACCOUNT,
    icon: <AccountCircleIcon sx={{ color: teal[50] }} />,
    component: <Account />,
  },
  {
    permissions: ["admin"],
    name: "Positions",
    id: EPages.MENU,
    icon: <MenuBookIcon sx={{ color: teal[50] }} />,
    component: <Positions />,
  },
  {
    permissions: ["admin"],
    name: "Tables",
    id: EPages.TABLES,
    icon: <TableRestaurantIcon sx={{ color: teal[50] }} />,
    component: <Tables />,
  },
  {
    permissions: ["admin"],
    name: "Elements",
    id: EPages.ELEMENTS,
    icon: <AutoFixHighIcon sx={{ color: teal[50] }} />,
    component: <Elements />,
  },
  {
    permissions: ["manager", "personal", "admin"],
    name: "Orders",
    id: EPages.ORDERS,
    icon: <ReceiptLongIcon sx={{ color: teal[50] }} />,
    component: <Orders />,
  },
  {
    permissions: ["kitchen", "admin", "personal"],
    name: "Kitchen",
    id: EPages.KITCHEN,
    icon: <SoupKitchenIcon sx={{ color: teal[50] }} />,
    component: <Kitchen />,
  },
  {
    permissions: ["admin"],
    name: "Categories",
    id: EPages.CATEGORIES,
    icon: <AppsIcon sx={{ color: teal[50] }} />,
    component: <Categories />,
  },
  {
    permissions: ["admin"],
    name: "Reports",
    id: EPages.REPORTS,
    icon: <AssessmentIcon sx={{ color: teal[50] }} />,
    component: <Day />,
  },
];

const App: React.FC = () => {
  const isAuthorizatedUser = !!sessionStorage.getItem("token");
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((s) => s.users);
  const { activePage, isOpenMenu } = useAppSelector((s) => s.pages);

  React.useEffect(() => {
    if (isAuthorizatedUser && !data?.id) {
      dispatch(whoAmI());
    }
  }, [dispatch, data, isAuthorizatedUser]);

  const toggleDrawer = () => {
    dispatch(pagesModel.actions.toggleMenu());
  };

  const handleChangePage = (page: IPageActive) => () => {
    dispatch(pagesModel.actions.toggleMenu());
    dispatch(pagesModel.actions.setActivePage(page));
  };

  const handleSignOut = () => {
    dispatch(pagesModel.actions.toggleMenu());
    sessionStorage.setItem("token", "");
    dispatch(usersModel.actions.signOut());
  };

  const renderedPage = React.useMemo(() => {
    if (isAuthorizatedUser) {
      return activePage?.component;
    }

    return <Login />;
  }, [isAuthorizatedUser, activePage]);

  const appBar = React.useMemo(() => {
    if (isAuthorizatedUser) {
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
              <Box width={250} maxWidth="80vw" padding={2} paddingLeft={3} overflow="hidden auto">
                <List>
                  {CPages.filter((page) => page.permissions.includes(data?.type || "")).map((page, index) => (
                    <ListItem key={index + page.id} disablePadding onClick={handleChangePage(page)}>
                      <ListItemButton>
                        <ListItemIcon>{page.icon}</ListItemIcon>
                        <ListItemText primary={page.name} />
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
                      <ListItemText style={{ fontWeight: 600 }} primary={"Logout"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
            {activePage?.headerComponent || (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {activePage?.name}
              </Typography>
            )}
          </Toolbar>
        </AppBar>
      );
    }

    return null;
  }, [isAuthorizatedUser, isOpenMenu, activePage]);

  return (
    <Container>
      {appBar}
      <ScrollableZone>{renderedPage}</ScrollableZone>
    </Container>
  );
};

export default App;
