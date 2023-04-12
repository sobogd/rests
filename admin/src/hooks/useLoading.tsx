import { useAppSelector } from "../app/store";

export const useLoading = (): boolean => {
  const { isLoading: isLoadingUsers } = useAppSelector((s) => s.users);
  const { isLoading: isLoadingTables } = useAppSelector((s) => s.tables);
  const { isLoading: isLoadingOrders } = useAppSelector((s) => s.orders);
  const { isLoading: isLoadingCats } = useAppSelector((s) => s.categories);
  const { isLoading: isLoadingElements } = useAppSelector((s) => s.elements);
  const { isLoading: isLoadingPositions } = useAppSelector((s) => s.positions);
  const { isLoading: isLoadingCompanies } = useAppSelector((s) => s.companies);
  const { isLoading: isLoadingReports } = useAppSelector((s) => s.reports);
  const { form: authForm } = useAppSelector((s) => s.auth);

  return (
    isLoadingUsers ||
    isLoadingTables ||
    isLoadingOrders ||
    isLoadingCats ||
    isLoadingElements ||
    isLoadingPositions ||
    isLoadingCompanies ||
    isLoadingReports ||
    authForm.isLoading
  );
};
