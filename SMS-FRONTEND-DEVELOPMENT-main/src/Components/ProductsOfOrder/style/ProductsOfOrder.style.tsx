import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";

export const ProductsOfOrderContentHolder = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 10px 0 17px 0;
`;

export const ProductsOfOrderHolder = styled.div`
  width: 100%;
  max-width: 750px;
  box-shadow: 3px 3px 15px 5px rgb(0 0 0 / 15%);
  border-radius: 10px;
  background-color: #ffff;
  overflow: scroll;
  height: 315px;
  overflow-x: auto;
  position: relative;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
export const ProductsOfOrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;
export const ProductsOfOrderTableHead = styled.thead`
  text-align: left;
`;
export const ProductsOfOrderHead = styled.th`
  border-bottom: 1px solid #ccc;
  padding: 8px;
`;
export const ProductsOfOrderTableBody = styled.tbody`
  text-align: left;
`;
export const ProductsOfOrderTableRow = styled.tr``;
export const ProductsOfOrderTableData = styled.td`
  border-bottom: 1px solid #ccc;
  padding: 8px;
`;
export const ActionsTableData = styled.td`
  border-bottom: 1px solid #ccc;
  padding: 8px;
  display: flex;
`;
export const DeleteIconInProductsOfOrderHold = styled.div`
  font-size: 30px;
  text-align: left;
  cursor: pointer;
`;
export const EditButton = styled.button`
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
export const EditIconMui = styled(EditIcon)`
  cursor: pointer;
  padding: 4px;
  color: #1976d2;
`;
export const EditAttributeTableName = styled.p`
  font-family: "Poppins";
  color: #0e53c5;
  font-size: 27px;
  margin: 10px 0;
`;
export const ProductOfOrderText = styled.p`
  font-family: "Poppins";
  color: #0e53c5;
  font-size: 30px;
`;
