import styled from "@emotion/styled";
import React from "react";
import { Box, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useAppDispatch, useAppSelector } from "app/store";
import {
  backgroundDefault,
  primaryColor,
  TextSpan,
  TitleH1,
  WrapperScrolled,
} from "app/styles";
import { Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import {
  getDailyReport,
  IDailySummaryReport,
  reportsSlice,
} from "../../entities/reports";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import { grey } from "@mui/material/colors";

const ForGraphic = styled.div`
  min-height: 50vh;
  height: 250px;
  width: calc(100% + 44px);
  margin: -20px -22px 0;
`;

const CustomTooltipStyled = styled.div`
  background-color: ${backgroundDefault};
  padding: 15px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 35px rgba(43, 13, 98, 0.1);

  span {
    font-weight: 600;
  }
`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length && payload[0]?.payload?.date) {
    return (
      <CustomTooltipStyled>
        <span>{format(new Date(payload[0]?.payload?.date), "dd.MM.yyyy")}</span>
        {payload?.map((p: any) => {
          console.log({ p });
          return <p>{p?.value}</p>;
        })}
      </CustomTooltipStyled>
    );
  }

  return null;
};

export const Day: React.FC = () => {
  const dispatch = useAppDispatch();
  const { reports, startDate, endDate } = useAppSelector(
    (s) => s.reports.dailyReports
  );

  React.useEffect(() => {
    dispatch(getDailyReport({ startDate, endDate }));
  }, [startDate, endDate]);

  const handleChangeStartDate = (e: Date | null) => {
    console.log(e);
    if (e) dispatch(reportsSlice.actions.setStartDate(format(e, "yyyy-MM-dd")));
  };

  const handleChangeEndDate = (e: Date | null) => {
    console.log(e);
    if (e) dispatch(reportsSlice.actions.setEndDate(format(e, "yyyy-MM-dd")));
  };

  const reportForGraph = React.useMemo(() => {
    return reports?.map((report: IDailySummaryReport) => {
      const object = report.summary.reduce((acc: any, c) => {
        acc[c.paymentMethodId] = c.total;
        return acc;
      }, {});

      return {
        ...object,
        date: report.date,
      };
    });
  }, [reports]);

  const totalForPeriod = React.useMemo(() => {
    let total = 0;
    reports?.forEach((report) => {
      total = total + report.totalSummary;
    });

    return total;
  }, [reports]);

  const totalOrdersCount = React.useMemo(() => {
    let total = 0;

    reports?.forEach((report) => {
      total = total + report.ordersCount;
    });

    return total;
  }, [reports]);

  const averageReceipt = React.useMemo(() => {
    return Math.round(totalForPeriod / totalOrdersCount);
  }, [reports]);

  return (
    <WrapperScrolled>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box display="flex" flexDirection="row" marginTop={1}>
          <MobileDatePicker
            label="Start date"
            inputFormat="dd.MM.yyyy"
            value={startDate}
            onChange={handleChangeStartDate}
            renderInput={(params) => (
              <TextField fullWidth style={{ marginRight: 5 }} {...params} />
            )}
            closeOnSelect
          />
          <MobileDatePicker
            label="End date"
            inputFormat="dd.MM.yyyy"
            value={endDate}
            onChange={handleChangeEndDate}
            renderInput={(params) => (
              <TextField fullWidth style={{ marginLeft: 5 }} {...params} />
            )}
            closeOnSelect
          />
        </Box>
      </LocalizationProvider>
      <ForGraphic>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={
              reportForGraph?.length === 1
                ? [...reportForGraph, ...reportForGraph]
                : reportForGraph
            }
          >
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="8"
              stackId="1"
              stroke={grey[800]}
              fill={grey[800]}
              fillOpacity={1}
            />
            <Area
              type="monotone"
              dataKey="10"
              stackId="1"
              stroke={primaryColor}
              fill={primaryColor}
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ForGraphic>
      <TitleH1 bottom={15} top={15}>
        Summary
      </TitleH1>
      <TextSpan bottom={5}>Total for period: {totalForPeriod}</TextSpan>
      <TextSpan bottom={5}>Average receipt: {averageReceipt}</TextSpan>
      <TextSpan bottom={5}>Orders count: {totalOrdersCount}</TextSpan>
    </WrapperScrolled>
  );
};
