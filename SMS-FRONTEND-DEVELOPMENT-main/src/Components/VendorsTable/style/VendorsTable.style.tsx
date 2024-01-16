import { Link } from "react-router-dom";
import styled from "styled-components";

export const VendorTableHolder = styled.div`
  width: 100%;
  height: 700px;
`;

export const AddNewVendorButton = styled.div`
  height: fit-content;
  margin: 10px;
`;
export const VendorTableContainer = styled.div`
  width: 100%;
  height: 80%;
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

export const VendorTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const VendorTableHead = styled.thead`
  background-color: #cfdeff;
  font-family: "Poppins";
  white-space: nowrap;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const VendorTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #cfdeffa1;
  }
`;

export const VendorTH = styled.th`

`;
export const VedorTableBody = styled.tbody``;
export const VendorTableCell = styled.td`
  border: 1px solid #3746673b;
  text-align: center;
  padding: 6px;
  font-family: "Poppins";
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const VendorEditButton = styled.button`
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
export const VendorIconLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
export const VendorH2 = styled.h2`
  font-size: 30px;
  font-family: "Poppins";
  color: #0e53c5;
`;
export const AddNewProductVendorButton = styled.div`
  height: fit-content;
`;
export const VendorAddProductNameContainerPlusIcon = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export const VendorButtonName = styled.p`
  margin: 5px;
`;
