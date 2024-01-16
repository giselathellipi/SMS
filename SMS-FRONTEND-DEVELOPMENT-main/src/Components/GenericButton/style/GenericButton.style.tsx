import styled from "styled-components";

export const ButtonHolder = styled.div`
  width: 100%;
  max-width: 300px;
  margin: auto;
`;
export const ButtonCont = styled.button`
  background: #0e53c5;
  font-size: 16px;
  font-family: "Poppins";
  padding: 15px 0px;
  border-radius: 10px;
  border: 1px solid #323fb6;
  text-transform: capitalize;
  font-weight: 600;
  display: flex;
  align-items: center;
  width: 100%;
  color: #ffffff;
  cursor: pointer;
  transition: 0.2s;
  justify-content: center;
  margin-top: 32px;
  &:hover {
    background: #cfdeff;
    border-radius: 10px;
    color: #0e53c5;
    border: 1px solid transparent;
  }
  &:disabled {
    opacity: 0.6;
    filter: saturate(60%);
  }
`;
