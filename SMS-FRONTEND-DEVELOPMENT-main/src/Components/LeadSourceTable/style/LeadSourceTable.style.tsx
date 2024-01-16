import { Link } from "react-router-dom";
import styled from "styled-components";

export const LeadSourceTableHolder = styled.div`
  width: 100%;
  height: 700px;
`;

export const AddNewLeadSourceButtonContainer = styled.div`
  height: fit-content;
  margin: 10px;
`;
export const LeadSourceTableContainer = styled.div`
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

export const LeadsourceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const LeadSourceTableHead = styled.thead`
  background-color: #cfdeff;
  font-family: "Poppins";
  white-space: nowrap;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const LeadSourceTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #cfdeffa1;
  }
`;

export const LeadSourceTH = styled.th``;
export const LeadSourceTableBody = styled.tbody``;
export const LeadSourceTableCell = styled.td`
  border: 1px solid #3746673b;
  text-align: center;
  padding: 6px;
  font-family: "Poppins";
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const LeadSourceEditButton = styled.button`
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
export const LeadSourceIconLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
export const LeadSourceH2 = styled.h2`
  font-size: 30px;
  font-family: "Poppins";
  color: #0e53c5;
`;
export const AddNewLeadSourceButton = styled.div`
  height: fit-content;
  margin: 10px;
`;
export const LeadSourceAddProductNameContainerPlusIcon = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export const LeadSourceButtonName = styled.p`
  margin: 5px;
`;
