import { IUser } from "../../entities/users";

export type TCompanyLoginProps = {
  onSuccessFetchingUsers: (users: IUser[]) => void;
};

export type TUsersForCompanyProps = {
  users: IUser[];
  onSelectCompanyUser: (login: string) => void;
  onClickBack: () => void;
};
