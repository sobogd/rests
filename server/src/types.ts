export interface IResponseStatusWithMessage {
  isSuccess: boolean;
  message?: string;
}

export type IAuthRequest = {
  user: {
    id: number;
    companyId: number;
  };
};
