import { EPages } from "..";

export interface IPageState {
  activePage?: IPageActive;
  isOpenMenu: boolean;
}

export interface IPageActive {
  permissions: string[];
  name: string;
  id: EPages;
  icon: any;
  component: any;
  headerComponent?: any;
}
