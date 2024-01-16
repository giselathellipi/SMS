import styled from "styled-components";

export const AccountTableContainer = styled.div`
  width: 100%;
  height: 700px;
`;
export const TableAccountHolder = styled.div`
  width: 100%;
  height: 80%;
`;
export const AddNewAccountButton = styled.div`
  height: fit-content;
  margin: 15px;
`;

export const AddAccountNameContainerPlusIcon = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export const AccountButtonName = styled.p`
  margin: 5px;
`;
export const PopupName = styled.p`
  color: #323fb6;
  font-size: 25px;
  font-family: "Poppins";
`;
export const AccountsTypeNAmeHolder = styled.div`
  display: flex;
  margin-top: 35px;
`;
export const AccountTypeName = styled.p`
  color: black;
  font-size: 30px;
  font-family: "Poppins";
  cursor: pointer;
  margin: 10px;
  &:hover {
    font-weight: bold;
  }
`;
