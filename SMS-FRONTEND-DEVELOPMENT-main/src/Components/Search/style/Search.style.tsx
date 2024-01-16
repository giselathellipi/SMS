import styled from "styled-components";

export const Select = styled.select`
  position: absolute;
  z-index: 1;
  width: 340px;
  background-color: white;
  border: 1px solid #ccc;
  border-top: none;
  @media (max-width: 768px) {
    overflow-x: scroll;
    width: 140px;
  }
`;
export const Option = styled.option`
  padding: 5px 10px;
  font-size: 14px;
  color: #333;
  &:hover {
    background-color: gray;
  }
`;
