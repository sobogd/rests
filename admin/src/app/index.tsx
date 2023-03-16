import React from "react";
import { useAppDispatch, useAppSelector } from "./store";
import { EPages, pagesModel } from "entities/pages";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { whoAmI } from "../shared/api";
import { HeaderBar } from "../widgets";
import Loading from "../shared/loading";
import { CLinks, CPageComponents, CPages } from "./consts";
import { BodyContainer, Wrapper } from "./styles";

const App: React.FC = () => {
  const isAuthorizedUser = !!sessionStorage.getItem("token");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading: isLoadingUsers } = useAppSelector((s) => s.users);
  const { isLoading: isLoadingTables } = useAppSelector((s) => s.tables);
  const { isLoading: isLoadingOrders } = useAppSelector((s) => s.orders);
  const { isLoading: isLoadingCats } = useAppSelector((s) => s.categories);
  const { isLoading: isLoadingElements } = useAppSelector((s) => s.elements);
  const { isLoading: isLoadingPositions } = useAppSelector((s) => s.positions);
  const { headerComponent } = useAppSelector((s) => s.pages);

  React.useEffect(() => {
    if (data?.id && location.pathname === CLinks[EPages.AUTHORIZATION]) {
      navigate(CLinks[EPages.HOME]);
    }
  }, [data]);

  React.useEffect(() => {
    if (
      !data &&
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
      isLoadingPositions
    );
  }, [
    isLoadingUsers,
    isLoadingTables,
    isLoadingOrders,
    isLoadingCats,
    isLoadingElements,
    isLoadingPositions,
  ]);

  return (
    <Wrapper>
      {!isHideHeader && <HeaderBar />}
      <Loading isLoading={isLoading} />
      <BodyContainer isFullHeight={isHideHeader}>
        <Routes>
          {CPages.map((page) => (
            <Route path={CLinks[page.id]} element={CPageComponents[page.id]} />
          ))}
        </Routes>
      </BodyContainer>
    </Wrapper>
  );
};

export default App;
