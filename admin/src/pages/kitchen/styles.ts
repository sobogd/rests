import { styled } from "@mui/material";

export const KitchenScrollable = styled("div")`
  display: flex;
  flex-direction: row;
  overflow: auto hidden;
  height: calc(100% - 42px);
  padding: 20px;
  margin: 0 -16px -20px;
`;

export const KitchenTableBlock = styled("div")`
  min-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #f9f7ff;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(43, 13, 98, 0.1);
  margin: 0;
  margin-right: 20px;
  outline: none !important;
  overflow: hidden;
`;

export const KitchenTableBlockHeader = styled("div")`
  margin: -15px -20px 0;
  width: calc(100% + 40px);
  padding: 15px 20px;
  border-bottom: 1px solid #e0dcf6;
`;

export const KitchenTableBlockBody = styled("div")`
  flex: 1 0 auto;
  margin: 0 -20px -15px;
  width: calc(100% + 40px);
  padding: 15px 20px;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: calc(100% - 25px);
`;
