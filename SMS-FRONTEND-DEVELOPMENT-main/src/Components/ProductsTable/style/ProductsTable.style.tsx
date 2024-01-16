import { Link } from "react-router-dom";
import styled from "styled-components";

interface OptionProps {
  defaultValue?: string;
}
export const ProductsTableHolder = styled.div`
  width: 100%;
  height: 700px;
`;
export const DropdownOfProductCategory = styled.div`
  margin: 10px auto;
  width: 100%;
  max-width: 400px;
  align-items: center;
  display: flex;
  justify-content: center;
`;
export const SelectOption = styled.option<OptionProps>``;
export const TableAndDatepickerHolder = styled.div`
  width: 100%;
  height: 80%;
`;
export const TableContainer = styled.div`
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

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #cfdeff;
  font-family: "Poppins";
  white-space: nowrap;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #cfdeffa1;
  }
`;

export const TH = styled.th``;
export const Tbody = styled.tbody``;
export const TableCell = styled.td`
  border: 1px solid #3746673b;
  text-align: center;
  padding: 6px;
  font-family: "Poppins";
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const IconLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
export const H2 = styled.h2`
  font-size: 30px;
  font-family: "Poppins";
  color: #0e53c5;
`;
export const AddNewProductButton = styled.div`
  height: fit-content;
`;
export const AddProductNameContainerPlusIcon = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export const ButtonName = styled.p`
  margin: 5px;
`;

export const InputsOfProductTable = styled.div`
  display: flex;
`;
export const ProductInputHold = styled.div`
  flex: 1;
  margin: 5px;
`;
export const ProductImage = styled.img`
  width: 75px;
  height: 75px;
`;
