import { FC, useState } from "react";

//style
import { FormName, StyledForm } from "App/style/App.style";
import { EmailParagraph, Text } from "./style/ForgotPassword.style";
import { ResetPassInputsHolder } from "../ResetPassword/style/ResetPassword.style";

//components
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";

//redux
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import { forgotPassword } from "redux/Authentication/ResetPassword/ResetPasswordSlice";

const ForgotPassword: FC<{}> = () => {
  const [emailState, setEmailState] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  //email validation
  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  //forgot pass call
  const handleForgotPassClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e) {
      e.preventDefault();

      console.log("User email:", emailState);

      if (emailState === "") {
        console.log("Missing required information!");
      } else if (!validateEmail(emailState)) {
        console.log("Invalid email format!");
      } else {
        try {
          await dispatch(forgotPassword(emailState)); 
          console.log("Go to check the email!");
        } catch (error) {
          console.error("Error during forgot pass:", error);
        }
      }
    }
  };

  return (
    <>
      <StyledForm>
        <FormName>Forgot Password</FormName>
        <Text>Please, enter your Email!</Text>
        <EmailParagraph>
          We will send a link to your Email address!
        </EmailParagraph>
        <ResetPassInputsHolder>
          <GenericInput
            placeholder="Email"
            input_label="Email"
            required={true}
            type="text"
            value={emailState}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmailState(e.target.value)
            }
          />
        </ResetPassInputsHolder>
        <GenericButton name="submit" onClick={handleForgotPassClick} />
      </StyledForm>
    </>
  );
};

export default ForgotPassword;
