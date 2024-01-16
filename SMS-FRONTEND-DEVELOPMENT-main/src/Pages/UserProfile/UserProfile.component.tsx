import { FC, useState } from "react";

//style
import { FormName, StyledForm } from "App/style/App.style";

//components
import UploadPhoto from "Components/UploadPhoto/UploadPhoto.component";
import {
  InputContentHolder,
  UserProfileInputsHolder,
} from "./style/UserProfile.style";
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";

const UserProfile: FC<{}> = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState<any>({});
  const [logoFromApi, setLogoFromApi] = useState<any>([]);
  const [reload, setReload] = useState<any>(0);
  return (
    <>
      <StyledForm>
        <FormName>Profile</FormName>
        <UploadPhoto
          sendPhoto={setProfilePicture}
          reload={reload}
          profilePhoto={logoFromApi[1]}
          profilePhotoType={logoFromApi[0]}
        />
        <UserProfileInputsHolder>
          <InputContentHolder>
            <GenericInput
              type="text"
              input_label="FirstName"
              placeholder="FirstName"
              value={firstName || ""}
              onChange={(e: any) => setFirstName(e)}
            />
          </InputContentHolder>
          <InputContentHolder>
            <GenericInput
              type="text"
              input_label="LastName"
              placeholder="LastName"
              value={lastName || ""}
              onChange={(e: any) => setLastName(e)}
            />
          </InputContentHolder>
        </UserProfileInputsHolder>
        <UserProfileInputsHolder>
          <InputContentHolder>
            <GenericInput
              type="text"
              input_label="Email"
              placeholder="Email"
              value={email || ""}
              onChange={(e: any) => setEmail(e)}
            />
          </InputContentHolder>
          <InputContentHolder>
            <GenericInput
              type="text"
              input_label="Phone Number"
              placeholder="Phone Number"
              value={phoneNumber || ""}
              onChange={(e: any) => setPhoneNumber(e)}
            />
          </InputContentHolder>
        </UserProfileInputsHolder>
        <GenericButton name="Submit" />
      </StyledForm>
    </>
  );
};

export default UserProfile;
