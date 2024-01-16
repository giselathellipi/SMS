import { Link } from "react-router-dom";
import styled from "styled-components";

export const ContactsTableHolder = styled.div`
  width: 100%;
  height: 700px;
`;

export const AddNewContactButton = styled.div`
  height: fit-content;
  margin: 10px;
`;
export const ContactsTableContainer = styled.div`
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

export const ContactTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const ContactsTableHead = styled.thead`
  background-color: #cfdeff;
  font-family: "Poppins";
  white-space: nowrap;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const ContactsTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #cfdeffa1;
  }
`;

export const ContactsTH = styled.th``;
export const ContactsTableBody = styled.tbody``;
export const ContactsTableCell = styled.td`
  border: 1px solid #3746673b;
  padding: 5px 10px;
  height: 39px;
  max-width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const ContactsEditButton = styled.button`
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
export const ContactsIconLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
export const ContactsH2 = styled.h2`
  font-size: 30px;
  font-family: "Poppins";
  color: #0e53c5;
`;
export const AddNewProductContactsButton = styled.div`
  height: fit-content;
  margin: 10px;
`;
export const ContactsAddProductNameContainerPlusIcon = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export const ContactsButtonName = styled.p`
  margin: 5px;
`;
