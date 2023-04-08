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
import {
  backgroundDefault,
  ButtonStyled,
  NewModal,
  NewModalBody,
  NewModalCloseButton,
  NewModalContainer,
  NewModalHeader,
  TextSpan,
  TitleH1,
  WrapperScrolled,
} from "app/styles";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
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

  const handleCloseModal = () => {
    setIsOpenDayReportModal(false);
  };

  return (
    <WrapperScrolled>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" stackId="a" fill="#8884d8" />
          <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
          <Bar dataKey="uv" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
      {/*<ButtonStyled bottom={15} onClick={() => setIsOpenDayReportModal(true)}>*/}
      {/*  Get day report*/}
      {/*</ButtonStyled>*/}
      {/*<NewModal open={isOpenDayReportModal} onClose={handleCloseModal}>*/}
      {/*  <NewModalContainer id="printableArea">*/}
      {/*    <NewModalHeader>*/}
      {/*      <TitleH1 size={20}>Day report</TitleH1>*/}
      {/*    </NewModalHeader>*/}
      {/*    <NewModalCloseButton onClick={handleCloseModal}>*/}
      {/*      <CloseIcon />*/}
      {/*    </NewModalCloseButton>*/}
      {/*    <NewModalBody>*/}
      {/*      <TextSpan bottom={15} color={grey[600]}>*/}
      {/*        For get day report, please select date in the calendar.*/}
      {/*      </TextSpan>*/}
      {/*      <LocalizationProvider dateAdapter={AdapterDateFns}>*/}
      {/*        <MobileDatePicker*/}
      {/*          label="Select date for report creating"*/}
      {/*          inputFormat="dd.MM.yyyy"*/}
      {/*          value={dateOfReport}*/}
      {/*          onChange={(e: string | null) => setDateOfReport(e)}*/}
      {/*          renderInput={(params) => (*/}
      {/*            <TextField fullWidth style={{ marginTop: 20 }} {...params} />*/}
      {/*          )}*/}
      {/*          closeOnSelect*/}
      {/*        />*/}
      {/*      </LocalizationProvider>*/}
      {/*      {dayTotal && (*/}
      {/*        <Alert*/}
      {/*          icon={false}*/}
      {/*          severity="success"*/}
      {/*          style={{ marginBottom: 10 }}*/}
      {/*        >*/}
      {/*          Day total: {roundFive(dayTotal)} TL*/}
      {/*        </Alert>*/}
      {/*      )}*/}
      {/*      {averageTime && (*/}
      {/*        <Alert icon={false} severity="info" style={{ marginBottom: 10 }}>*/}
      {/*          Average time: {averageTime} min*/}
      {/*        </Alert>*/}
      {/*      )}*/}
      {/*      {ordersForToday?.map((ot) => (*/}
      {/*        <ListItem divider disablePadding>*/}
      {/*          <ListItemText*/}
      {/*            primary={`№ ${ot.id} from ${getTimeInFormat(ot.date)}`}*/}
      {/*            secondary={*/}
      {/*              <React.Fragment>*/}
      {/*                <Typography variant="body2">*/}
      {/*                  Total:{" "}*/}
      {/*                  {roundFive(*/}
      {/*                    ot.discount*/}
      {/*                      ? Number(ot.total) * (1 - Number(ot.discount) / 100)*/}
      {/*                      : ot.total*/}
      {/*                  )}{" "}*/}
      {/*                  {ot.discount && Number(ot.discount)*/}
      {/*                    ? `(-${ot.discount}%)`*/}
      {/*                    : null}*/}
      {/*                </Typography>*/}
      {/*                <Typography variant="body2">*/}
      {/*                  Ready time: {ot.time} min*/}
      {/*                </Typography>*/}
      {/*                {ot.positions.join(", ")}*/}
      {/*              </React.Fragment>*/}
      {/*            }*/}
      {/*          />*/}
      {/*        </ListItem>*/}
      {/*      ))}*/}
      {/*    </NewModalBody>*/}
      {/*  </NewModalContainer>*/}
      {/*</NewModal>*/}
    </WrapperScrolled>
  );
};
