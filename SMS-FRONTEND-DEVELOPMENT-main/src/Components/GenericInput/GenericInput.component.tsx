import { FC, ChangeEvent, FocusEvent, ReactNode } from "react";

//style
import {
  Asterik,
  GenericInputContainer,
  IconPasswordDiv,
  InputContainer,
  InputIconHolder,
  LabelDescription,
} from "./style/GenericInput.style";

interface InputProps {
  input_label?: string;
  asterik?: string;
  icon?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  id?: string;
  type?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  label?: string;
  placeholder?: string;
  value?: any;
  pattern?: string;
  readOnly?: boolean;
  required?: boolean;
  disabled?: boolean;
  handleClick?: (e: FocusEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  passwordIcon?: ReactNode;
  onClickIcon?: (value: string) => void;
}

const GenericInput: FC<InputProps> = (props) => {
  let isPasswordInput = true;

  const handleClick = () => {
    if (props.onClickIcon) {
      props.onClickIcon(props.value);
    }
  };

  return (
    <>
      <GenericInputContainer>
        <LabelDescription>
          {props.input_label}
          <Asterik>{props.asterik}</Asterik>
        </LabelDescription>
        <InputIconHolder>
          <InputContainer
            ref={props.inputRef}
            id={props.id}
            type={props.type}
            name={props.name}
            onChange={props.onChange}
            onBlur={props.handleFocus}
            onFocus={props.onFocus}
            placeholder={props.placeholder}
            value={props.value}
            pattern={props.pattern}
            readOnly={props.readOnly}
            required={props.required}
            disabled={props.disabled}
          />
          {isPasswordInput === props.isPassword || false ? (
            <IconPasswordDiv onClick={handleClick}>
              {props.passwordIcon}
            </IconPasswordDiv>
          ) : null}
        </InputIconHolder>
      </GenericInputContainer>
    </>
  );
};
export default GenericInput;
