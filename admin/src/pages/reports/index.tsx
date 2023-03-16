import styled from "@emotion/styled";
import React from "react";
import {
  Alert,
  Button,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box } from "@mui/system";
import { roundFive } from "shared/utils/roundFive";
import { getTimeInFormat } from "shared/utils/timeInFormat";
import { useAppDispatch, useAppSelector } from "app/store";
import { ordersService } from "shared/api";
import { backgroundDefault } from "app/styles";

const ScrollableDayReports = styled(List)`
  height: 100%;
  max-height: calc(100% - 190px);
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  position: absolute;
  left: 0;
  padding: 0 30px;
  background: none;
`;

export const Day: React.FC = () => {
  const dispatch = useAppDispatch();
  const { ordersForToday } = useAppSelector((s) => s.orders);
  const [isOpenDayReportModal, setIsOpenDayReportModal] = React.useState(false);
  const [dateOfReport, setDateOfReport] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (dateOfReport) {
      dispatch(ordersService.getDayReport(dateOfReport));
    }
  }, [dateOfReport]);

  const dayTotal = React.useMemo(() => {
    if (ordersForToday?.length) {
      return ordersForToday.reduce((acc, oft) => {
        acc =
          acc +
          (oft.discount
            ? Number(oft.total) * (1 - Number(oft.discount) / 100)
            : Number(oft.total));
        return acc;
      }, 0);
    }

    return null;
  }, [ordersForToday]);

  const averageTime = React.useMemo(() => {
    if (ordersForToday?.length) {
      return Math.round(
        ordersForToday.reduce((acc, oft) => {
          acc = acc + Number(oft.time);
          return acc;
        }, 0) / ordersForToday.length
      );
    }

    return null;
  }, [ordersForToday]);

  return (
    <>
      <Button
        fullWidth
        style={{ marginBottom: 25 }}
        variant="contained"
        onClick={() => setIsOpenDayReportModal(true)}
      >
        Get day report
      </Button>
      <Modal
        open={isOpenDayReportModal}
        onClose={() => setIsOpenDayReportModal(false)}
        style={{ background: backgroundDefault }}
      >
        <Box>
          <Typography variant="h6">Day Report</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Select date for report creating"
              inputFormat="dd.MM.yyyy"
              value={dateOfReport}
              onChange={(e: string | null) => setDateOfReport(e)}
              renderInput={(params) => (
                <TextField fullWidth style={{ marginTop: 20 }} {...params} />
              )}
              closeOnSelect
            />
          </LocalizationProvider>
          <ScrollableDayReports disablePadding>
            {dayTotal && (
              <Alert
                icon={false}
                severity="success"
                style={{ marginBottom: 10 }}
              >
                Day total: {roundFive(dayTotal)} TL
              </Alert>
            )}
            {averageTime && (
              <Alert icon={false} severity="info" style={{ marginBottom: 10 }}>
                Average time: {averageTime} min
              </Alert>
            )}
            {ordersForToday?.map((ot) => (
              <ListItem divider disablePadding>
                <ListItemText
                  primary={`№ ${ot.id} from ${getTimeInFormat(ot.date)}`}
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2">
                        Total:{" "}
                        {roundFive(
                          ot.discount
                            ? Number(ot.total) * (1 - Number(ot.discount) / 100)
                            : ot.total
                        )}{" "}
                        {ot.discount && Number(ot.discount)
                          ? `(-${ot.discount}%)`
                          : null}
                      </Typography>
                      <Typography variant="body2">
                        Ready time: {ot.time} min
                      </Typography>
                      {ot.positions.join(", ")}
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </ScrollableDayReports>
        </Box>
      </Modal>
    </>
  );
};