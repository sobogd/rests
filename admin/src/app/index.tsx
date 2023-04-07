import React from "react";
import { useAppDispatch, useAppSelector } from "./store";
import { Route, Routes } from "react-router-dom";
import { HeaderBar } from "../widgets";
import Loading from "../shared/loading";
import { CLinks, CPageComponents, CPages } from "./consts";
import { BodyContainer, Wrapper } from "./styles";
import { CssBaseline } from "@mui/material";
import {
  categoriesService,
  searchPositions,
  tablesService,
} from "../shared/api";
import { useLoading } from "../shared/hooks/useLoading";
import { useAuthorization } from "../shared/hooks/useAuthorization";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useLoading();
  const isAuthorized = useAuthorization();

  const { user } = useAppSelector((s) => s.auth);

  React.useEffect(() => {
    if (!!user?.id) {
      dispatch(tablesService.searchTables());
      dispatch(searchPositions());
      dispatch(categoriesService.searchCategories());
      dispatch(tablesService.findImage());
    }
  }, [user]);

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
      <CssBaseline />
      {isAuthorized && <HeaderBar />}
      <Loading isLoading={isLoading} />
      <BodyContainer isFullHeight={!isAuthorized}>
        <Routes>{routes}</Routes>
      </BodyContainer>
    </Wrapper>
  );
};

export default App;
