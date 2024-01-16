import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

//style
import {
  CreateCategoryHolder,
  UploadLogoLabel,
} from "./style/CreateCategory.style";
import { FormName, StyledForm } from "App/style/App.style";
import {
  AddButton,
  ButtonHold,
  LogoTitle,
  ModalButtonHolder,
  UploadLogoHolder,
  UploadPhotoText,
} from "Containers/ProductForm/style/ProductForm.style";

//mui
import { Box } from "@mui/system";
import Modal from "@mui/material/Modal";

//components
import UploadPhoto from "Components/UploadPhoto/UploadPhoto.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import GenericInput from "Components/GenericInput/GenericInput.component";

//redux
import { createCategory } from "redux/Pages/CreateCategory/CreateCategorySlice";
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";

const CreateCategory: FC<{}> = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [logoSelected, setLogoSelected] = useState<[string, string]>(["", ""]);
  const [name, setName] = useState<string>("");

  const handleImageChange = () => {
    if (logo instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(logo);
      reader.onload = () => {
        if (reader.result) {
          const photoType = (reader.result as string).slice(
            (reader.result as string).indexOf(":") + 1,
            (reader.result as string).indexOf(";")
          );
          const photoData = (reader.result as string).split(",")[1];
          setLogoSelected([photoType, photoData]);
        }
      };
    }
  };

  const styleForAddLogoModalBox = {
    width: "25%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#FFFFFF",
    border: "none",
    boxShadow: "5px 5px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    p: 4,
    outline: 0,
    padding: "10px",
    "@media (max-width: 780px)": {
      width: "80%",
    },
  };

  const dispatch: AppDispatch = useDispatch();

//   const convertImageToBase64 = (image: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       if (reader.result) {
//         resolve(reader.result.toString());
//       } else {
//         reject(new Error("Failed to convert image to Base64"));
//       }
//     };
//     reader.onerror = (error) => reject(error);
//     reader.readAsDataURL(image);
//   });
// };

  //post category api
  const handleCategoryClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);

    if (logo) {
      formData.append("image", logo);
    }
    try {
      const response = await dispatch(
        createCategory({ categoryCredentials: formData })
      );
      console.log(response);
      if (createCategory.fulfilled.match(response)) {
        navigate("/getCategory");
        console.log("fulfilled");
      }
    } catch (error) {
      console.log("Error in handleCategoryClick:", error);
    }
  };
  return (
    <>
      <CreateCategoryHolder>
        {openModal ? (
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Box sx={styleForAddLogoModalBox}>
              <UploadPhotoText>Upload Logo</UploadPhotoText>
              <UploadPhoto
                profilePhoto={logoSelected[1]}
                profilePhotoType={logoSelected[0]}
                reload={true}
                sendPhoto={setLogo}
              />
              <ModalButtonHolder>
                <ButtonHold>
                  <GenericButton
                    name="Cancel"
                    onClick={() => {
                      setOpenModal(false);
                      setLogoSelected(["", ""]);
                      setLogo(null);
                    }}
                  />
                </ButtonHold>
                <ButtonHold>
                  <GenericButton
                    name="Save"
                    onClick={() => {
                      setOpenModal(false);
                      handleImageChange();
                    }}
                  />
                </ButtonHold>
              </ModalButtonHolder>
            </Box>
          </Modal>
        ) : null}
        <StyledForm>
          <FormName>New Category</FormName>
          <UploadLogoLabel>Upload Logo</UploadLogoLabel>
          <UploadLogoHolder>
            <AddButton
              name="Upload"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setOpenModal(true);
              }}
            >
              Upload
            </AddButton>
            {logo && <LogoTitle>{logo.name}</LogoTitle>}
          </UploadLogoHolder>

          <GenericInput
            placeholder="Name"
            input_label="Name"
            required={true}
            type="text"
            value={name || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <GenericButton name="Add" onClick={handleCategoryClick} />
        </StyledForm>
      </CreateCategoryHolder>
    </>
  );
};

export default CreateCategory;
