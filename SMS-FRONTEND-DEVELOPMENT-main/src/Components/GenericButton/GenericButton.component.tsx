import { FC, ReactNode } from "react";

//style
import { ButtonCont, ButtonHolder } from "./style/GenericButton.style";

interface ButtonProps {
  name?: string | ReactNode;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  onClick?: any;
  value?: string;
  marginLeft?: string;
  marginRight?: string;
}
const GenericButton: FC<ButtonProps> = (props) => {
  return (
    <>
      <ButtonHolder>
        <ButtonCont
          onClick={props.onClick}
          type={props.type}
          disabled={props.disabled}
        >
          {props.name}
        </ButtonCont>
      </ButtonHolder>
    </>
  );
};
export default GenericButton;
