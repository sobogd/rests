import { BottomNavigationAction } from "@mui/material";
import React from "react";
import { whoAmI } from "../services/user";
import { useAppDispatch, useAppSelector } from "../store";
import { Container, ScrollableZone } from "../styles/common";
import { BottomNavigationStyled } from "../styles/common";
import { Login } from "./login/Login";
import { EPages } from "../enums/pages";
import { setActivePage } from "../slices/page";
import { Account } from "./account";
import { Tables } from "./tables";
import { Orders } from "./orders";
import { CPageIcons } from "../consts/pages";
import { Elements } from "./elements";
import { Positions } from "./positions";
import { Categories } from "./categories";
import { Kitchen } from "./kitchen";
import { Day } from "./day";

export const Layout: React.FC<{ children?: any }> = ({ children }) => {
  const isAuthorizatedUser = !!sessionStorage.getItem("token");
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((s) => s.user);
  const { active: page } = useAppSelector((s) => s.page);

  React.useEffect(() => {
    if (isAuthorizatedUser && !data?.id) {
      dispatch(whoAmI());
    }
  }, [dispatch, data, isAuthorizatedUser]);

  const handleChangePage = (_event: React.SyntheticEvent<Element, Event>, page: EPages) => {
    dispatch(setActivePage(page));
  };

  const renderedPage = React.useMemo(() => {
    if (isAuthorizatedUser) {
      switch (page) {
        case EPages.TABLES:
          return <Tables />;
        case EPages.ORDERS:
          return <Orders />;
        case EPages.MENU:
          return <Positions />;
        case EPages.ELEMENTS:
          return <Elements />;
        case EPages.CATEGORIES:
          return <Categories />;
        case EPages.KITCHEN:
          return <Kitchen />;
        case EPages.DAY:
          return <Day />;
        default:
          return <Account />;
      }
    }

    return <Login />;
  }, [isAuthorizatedUser, page]);

  return (
    <Container>
      <ScrollableZone>{renderedPage}</ScrollableZone>
      {isAuthorizatedUser && (
        <BottomNavigationStyled showLabels value={page} onChange={handleChangePage}>
          <BottomNavigationAction
            value={EPages.ACCOUNT}
            icon={CPageIcons[EPages.ACCOUNT]}
          ></BottomNavigationAction>
          {["admin"].includes(data?.type || "") && (
            <BottomNavigationAction
              value={EPages.MENU}
              icon={CPageIcons[EPages.MENU]}
            ></BottomNavigationAction>
          )}
          {["admin"].includes(data?.type || "") && (
            <BottomNavigationAction
              value={EPages.TABLES}
              icon={CPageIcons[EPages.TABLES]}
            ></BottomNavigationAction>
          )}
          {["admin"].includes(data?.type || "") && (
            <BottomNavigationAction
              value={EPages.ELEMENTS}
              icon={CPageIcons[EPages.ELEMENTS]}
            ></BottomNavigationAction>
          )}
          {["manager", "personal", "admin"].includes(data?.type || "") && (
            <BottomNavigationAction
              value={EPages.ORDERS}
              icon={CPageIcons[EPages.ORDERS]}
            ></BottomNavigationAction>
          )}
          {["kitchen", "admin", "personal"].includes(data?.type || "") && (
            <BottomNavigationAction
              value={EPages.KITCHEN}
              icon={CPageIcons[EPages.KITCHEN]}
            ></BottomNavigationAction>
          )}
          {["admin"].includes(data?.type || "") && (
            <BottomNavigationAction
              value={EPages.CATEGORIES}
              icon={CPageIcons[EPages.CATEGORIES]}
            ></BottomNavigationAction>
          )}
          {["admin", "manager"].includes(data?.type || "") && (
            <BottomNavigationAction value={EPages.DAY} icon={CPageIcons[EPages.DAY]}></BottomNavigationAction>
          )}
        </BottomNavigationStyled>
      )}
    </Container>
  );
};
