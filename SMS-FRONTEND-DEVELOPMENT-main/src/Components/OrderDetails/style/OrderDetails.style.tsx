import styled from "styled-components";

//mui-icons
import EditIcon from "@mui/icons-material/Edit";

export const Orderdetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 79%;
`;
export const OrderDetailsContentHolder = styled.div`
  width: 100%;
  height: 82%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const OrderDetailsHolder = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 10px 0 11px 0;
`;
export const OrderDetailsContainer = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin: auto;
  overflow-x: auto;
  position: relative;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
export const OrderDetailsTable = styled.table`
  box-shadow: 3px 3px 15px 5px rgb(0 0 0 / 15%);
  background-color: #fff;
  border-radius: 10px;
  width: 100%;
  height: fit-content;
  max-width: 750px;
  /* width: 100%; */
  /* height: 100%; */
  display: flex;
  flex-direction: row;
`;
export const DisplayOrderHolder = styled.div`
  width: 100%;
`;
export const OrdDetailsHolder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const OrderTableRow = styled.tr``;
export const OrdersTableHead = styled.thead`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: left;
`;
export const OrdersHead = styled.th`
  display: flex;
  width: 100%;
  margin: 7px;
  font-size: 16px;
  font-weight: 600;
  font-family: "Poppins";
`;
export const Hr = styled.p`
  border-bottom: 1px solid rgba(224, 224, 224, 1);
`;
export const OrdersTableBody = styled.tbody`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
export const OrdersTableRow = styled.tr`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
export const OrdersTableData = styled.td`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 7px;
  font-family: "Poppins";
  font-size: 15px;
`;
export const OrderActionTableData = styled.td`
  border-bottom: 1px solid #ccc;
  padding: 8px;
  display: flex;
`;
export const DeleteIconInOrdersHolder = styled.div`
  font-size: 30px;
  text-align: left;
  cursor: pointer;
`;
export const OrderEditButton = styled.button`
  background-color: #3746673b;
  border-radius: 5px;
  color: Black;
  border: none;
  font-weight: 500;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  font-family: "Poppins";
  display: inline-block;
  font-size: 15px;
  margin: 4px 2px;
  cursor: pointer;
`;
export const EditOrderIconMui = styled(EditIcon)`
  cursor: pointer;
  padding: 4px;
  color: #1976d2;
`;
export const EditOrderTableName = styled.p`
  font-family: "Poppins";
  color: #0e53c5;
  font-size: 27px;
  margin: 10px 0;
`;
export const AccountLabel = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #43546f;
  margin: 18px 0 8px 0;
  padding-left: 15px;
  text-align: left;
`;
