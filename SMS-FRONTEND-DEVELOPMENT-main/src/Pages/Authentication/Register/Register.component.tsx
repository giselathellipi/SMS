import { FC, useEffect, useState } from "react";
import axios from "axios";

//style
import {
  FormName,
  LabelDescriptionContainer,
  LinkTo,
  StyledForm,
  StyledSelect,
} from "App/style/App.style";
import {
  InputContainer,
  InputsHolder,
  RegParagraph,
  RegisterDontHaveAccountHold,
} from "./style/Register.style";

//components
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { registerUser } from "redux/Authentication/Register/RegisterSlice";

interface DropdownItem {
  id: string;
  name?: string;
}
const Register: FC<{}> = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [roles, setRoles] = useState<DropdownItem[]>([]);

  //email validation
  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const dispatch: AppDispatch = useDispatch();

  const userCredentials = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    role: {
      id: selectedRole || 0,
    },
  };

  //user role api call
  useEffect(() => {
    axios
      .get<DropdownItem[]>("http://192.168.10.210:8081/SMS/role")
      .then((res) => {
        setRoles(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log("error is", err));
  }, []);

  const handleRegisterClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (selectedRole === null || firstName === "" || lastName === "") {
      console.log("Missing required information!");
    } else if (!validateEmail(email)) {
      console.log("Invalid email format!");
    } else {
      try {
        const response = await dispatch(registerUser(userCredentials));
        if (registerUser.fulfilled.match(response)) {
          console.log("Go to check the email!");
        }

        setFirstName("");
        setLastName("");
        setEmail("");
        setUsername("");
        setRoles([]);
      } catch (error) {
        console.error("Register failed!", error);
      }
    }
  };
  return (
    <>
      <StyledForm>
        <FormName>Register</FormName>
        <InputsHolder>
          <InputContainer>
            <GenericInput
              placeholder="Firstname"
              input_label="FirstName"
              required={true}
              type="text"
              value={firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFirstName(e.target.value)
              }
            />
          </InputContainer>
          <InputContainer>
            <GenericInput
              placeholder="Lastname"
              input_label="LastName"
              required={true}
              type="text"
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLastName(e.target.value)
              }
            />
          </InputContainer>
        </InputsHolder>
        <InputsHolder>
          <InputContainer>
            <GenericInput
              placeholder="Email"
              input_label="Email"
              required={true}
              type="text"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
          </InputContainer>
          <InputContainer>
            <GenericInput
              placeholder="Username"
              input_label="Username"
              required={true}
              type="text"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(e.target.value);
              }}
            />
          </InputContainer>
        </InputsHolder>

        <InputContainer>
          <LabelDescriptionContainer>Role</LabelDescriptionContainer>
          <StyledSelect
            value={selectedRole !== null ? selectedRole.toString() : ""}
            onChange={(e: any) => setSelectedRole(Number(e.target.value))}
          >
            <option defaultValue="none">Select an Option</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </StyledSelect>
        </InputContainer>
        <GenericButton
          name="Submit"
          onClick={handleRegisterClick}
          disabled={
            !(
              selectedRole !== null &&
              firstName !== "" &&
              lastName !== "" &&
              email !== ""
            )
          }
        />
        <RegisterDontHaveAccountHold>
          <RegParagraph>Already have an account?</RegParagraph>
          <LinkTo to="/login">
            <RegParagraph>Login!</RegParagraph>
          </LinkTo>
        </RegisterDontHaveAccountHold>
      </StyledForm>
    </>
  );
};

export default Register;
