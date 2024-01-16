import { FC, useState } from "react";
import { useNavigate } from "react-router";

//style
import { NewPassInputsHolder } from "./style/NewPassword.style";
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
import { newPassword } from "redux/Authentication/NewPassword/NewPasswordSlice";

const NewPassword: FC<{}> = () => {
  const navigate = useNavigate();
  const [newPasswordState, setNewPasswordState] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  const dispatch: AppDispatch = useDispatch();

  //api call
  const handleNewPassClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (newPasswordState !== confirmNewPassword) {
      setPasswordsMatch(false);
      return;
    }
    setPasswordsMatch(true);

    const password = {
      password: newPasswordState,
    };
    try {
      const response = await dispatch(newPassword(password));
      if (newPassword.fulfilled.match(response)) {
        console.log(response);
        navigate("/login");
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
        <FormName>New Password</FormName>
        <NewPassInputsHolder>
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
            value={newPasswordState}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPasswordState(e.target.value)
            }
          />
          <GenericInput
            placeholder="Confirm Password"
            input_label="Confirm Password"
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
            value={confirmNewPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmNewPassword(e.target.value)
            }
          />
        </NewPassInputsHolder>
        {!passwordsMatch && (
          <Warning>Passwords do not match. Please try again!</Warning>
        )}
        <GenericButton name="Submit" onClick={handleNewPassClick} />
      </StyledForm>
    </>
  );
};

export default NewPassword;
