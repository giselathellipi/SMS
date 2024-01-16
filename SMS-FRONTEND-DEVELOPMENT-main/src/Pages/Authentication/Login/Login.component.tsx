import { FC, useState } from "react";
import { useNavigate } from "react-router";

//style
import { FormName, LinkTo, StyledForm } from "App/style/App.style";
import {
  DontHaveAccountHold,
  InputsHolder,
  Paragraph,
} from "./style/Login.style";

//mui-icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

//components
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";

//redux
import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "redux/Authentication/Login/LoginSlice";

const Login: FC<{}> = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [typePassword, setTypePassword] = useState(true);

  const dispatch: AppDispatch = useDispatch();

  const userRole = useSelector((state: RootState) => state.login.user?.role);
  console.log(userRole);

  //email validation
  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const userCredentials = {
    email: email || "",
    password: password || "",
  };

  //login call
  const handleLoginClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e) {
      e.preventDefault();

      console.log("User credentials:", userCredentials);

      if (email === "" || password === "") {
        console.log("Missing required information!");
      } else if (!validateEmail(email)) {
        console.log("Invalid email format!");
      } else {
        try {
          const loginAction = dispatch(UserLogin(userCredentials));
          const resultAction = await loginAction;

          if (UserLogin.fulfilled.match(resultAction)) {
            const userRole = resultAction.payload.role;
            if (userRole === "ADMIN") {
              navigate("/home");
            } else if (userRole === "CUSTOMER") {
              navigate("/home");
            } else if (userRole === "EMPLOYEE") {
              navigate("/orderTable");
            }
            console.log("Login successful!");
          } else if (UserLogin.rejected.match(resultAction)) {
            // Login failed
            console.error("Login failed:", resultAction.payload);
          }
        } catch (error) {
          console.error("Error during login:", error);
        }
      }
    }
  };

  const changeIcon = () => {
    setTypePassword(!typePassword);
  };
  return (
    <>
      <StyledForm>
        <FormName>Log in</FormName>
        <InputsHolder>
          <GenericInput
            placeholder="Email"
            input_label="Email"
            required={true}
            type="text"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <GenericInput
            placeholder="Password"
            input_label="Password"
            required={true}
            type={typePassword ? "password" : "text"}
            onClickIcon={changeIcon}
            isPassword={true}
            passwordIcon={
              typePassword ? <VisibilityOffIcon /> : <VisibilityIcon />
            }
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </InputsHolder>

        <GenericButton name="Submit" onClick={handleLoginClick} />
        <DontHaveAccountHold>
          <Paragraph>Dont't have an account?</Paragraph>
          <LinkTo to="/register">
            <Paragraph>Click here!</Paragraph>
          </LinkTo>
        </DontHaveAccountHold>
        <DontHaveAccountHold>
          <Paragraph>Forgot password?</Paragraph>
          <LinkTo to="/forgotpassword">
            <Paragraph>Click here!</Paragraph>
          </LinkTo>
        </DontHaveAccountHold>
      </StyledForm>
    </>
  );
};

export default Login;
