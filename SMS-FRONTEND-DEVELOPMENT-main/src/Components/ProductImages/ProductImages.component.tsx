import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//redux
import { useDispatch } from "react-redux";
import {
  ProductImage,
  deleteProductImage,
  fetchImageCategory,
  uploadImage,
} from "redux/Pages/ImageCategory/ImageCategorySlice";
import { AppDispatch } from "redux/store";
import { addSnackbar } from "redux/actions/actions-snackbar";

//mui
import { Box } from "@mui/system";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";

//components
import UploadPhoto from "Components/UploadPhoto/UploadPhoto.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import SnackBarList from "Components/SnackbarList/SnackbarList.component";

//style
import {
  ButtonHold,
  ModalButtonHolder,
  UploadPhotoText,
} from "Containers/ProductForm/style/ProductForm.style";
import {
  EditProductButtonHolder,
  ProductImageHolder,
} from "Components/ProductDetails/style/ProductDetails.style";
import {
  ImageDeleteIconHolder,
  ImageTableBody,
  ImageTableData,
  ImageTableRow,
  ImagesHead,
  ImagesHolder,
  ImagesTable,
  ProductImageContentHolder,
  ProductImagesTableHead,
  UploadImageButton,
} from "./style/ProductImages.style";

const ProductImages: FC<{}> = () => {
  const [image, setImage] = useState<ProductImage[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [logoSelected, setLogoSelected] = useState<[string, string]>(["", ""]);

  const { id } = useParams();
  const productId = id ? parseInt(id) : 0;

  const dispatch: AppDispatch = useDispatch();

  const isSaveButtonDisabled = !logo;

  //get images
  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (productId) {
          console.log(productId);
          const result = await dispatch(fetchImageCategory(productId));
          console.log(result);
          if (fetchImageCategory.fulfilled.match(result)) {
            setImage(result.payload);
          }
        }
      } catch (error) {
        dispatch(
          addSnackbar({
            id: "error",
            type: "error",
            message: "Error fetching images!",
          })
        );
      }
    };

    fetchImage();
  }, [dispatch, productId]);

  const handleSaveImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (logo) {
      formData.append("images[0].image", logo || "");
    }
    formData.append("product.Id", id || "");

    try {
      await dispatch(uploadImage({ userCredentials: formData }));
      // Fetch the updated images after upload success and update the state
      const updatedImages = await dispatch(fetchImageCategory(productId));
      if (fetchImageCategory.fulfilled.match(updatedImages)) {
        setImage(updatedImages.payload);
      }
      dispatch(
        addSnackbar({
          id: "attributeSuccess",
          type: "success",
          message: "Image added successfully!",
        })
      );
      setOpenModal(false);
      setLogoSelected(["", ""]);
      setLogo(null);
    } catch (error) {
      dispatch(
        addSnackbar({
          id: "error",
          type: "error",
          message: "Error in  adding image!",
        })
      );
    }
  };

  //delete product image api call
  const handleDeleteProductImage = async (imageId: number) => {
    try {
      const result = await dispatch(deleteProductImage(imageId));
      if (deleteProductImage.fulfilled.match(result)) {
        console.log("Product deleted successfully!");
        setImage((prevState) =>
          prevState.filter((image) => image.id !== imageId)
        );
        dispatch(
          addSnackbar({
            id: "attributeSuccess",
            type: "success",
            message: "Image deleted successfully!",
          })
        );
      }
    } catch (error) {
      dispatch(
        addSnackbar({
          id: "error",
          type: "error",
          message: "Error deleting image!",
        })
      );
    }
  };

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
  return (
    <>
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
                  onClick={(e: any) => {
                    e.preventDefault();
                    setOpenModal(false);
                    handleImageChange();
                    handleSaveImage(e);
                  }}
                  disabled={isSaveButtonDisabled}
                />
              </ButtonHold>
            </ModalButtonHolder>
          </Box>
        </Modal>
      ) : null}
      <ProductImageContentHolder>
        <ImagesHolder>
          <EditProductButtonHolder>
            <UploadImageButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setOpenModal(true);
              }}
            >
              Upload
            </UploadImageButton>
          </EditProductButtonHolder>
          <ImagesTable>
            <ProductImagesTableHead>
              <ImageTableRow>
                <ImagesHead>Image Photo</ImagesHead>
                <ImagesHead>Action</ImagesHead>
              </ImageTableRow>
            </ProductImagesTableHead>
            <ImageTableBody>
              {image.map((image: any, index: any) => (
                <ImageTableRow key={index}>
                  <ImageTableData>
                    {image.image && (
                      <ProductImageHolder
                        src={`data:image/jpeg;base64,${image.image}`}
                      />
                    )}
                  </ImageTableData>
                  <ImageTableData>
                    <ImageDeleteIconHolder
                      onClick={() => handleDeleteProductImage(image.id)}
                    >
                      <DeleteIcon
                        color="primary"
                        style={{
                          fontSize: "30px",
                        }}
                      />
                    </ImageDeleteIconHolder>
                  </ImageTableData>
                </ImageTableRow>
              ))}
            </ImageTableBody>
          </ImagesTable>
        </ImagesHolder>
      </ProductImageContentHolder>
      <SnackBarList />
    </>
  );
};

export default ProductImages;
