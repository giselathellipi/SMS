import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//style
import {
  AddCategoryNameContainerPlusIcon,
  AddNewCategoryButton,
  CategoriesTableHolder,
  CategoryButtonName,
  CategoryEditButton,
  CategoryInputHolder,
  CategoryTable,
  CategoryTableAndModalHolder,
  CategoryTableContainer,
  CategoryTableRow,
  Imagecategory,
  InputsOfCategoriesPopup,
  TableCellOfCategory,
  TableHead,
  TableHeadOfCategory,
  Tablebody,
} from "./style/GetCategories.style";

//redux
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import {
  Category,
  createCategory,
  deleteCategory,
  fetchCategories,
} from "redux/Pages/CreateCategory/CreateCategorySlice";

//components
import GenericButton from "Components/GenericButton/GenericButton.component";
import Popup from "Components/Popup/Popup.component";
import GenericInput from "Components/GenericInput/GenericInput.component";
import UploadPhoto from "Components/UploadPhoto/UploadPhoto.component";

//mui icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";


const GetCategories: FC<{}> = (props) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  console.log(selectedItem);
  const [logo, setLogo] = useState<File | null>(null);
  const [photoName, setPhotoName] = useState<string>("");
  const [logoSelected, setLogoSelected] = useState<[string, string]>(["", ""]);
  const dispatch: AppDispatch = useDispatch();

  //get category api
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const result = await dispatch(fetchCategories());
        if (fetchCategories.fulfilled.match(result)) {
          setCategories(result.payload);
        } else {
          setError("Error fetching categories. Please try again later!");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Error fetching categories. Please try again later!");
      }
    };

    fetchCategoryData();
  }, [dispatch]);
  console.log("categories", categories);

  //edit button click
  const handleEdit = (item: any) => {
    setIsModalOpen(true);
    setSelectedItem(item);

    if (item && item.image && item.name) {
      setLogoSelected([item.imageType, item.image]);
      setPhotoName(item.name);
    }
  };
  const categoryButton = (
    <AddCategoryNameContainerPlusIcon>
      <AddCircleOutlineIcon />
      <CategoryButtonName>Add category</CategoryButtonName>
    </AddCategoryNameContainerPlusIcon>
  );
  console.log("photoNmae", photoName);
  const handleSaveCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedItem) {
      console.error("No selected item");
      return;
    }

    const formData = new FormData();
    formData.append("name", photoName || "");
    formData.append("id", selectedItem.id.toString());

    if (logo) {
      formData.append("image", logo);
    }

    try {
      // Dispatch the update action with the updated form data
      const response = await dispatch(
        createCategory({ categoryCredentials: formData })
      );

      if (response.payload) {
        const updatedItem = { ...selectedItem };
        console.log("updatedItem", updatedItem); // Create a copy of the selected item
        updatedItem.name = photoName; // Update the name
        
        const updatedCategories = categories.map((category) =>
          category.id === selectedItem.id ? updatedItem : category
        );

        setCategories(updatedCategories);
        setIsModalOpen(false);
        setSelectedItem(updatedItem); // Update the selectedItem with the new values
      }
    } catch (error) {
      console.error("Error in handleSaveCategory:", error);
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

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      const result = await dispatch(deleteCategory(categoryId));
      if (deleteCategory.fulfilled.match(result)) {
        console.log("Product deleted successfully!");
        setCategories((prevState) =>
          prevState.filter((category) => category.id !== categoryId)
        );
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  return (
    <CategoriesTableHolder>
      <AddNewCategoryButton>
        <GenericButton
          name={categoryButton}
          onClick={() => navigate("/createCategory")}
        />
      </AddNewCategoryButton>
      <CategoryTableAndModalHolder>
        <CategoryTableContainer>
          <CategoryTable>
            <TableHeadOfCategory>
              <CategoryTableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
              </CategoryTableRow>
            </TableHeadOfCategory>
            <Tablebody>
              {categories.map((item: any, index: number) => (
                <CategoryTableRow key={index}>
                  <TableCellOfCategory>
                    {item.image && (
                      <Imagecategory
                        src={`data:image/jpeg;base64,${item.image}`}
                      />
                    )}
                  </TableCellOfCategory>
                  <TableCellOfCategory>{item.name}</TableCellOfCategory>
                  <TableCellOfCategory>
                    <CategoryEditButton onClick={() => handleEdit(item)}>
                      Edit
                    </CategoryEditButton>
                    <div onClick={() => handleDeleteCategory(item.id)}>
                      <DeleteIcon
                        color="primary"
                        style={{
                          fontSize: "30px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </TableCellOfCategory>
                </CategoryTableRow>
              ))}
            </Tablebody>
          </CategoryTable>
        </CategoryTableContainer>
        <Popup
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          headerContent={<h2>Edit Category</h2>}
          bodyContent={
            <>
              <InputsOfCategoriesPopup>
                <CategoryInputHolder>
                  <UploadPhoto
                    profilePhoto={logoSelected[1]}
                    profilePhotoType={logoSelected[0]}
                    reload={true}
                    sendPhoto={setLogo}
                  />
                </CategoryInputHolder>

                <CategoryInputHolder>
                  <GenericInput
                    input_label="Name"
                    value={photoName || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPhotoName(e.target.value);
                    }}
                  />
                </CategoryInputHolder>
              </InputsOfCategoriesPopup>
            </>
          }
          footerContent={
            <GenericButton
              name="Save"
              onClick={(e: any) => {
                e.preventDefault();

                handleSaveCategory(e);
                handleImageChange();
              }}
            />
          }
        />
      </CategoryTableAndModalHolder>
    </CategoriesTableHolder>
  );
};
export default GetCategories;
