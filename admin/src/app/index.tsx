import React from "react";
import { useAppDispatch, useAppSelector } from "./store";
import { EPages, pagesModel } from "entities/pages";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { HeaderBar } from "../widgets";
import Loading from "../shared/loading";
import { CLinks, CPageComponents, CPages } from "./consts";
import { BodyContainer, Wrapper } from "./styles";
import { whoAmI } from "../entities/auth";

const App: React.FC = () => {
  const isAuthorizedUser = !!sessionStorage.getItem("token");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading: isLoadingUsers } = useAppSelector((s) => s.users);
  const { isLoading: isLoadingTables } = useAppSelector((s) => s.tables);
  const { isLoading: isLoadingOrders } = useAppSelector((s) => s.orders);
  const { isLoading: isLoadingCats } = useAppSelector((s) => s.categories);
  const { isLoading: isLoadingElements } = useAppSelector((s) => s.elements);
  const { isLoading: isLoadingPositions } = useAppSelector((s) => s.positions);
  const { headerComponent } = useAppSelector((s) => s.pages);
  const { isLoading: isLoadingCompanies } = useAppSelector((s) => s.companies);
  const {
    form: { isLoading: isLoadingAuth },
    user,
  } = useAppSelector((s) => s.auth);

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

    if (headerComponent) {
      dispatch(pagesModel.actions.setHeaderComponent(undefined));
    }
  }, [location.pathname]);

  const isHideHeader = React.useMemo(() => {
    return !!CPages.find((page) => CLinks[page.id] === location.pathname)
      ?.hideHeader;
  }, [location]);

  const isLoading = React.useMemo(() => {
    return (
      isLoadingUsers ||
      isLoadingTables ||
      isLoadingOrders ||
      isLoadingCats ||
      isLoadingElements ||
      isLoadingPositions ||
      isLoadingCompanies ||
      isLoadingAuth
    );
  }, [
    isLoadingUsers,
    isLoadingTables,
    isLoadingOrders,
    isLoadingCats,
    isLoadingElements,
    isLoadingPositions,
    isLoadingCompanies,
    isLoadingAuth,
  ]);

  const routes = React.useMemo(() => {
    return CPages.filter((page) =>
      user?.type ? page.permissions.includes(user?.type) : true
    ).map((page) => (
      <Route
        key={page.id}
        path={CLinks[page.id]}
        element={CPageComponents[page.id]}
      />
    ));
  }, [user]);

  return (
    <Wrapper>
      {!isHideHeader && <HeaderBar />}
      <Loading isLoading={isLoading} />
      <BodyContainer isFullHeight={isHideHeader}>
        <Routes>{routes}</Routes>
      </BodyContainer>
    </Wrapper>
  );
};

export default App;
