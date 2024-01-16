import styled from "styled-components";

interface SnackBarProp {
  type?: string;
}

export const SnackBarCard = styled.div<SnackBarProp>`
  background-color: ${({ type }) => {
    switch (type) {
      case "success":
        return "#386641";
      case "error":
        return "#9b2226";
      case "warning":
        return "#e85d04";
      case "info":
        return "#005f73";
      default:
        return "gray";
    }
  }};
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Poppins";
  padding-left: 15px;
`;

export const MessageBox = styled.div`
  flex-grow: 1;
  margin-right: 10px;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;
`;
