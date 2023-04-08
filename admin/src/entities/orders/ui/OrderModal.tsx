import { Chip, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "app/store";
import {
  backgroundDefault,
  ButtonStyled,
  ErrorBox,
  Item,
  NewModal,
  NewModalBody,
  NewModalCloseButton,
  NewModalContainer,
  NewModalFooter,
  NewModalHeader,
  primaryColor,
  textDefaultWhiteColor,
  TextSpan,
  TitleH1,
} from "app/styles";
import React from "react";
import { ordersService } from "shared/api";
import { roundFive } from "shared/utils/roundFive";
import { EOrderStatus, ordersModel } from "../model";
import CloseIcon from "@mui/icons-material/Close";

const discounts = [0, 10];

export const OrderModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    isLoading: isLoadingOrders,
    orderForBill,
    discountForBill,
  } = useAppSelector((s) => s.orders);
  const { items: positions, isLoading: isLoadingPositions } = useAppSelector(
    (s) => s.positions
  );

  const isAllPositionFinished = orderForBill?.status === EOrderStatus.FINISHED;

  const additionalsForPosition = orderForBill?.positions
    ?.filter((p) => !!p.additional?.length)
    .map((p) => p.additional);

  const positionsForOrder: any = orderForBill?.positions?.map((p) => {
    const position = positions.find(
      (pi) => Number(pi.id) === Number(p.positionId)
    );
    return { ...position, additional: p.additional };
  });

  const arrayAdditional: any = [];
  if (!!additionalsForPosition?.length) {
    additionalsForPosition.forEach((afp) => {
      const splitted = afp?.split("/");
      splitted?.forEach((spl) => {
        const colAndId = spl.split("-");
        const pos = positions.find(
          (pi) => Number(pi.id) === Number(colAndId[1])
        );
        arrayAdditional.push(
          `${pos?.name} - ${Number(pos?.price) * Number(colAndId[0])}`
        );
      });
    });
  }

  let summary = 0;

  const handleFinishOrder = (id: string, discount: number) => () => {
    dispatch(
      ordersService.finishOrder({
        id,
        discount,
      })
    ).then(() => {
      dispatch(ordersService.searchOrders());
    });
  };

  const handleCloseModal = () => {
    dispatch(ordersModel.actions.closeBillModal());
  };

  return (
    <NewModal
      open={!!orderForBill && !isLoadingOrders && !isLoadingPositions}
      onClose={handleCloseModal}
    >
      <NewModalContainer id="printableArea">
        <NewModalHeader>
          <TitleH1 size={20}>Bill for order №{orderForBill?.id}</TitleH1>
        </NewModalHeader>
        <NewModalCloseButton onClick={handleCloseModal}>
          <CloseIcon />
        </NewModalCloseButton>
        <NewModalBody>
          {!isAllPositionFinished ? (
            <ErrorBox>Not all position was finished!</ErrorBox>
          ) : (
            <>
              {!!orderForBill?.comment && (
                <>
                  <TextSpan size={18} bottom={5} id="noneForPrint1">
                    Comment for order:
                  </TextSpan>
                  <TextSpan bottom={20} id="noneForPrint2">
                    {orderForBill?.comment}
                  </TextSpan>
                </>
              )}
              <TextSpan size={18} bottom={15}>
                Order list:
              </TextSpan>
              {!!positionsForOrder?.length &&
                positionsForOrder?.map((e: any) => {
                  summary = summary + Number(e.price);

                  const secondary: any[] = [];

                  if (e.additional?.length) {
                    const splitted = e.additional?.split("/");

                    splitted?.forEach((spl: any, index: number) => {
                      const colAndId = spl.split("-");
                      const pos = positions.find(
                        (pi) => Number(pi.id) === Number(colAndId[1])
                      );
                      const price = Number(pos?.price) * Number(colAndId[0]);
                      summary = summary + price;

                      secondary.push(
                        <Grid container spacing={1}>
                          <Grid item xs={9}>
                            <TextSpan
                              top={!index ? 10 : 0}
                              size={14}
                              color={grey[500]}
                            >
                              {pos?.name}
                            </TextSpan>
                          </Grid>
                          <Grid item xs={3} style={{ textAlign: "right" }}>
                            <TextSpan size={14} color={grey[500]}>
                              {Number(pos?.price) > 0 ? pos?.price : null}
                            </TextSpan>
                          </Grid>
                        </Grid>
                      );
                    });
                  }

                  return (
                    <Item top={0} bottom={10} paddingX={20} paddingY={10}>
                      <Grid container spacing={1}>
                        <Grid item xs={9}>
                          <TextSpan>{e?.name}</TextSpan>
                        </Grid>
                        <Grid item xs={3} style={{ textAlign: "right" }}>
                          <TextSpan>
                            {Number(e?.price) > 0 ? e?.price : null}
                          </TextSpan>
                        </Grid>
                      </Grid>
                      {secondary}
                    </Item>
                  );
                })}
              <TextSpan size={18} bottom={5} top={20} id="noneForPrint3">
                Payment information:
              </TextSpan>
              <TextSpan bottom={5} id="noneForPrint4">
                Select discount percent for order:
              </TextSpan>
              <Box id="noneForPrint5">
                {discounts.map((d) => (
                  <Chip
                    label={d}
                    variant="outlined"
                    style={{
                      margin: 5,
                      borderColor:
                        d !== discountForBill ? primaryColor : primaryColor,
                      color:
                        d !== discountForBill
                          ? primaryColor
                          : textDefaultWhiteColor,
                      background:
                        d !== discountForBill
                          ? backgroundDefault
                          : primaryColor,
                    }}
                    onClick={() =>
                      dispatch(ordersModel.actions.setDiscountForBill(d))
                    }
                  />
                ))}
              </Box>
              <TextSpan size={16} top={20} bottom={10}>
                Total: {summary} TL
              </TextSpan>
              {!!discountForBill && (
                <TextSpan size={16}>
                  Total with discount:{" "}
                  {roundFive(summary - summary * (discountForBill / 100))} TL
                </TextSpan>
              )}
            </>
          )}
        </NewModalBody>
        {isAllPositionFinished && (
          <NewModalFooter>
            <ButtonStyled
              onClick={handleFinishOrder(
                orderForBill?.id || "",
                discountForBill
              )}
            >
              {roundFive(summary - summary * (discountForBill / 100))} TL Paid
            </ButtonStyled>
          </NewModalFooter>
        )}
      </NewModalContainer>
    </NewModal>
  );
};
