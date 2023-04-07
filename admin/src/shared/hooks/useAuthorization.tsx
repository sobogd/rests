import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { CLinks } from "../../app/consts";
import { EPages } from "../../entities/pages";
import { whoAmI } from "../../entities/auth";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuthorization = (): boolean => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAppSelector((s) => s.auth);

  const isAuthorizedUser = !!sessionStorage.getItem("token");

  React.useEffect(() => {
    if (user?.id && location.pathname === CLinks[EPages.AUTHORIZATION]) {
      navigate(CLinks[EPages.HOME]);
    }
  }, [user]);

  React.useEffect(() => {
    if (
      !user &&
      !isAuthorizedUser &&
      location.pathname !== CLinks[EPages.AUTHORIZATION]
    ) {
      navigate(CLinks[EPages.AUTHORIZATION]);
    }

    if (
      isAuthorizedUser &&
      location.pathname !== CLinks[EPages.AUTHORIZATION]
    ) {
      dispatch(whoAmI());
    }

    // if (headerComponent) {
    //   dispatch(pagesModel.actions.setHeaderComponent(undefined));
    // }
  }, [location.pathname]);

  return isAuthorizedUser;
};
