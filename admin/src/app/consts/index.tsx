import React from "react";
import { EPages, IPageActive } from "../../entities/pages";
import {
  Account,
  Categories,
  Day,
  Elements,
  Home,
  Kitchen,
  Login,
  Orders,
  Positions,
  Tables,
} from "../../pages";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { teal } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AppsIcon from "@mui/icons-material/Apps";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export const CLinks = {
  [EPages.HOME]: "/",
  [EPages.AUTHORIZATION]: "/login",
  [EPages.ACCOUNT]: "/account",
  [EPages.ORDERS]: "/orders",
  [EPages.TABLES]: "/tables",
  [EPages.ELEMENTS]: "/elements",
  [EPages.CATEGORIES]: "/categories",
  [EPages.KITCHEN]: "/kitchen",
  [EPages.REPORTS]: "/reports",
  [EPages.POSITIONS]: "/positions",
};

export const CPageNames = {
  [EPages.HOME]: "Home",
  [EPages.AUTHORIZATION]: "Authorization",
  [EPages.ACCOUNT]: "Account",
  [EPages.ORDERS]: "Orders",
  [EPages.TABLES]: "Tables",
  [EPages.ELEMENTS]: "Elements",
  [EPages.CATEGORIES]: "Categories",
  [EPages.KITCHEN]: "Kitchen",
  [EPages.REPORTS]: "Reports",
  [EPages.POSITIONS]: "Positions",
};

export const CPageComponents = {
  [EPages.HOME]: <Home />,
  [EPages.AUTHORIZATION]: <Login />,
  [EPages.ACCOUNT]: <Account />,
  [EPages.ORDERS]: <Orders />,
  [EPages.TABLES]: <Tables />,
  [EPages.ELEMENTS]: <Elements />,
  [EPages.CATEGORIES]: <Categories />,
  [EPages.KITCHEN]: <Kitchen />,
  [EPages.REPORTS]: <Day />,
  [EPages.POSITIONS]: <Positions />,
};

export const CPageIcons = {
  [EPages.HOME]: <AssessmentIcon sx={{ color: teal[50] }} />,
  [EPages.AUTHORIZATION]: <AccountCircleIcon sx={{ color: teal[50] }} />,
  [EPages.ACCOUNT]: <AccountCircleIcon sx={{ color: teal[50] }} />,
  [EPages.ORDERS]: <ReceiptLongIcon sx={{ color: teal[50] }} />,
  [EPages.TABLES]: <TableRestaurantIcon sx={{ color: teal[50] }} />,
  [EPages.ELEMENTS]: <AutoFixHighIcon sx={{ color: teal[50] }} />,
  [EPages.CATEGORIES]: <AppsIcon sx={{ color: teal[50] }} />,
  [EPages.KITCHEN]: <SoupKitchenIcon sx={{ color: teal[50] }} />,
  [EPages.REPORTS]: <AssessmentIcon sx={{ color: teal[50] }} />,
  [EPages.POSITIONS]: <MenuBookIcon sx={{ color: teal[50] }} />,
};

export const CPages: IPageActive[] = [
  {
    id: EPages.HOME,
    permissions: ["manager", "personal", "admin", "kitchen"],
    showInMenu: true,
    hideHeader: false,
  },
  {
    id: EPages.ACCOUNT,
    permissions: ["manager", "personal", "admin", "kitchen"],
    showInMenu: true,
    hideHeader: false,
  },
  {
    id: EPages.AUTHORIZATION,
    permissions: ["manager", "personal", "admin", "kitchen"],
    showInMenu: false,
    hideHeader: true,
  },
  {
    id: EPages.POSITIONS,
    permissions: ["admin"],
    showInMenu: true,
    hideHeader: false,
  },
  {
    id: EPages.TABLES,
    permissions: ["admin"],
    showInMenu: true,
    hideHeader: false,
  },
  {
    id: EPages.ELEMENTS,
    permissions: ["admin"],
    showInMenu: true,
    hideHeader: false,
  },
  {
    id: EPages.ORDERS,
    permissions: ["manager", "personal", "admin"],
    showInMenu: true,
    hideHeader: false,
  },
  {
    id: EPages.KITCHEN,
    permissions: ["kitchen", "admin", "personal"],
    showInMenu: true,
    hideHeader: false,
  },
  {
    id: EPages.CATEGORIES,
    permissions: ["admin"],
    showInMenu: true,
    hideHeader: false,
  },
  {
    id: EPages.REPORTS,
    permissions: ["admin"],
    showInMenu: true,
    hideHeader: false,
  },
];
