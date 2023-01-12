import { EPages } from "../enums/pages";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { teal } from "@mui/material/colors";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AppsIcon from "@mui/icons-material/Apps";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import AssessmentIcon from "@mui/icons-material/Assessment";

export const CPageNames = {
  [EPages.ACCOUNT]: "Account",
  [EPages.MENU]: "Menu",
  [EPages.ADDING_MENU]: "Add item",
  [EPages.AUTHORIZATION]: "Authorization",
  [EPages.ORDERS]: "Orders",
  [EPages.TABLES]: "Tables",
  [EPages.ELEMENTS]: "Elements",
  [EPages.CATEGORIES]: "Categories",
  [EPages.KITCHEN]: "Kitchen",
  [EPages.DAY]: "Day Rport",
};

export const CPageIcons = {
  [EPages.ACCOUNT]: <AccountCircleIcon sx={{ color: teal[50] }} />,
  [EPages.AUTHORIZATION]: <AccountCircleIcon sx={{ color: teal[50] }} />,
  [EPages.ORDERS]: <ReceiptLongIcon sx={{ color: teal[50] }} />,
  [EPages.TABLES]: <TableRestaurantIcon sx={{ color: teal[50] }} />,
  [EPages.MENU]: <MenuBookIcon sx={{ color: teal[50] }} />,
  [EPages.ELEMENTS]: <AutoFixHighIcon sx={{ color: teal[50] }} />,
  [EPages.CATEGORIES]: <AppsIcon sx={{ color: teal[50] }} />,
  [EPages.KITCHEN]: <SoupKitchenIcon sx={{ color: teal[50] }} />,
  [EPages.DAY]: <AssessmentIcon sx={{ color: teal[50] }} />,
};
