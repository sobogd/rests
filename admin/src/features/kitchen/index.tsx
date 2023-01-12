import styled from "@emotion/styled";
import React from "react";
import { categoriesService } from "../../services/categories";
import { ordersService } from "../../services/orders";
import { positionsService } from "../../services/positions";
import { tablesService } from "../../services/tables";
import Loading from "../../shared/loading";
import { useAppDispatch, useAppSelector } from "../../store";
import { formatInTimeZone } from "date-fns-tz";
import { format } from "date-fns";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { grey } from "@mui/material/colors";
// import { OrdersForm } from "./form";
// import { OrdersList } from "./list";

const KitchenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 60px);
  padding: 20px 15px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  overflow-y: scroll;
`;

const KitchenWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const KitchenBlock = styled.div`
  position: relative;
  background: #4f4f4f;
  width: calc(33.333% - 30px);
  margin: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  color: white;
  overflow: hidden;
  font-size: 14px;
`;

const KitchenBlockHeader = styled.div`
  width: calc(100% + 40px);
  background: #01695c;
  margin: -20px -20px 20px;
  position: relative;
  height: 70px;
  display: flex;
  flex-direction: column;
  padding: 0 20px 0 90px;
  justify-content: center;

  span {
    white-space: nowrap;
    font-size: 14px;
    b {
      position: absolute;
      top: 0;
      left: 0;
      width: 70px;
      height: 70px;
      background: #179888;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      font-weight: 600;
    }
  }
  p {
    white-space: nowrap;
    font-size: 14px;
    margin: 0;
  }
`;

const KitchenBlockComment = styled.div`
  position: relative;
  width: 100%;
  font-size: 14px;
  margin-bottom: 13px;
`;

const KitchenBlockPosition = styled.div<{ isFinished: boolean }>`
  width: 100%;
  margin-bottom: 13px;
  background: #676767;
  padding: 15px 55px 15px 15px;
  position: relative;
  opacity: ${({ isFinished }) => (!!isFinished ? "0.2" : "1")};
`;

const KitchenBlockPositionEndButton = styled.div`
  background: #01695c;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const KitchenBlockPositionComment = styled.div`
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 1px solid #8f8f8f;
  padding-bottom: 10px;
  font-size: 14px;
`;

const KitchenBlockPositionAdditional = styled.div`
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px solid #8f8f8f;
`;

export const Kitchen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading: isLoadingOrders, items } = useAppSelector((s) => s.orders);
  const { isLoading: isLoadingTables, items: tableItems } = useAppSelector((s) => s.tables);
  const { isLoading: isLoadingPositions, items: positionItems } = useAppSelector((s) => s.positions);

  React.useEffect(() => {
    dispatch(ordersService.search());
    dispatch(tablesService.search());
    dispatch(positionsService.search());

    const interval = setInterval(() => {
      dispatch(ordersService.search());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    dispatch(ordersService.search());
    dispatch(tablesService.search());
    dispatch(positionsService.search());
  }, []);

  const handleEndCook = (orderPositionId: number) => () => {
    dispatch(ordersService.orderPositionFinish({ orderPositionId })).then(() => {
      dispatch(ordersService.search());
    });
  };

  return (
    <KitchenContainer>
      <KitchenWrapper>
        <Loading isLoading={isLoadingOrders || isLoadingTables || isLoadingPositions} />
        {items.map((o) => {
          const tableForOrder = tableItems.find((t) => Number(t.id) === Number(o.tableId));
          const createDate = Date.parse(o.createTime);
          const offset = new Date().getTimezoneOffset();
          const dateWithTimeZone = createDate - offset * 60000;
          const date = format(dateWithTimeZone, "H:mm");

          return (
            <KitchenBlock>
              <KitchenBlockHeader>
                <span>
                  <b>{tableForOrder?.number}</b> {tableForOrder?.name}
                </span>
                <p>Создан: {date}</p>
              </KitchenBlockHeader>
              {!!o.comment && <KitchenBlockComment>{o.comment}</KitchenBlockComment>}

              {o.ordersPositions?.map((op) => {
                const position = positionItems.find((p) => Number(p.id) === Number(op.positionId));

                return (
                  <KitchenBlockPosition isFinished={!!op.finishTime}>
                    {!!op.comment && <KitchenBlockPositionComment>{op.comment}</KitchenBlockPositionComment>}
                    {position?.name}
                    {!!op.additional?.length && (
                      <KitchenBlockPositionAdditional>
                        {op.additional?.split("/").map((opa) => {
                          const splittedValue = opa.split("-");
                          const additional = positionItems.find(
                            (p) => Number(p.id) === Number(splittedValue[1])
                          );

                          return (
                            <div>
                              {additional?.name} - {splittedValue[0]}
                            </div>
                          );
                        })}
                      </KitchenBlockPositionAdditional>
                    )}

                    {!op.finishTime && (
                      <KitchenBlockPositionEndButton onClick={handleEndCook(op.id || 0)}>
                        <CheckCircleIcon sx={{ color: grey[50] }} />
                      </KitchenBlockPositionEndButton>
                    )}
                  </KitchenBlockPosition>
                );
              })}
            </KitchenBlock>
          );
        })}
      </KitchenWrapper>
    </KitchenContainer>
  );
};
