import styled from "styled-components";

export const GenericInputContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;
`;
export const LabelDescription = styled.div`
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
export const Asterik = styled.span`
  color: #fc0101;
  font-weight: bold;
  font-family: "Poppins";
`;
export const InputIconHolder = styled.div`
  display: flex;
  position: relative;
`;
export const InputContainer = styled.input`
  border-radius: 10px;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  height: 53px;
  background: #ffffff;
  border: 1.5px solid #cfdeff;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  padding-left: 15px;
`;
export const IconPasswordDiv = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;
