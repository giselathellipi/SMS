import { FC, useState } from "react";

//style
import { ResetPassInputsHolder } from "./style/ResetPassword.style";
import { FormName, StyledForm, Warning } from "App/style/App.style";

//mui-icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

//components
import GenericButton from "Components/GenericButton/GenericButton.component";
import GenericInput from "Components/GenericInput/GenericInput.component";

//redux
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import { resetPassword } from "redux/Authentication/ResetPassword/ResetPasswordSlice";

const ResetPassword: FC<{}> = () => {
  const [resetPasswordState, setResetPasswordState] = useState<string>("");
  const [confirmResetPassword, setConfirmResetPassword] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  const dispatch: AppDispatch = useDispatch();

  //api call
  const handleResetPassClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (resetPasswordState !== confirmResetPassword) {
      setPasswordsMatch(false);
      return;
    }
    setPasswordsMatch(true);

    const password = {
      password: resetPasswordState,
    };
    try {
      const response = await dispatch(resetPassword(password));
      if (resetPassword.fulfilled.match(response)) {
        console.log(response);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const changeIcon = () => {
    setShowNewPassword(!showNewPassword);
  };
  const changeConfirmNewPasswordIcon = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };
  return (
    <>
      <StyledForm>
        <FormName>Reset Password</FormName>
        <ResetPassInputsHolder>
          <GenericInput
            placeholder="New Password"
            input_label="New Password"
            required={true}
            type={showNewPassword ? "password" : "text"}
            onClickIcon={changeIcon}
            isPassword={true}
            passwordIcon={
              showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />
            }
            value={resetPasswordState}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setResetPasswordState(e.target.value)
            }
          />
          <GenericInput
            placeholder="New Password Confirmation"
            input_label="New Password Confirmation"
            required={true}
            type={showConfirmNewPassword ? "password" : "text"}
            onClickIcon={changeConfirmNewPasswordIcon}
            isPassword={true}
            passwordIcon={
              showConfirmNewPassword ? (
                <VisibilityOffIcon />
              ) : (
                <VisibilityIcon />
              )
            }
            value={confirmResetPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmResetPassword(e.target.value)
            }
          />
        </ResetPassInputsHolder>
        {!passwordsMatch && (
          <Warning>Passwords do not match. Please try again!</Warning>
        )}
        <GenericButton name="Submit" onClick={handleResetPassClick} />
      </StyledForm>
    </>
  );
};

export default ResetPassword;
