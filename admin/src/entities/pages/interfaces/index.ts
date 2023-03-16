import { EPages } from "..";

export interface IPageState {
  headerComponent?: JSX.Element;
  isOpenMenu: boolean;
}

export interface IPageActive {
  permissions: string[];
  id: EPages;
  showInMenu: boolean;
  hideHeader: boolean;
}
