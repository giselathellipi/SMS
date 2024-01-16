import styled from "styled-components";

//react-router-dom
import { Link } from "react-router-dom";
import { RefObject } from "react";

//outlet
export const Page = styled.div`
  /* width: 100%; */
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background: #e5e5e5; */
  background-color: white;
`;

//generic dropdown
interface dropdownProps {
  label?: string;
  id?: string;
  type?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFocus?: () => void;
  handleSelectDropdown?: () => void;
  placeholder?: string;
  value?: string;
  inputRef?: RefObject<HTMLInputElement>;
  pattern?: string;
  readOnly?: boolean;
  required?: boolean;
  disabled?: boolean;
  fontFamily?: string;
  fontWeight?: string;
  bordertoprightradius?: string;
  borderbottomrightradius?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  paddingleft?: string;
  backgroundcolor?: string;
  border?: string;
  borderradius?: string;
  padding?: string;
  margin?: string;
  marginTop?: string;
}
export const StyledSelect = styled.select<dropdownProps>`
  font-family: ${(props: any) => props.fontFamily || "Poppins"};
  font-weight: ${(props: any) => props.fontWeight || "400"};
  outline: none;
  box-sizing: border-box;
  border: ${(props: any) => props.border || "1.5px solid #cfdeff"};
  width: ${(props: any) => props.width || "100%"};
  height: ${(props: any) => props.height || "53px"};
  background: ${(props: any) => props.backgroundcolor || "#FFFFFF"};
  border-radius: ${(props: any) => props.borderradius || "10px"};
  font-size: ${(props: any) => props.fontSize || "12px"};
  padding-left: ${(props: any) => props.paddingleft};
  padding: ${(props: any) => props.padding || "10px"};
  margin: ${(props: any) => props.margin};
  margin-top: ${(props: any) => props.marginTop};
`;
export const LabelDescriptionContainer = styled.div`
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

//form
interface FormProps {
  height?: string;
  onSubmit?: any;
  //  (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}
export const StyledForm = styled.form<FormProps>`
  width: 100%;
  max-width: 650px;
  margin: auto;
`;

export const FormName = styled.h1`
  font-family: "Poppins";
  text-align: center;
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 70px;
  color: #43546f;
`;

//Link
export const LinkTo = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 15px;
  font-family: "Poopins";
`;

//button
export const ButtonHolder = styled.div`
  width: 100%;
  max-width: 300px;
  margin: auto;
`;

export const Warning = styled.p`
  color: red;
  font-family: "Poppins";
  font-size: 11px;
  text-align: left;
  margin: 0;
  font-weight: 600;
`;
