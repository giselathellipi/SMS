import { FC, useEffect, useState } from "react";

//mui icons
import DeleteIcon from "@mui/icons-material/Delete";

//redux
import {
  ProductDetailss,
  fetchProductDetails,
} from "redux/Pages/Product/ProductSlice";
import { useParams } from "react-router-dom";
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import {
  deleteAttribute,
  editAttribute,
} from "redux/Pages/ShopCategory/ShopCategorySlice";
import { addSnackbar } from "redux/actions/actions-snackbar";

//style
import {
  ActionsTableData,
  AttributesHead,
  AttributesTableData,
  AttributesTableHead,
  AttributesTableRow,
  DeleteIconInAttributesHold,
  EditAttributeTableName,
  EditIconMui,
  ProductAttributesContentHolder,
  ProductAttributesHolder,
  ProductAttributesTable,
  ProductAttributesTableBody,
} from "./style/ProductAttributes.style";
import {
  InputsOfModalHolder,
  ModalInputHolder,
  ModalSaveButtonHolder,
} from "Components/OrdersTable/style/OrdersTable.style";
import {
  EditProductButton,
  EditProductButtonHolder,
  EditProductDetailsButtonNameContainer,
  EditProductText,
} from "Components/ProductDetails/style/ProductDetails.style";

//components
import Popup from "Components/Popup/Popup.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import GenericInput from "Components/GenericInput/GenericInput.component";

const ProductAttributes: FC<{}> = () => {
  const [attributeName, setAttributeName] = useState<string>("");
  const [attributeValue, setAttributeValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [productAttributes, setProductAttributes] = useState<ProductDetailss[]>(
    []
  );

  const { id } = useParams();
  const productId = id ? parseInt(id) : 0;

  const dispatch: AppDispatch = useDispatch();

  const isSaveButtonDisabled = !attributeName || !attributeValue;

  //get vendor by id
  useEffect(() => {
    const fetchProduct = () => {
      if (productId) {
        console.log(productId);
        dispatch(fetchProductDetails(productId))
          .then((result: any) => {
            console.log(result);
            if (fetchProductDetails.fulfilled.match(result)) {
              setProductAttributes(result.payload);
            }
          })
          .catch((error: any) => {
            console.error("Error fetching  product details:", error);
          });
      }
    };

    fetchProduct();
  }, [dispatch, productId]);

  //delete product attribute api call
  const handleDeleteProductAttribute = async (attributeId: number) => {
    try {
      const result = await dispatch(deleteAttribute(attributeId));
      if (deleteAttribute.fulfilled.match(result)) {
        console.log("Attribute deleted successfully!");
        // Fetch updated product details after deletion
        dispatch(fetchProductDetails(productId))
          .then((result: any) => {
            console.log(result);
            if (fetchProductDetails.fulfilled.match(result)) {
              setProductAttributes(result.payload);
            }
            dispatch(
              addSnackbar({
                id: "attributeSuccess",
                type: "success",
                message: "Attribute deleted successfully!",
              })
            );
          })
          .catch((error: any) => {
            dispatch(
              addSnackbar({
                id: "error",
                type: "error",
                message: "Error deleting product attribute!",
              })
            );
          });
      }
    } catch (error) {
      dispatch(
        addSnackbar({
          id: "error",
          type: "error",
          message: "Error deleting product attribute!",
        })
      );
    }
  };

  //upload button click
  const handleUpload = () => {
    setIsModalOpen(true);
    setAttributeName("");
    setAttributeValue("");
    setSelectedItem(null);
  };

  //api call
  const handleEditAttributeClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      let editedAttribute = null;

      // Check if selectedItem is not null and an existing item is being edited
      if (selectedItem) {
        editedAttribute = {
          id: selectedItem.id,
          attributeName: attributeName,
          attributeValue: attributeValue,
          productBasic: {
            id: productId,
          },
        };
      } else {
        // If selectedItem is null, create a new attribute
        editedAttribute = {
          attributeName: attributeName,
          attributeValue: attributeValue,
          productBasic: {
            id: productId,
          },
        };
      }

      const response = await dispatch(
        editAttribute({ attributeValues: editedAttribute })
      );

      if (editAttribute.fulfilled.match(response)) {
        console.log("done");
        setIsModalOpen(false);

        dispatch(fetchProductDetails(productId))
          .then((result: any) => {
            if (fetchProductDetails.fulfilled.match(result)) {
              setProductAttributes(result.payload);
              dispatch(
                addSnackbar({
                  id: "attributeSuccess",
                  type: "success",
                  message: "Attribute added successfully!",
                })
              );
            }
          })
          .catch((error: any) => {
            dispatch(
              addSnackbar({
                id: "error",
                type: "error",
                message: "Error adding product attribute!",
              })
            );
          });
      }
    } catch (error) {
      console.error("Save edited value failed!", error);
    }
  };

  const handleEdit = (selectedAttribute: any) => {
    console.log(selectedAttribute);
    setSelectedItem(selectedAttribute);
    setAttributeName(selectedAttribute?.attributeName || "");
    setAttributeValue(selectedAttribute?.attributeValue || "");
    setIsModalOpen(true);
  };

  return (
    <>
      {productAttributes.map((product: any, index: any) => (
        <ProductAttributesContentHolder key={index}>
          <ProductAttributesHolder>
            <EditProductButtonHolder>
              <EditProductButton>
                <EditProductDetailsButtonNameContainer>
                  <EditProductText onClick={handleUpload}>
                    Upload
                  </EditProductText>
                </EditProductDetailsButtonNameContainer>
              </EditProductButton>
            </EditProductButtonHolder>
            <ProductAttributesTable>
              <AttributesTableHead>
                <AttributesHead>Attribute Name</AttributesHead>
                <AttributesHead>Attribute Value</AttributesHead>
                <AttributesHead>Actions</AttributesHead>
              </AttributesTableHead>
              <ProductAttributesTableBody>
                {product.attributes.map((attribute: any, attrIndex: any) => (
                  <AttributesTableRow key={attrIndex}>
                    <AttributesTableData>
                      {attribute.attributeName}
                    </AttributesTableData>
                    <AttributesTableData>
                      {attribute.attributeValue}
                    </AttributesTableData>
                    <ActionsTableData>
                      <EditIconMui onClick={() => handleEdit(attribute)} />
                      <DeleteIconInAttributesHold
                        onClick={() =>
                          handleDeleteProductAttribute(attribute.id)
                        }
                      >
                        <DeleteIcon
                          color="primary"
                          style={{
                            fontSize: "30px",
                          }}
                        />
                      </DeleteIconInAttributesHold>
                    </ActionsTableData>
                  </AttributesTableRow>
                ))}
              </ProductAttributesTableBody>
            </ProductAttributesTable>
          </ProductAttributesHolder>
        </ProductAttributesContentHolder>
      ))}

      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        headerContent={
          <EditAttributeTableName>
            {selectedItem ? "Edit Attribute" : "Add New Attribute"}
          </EditAttributeTableName>
        }
        bodyContent={
          <>
            <>
              <InputsOfModalHolder>
                <ModalInputHolder>
                  <GenericInput
                    input_label="Attribute Name"
                    value={attributeName || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setAttributeName(e.target.value);
                    }}
                  />
                </ModalInputHolder>
                <ModalInputHolder>
                  <GenericInput
                    input_label="Attribute Value"
                    value={attributeValue || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setAttributeValue(e.target.value);
                    }}
                  />
                </ModalInputHolder>
              </InputsOfModalHolder>
            </>
          </>
        }
        footerContent={
          <ModalSaveButtonHolder>
            <GenericButton
              name="Save"
              onClick={handleEditAttributeClick}
              disabled={isSaveButtonDisabled}
            />
          </ModalSaveButtonHolder>
        }
      />
    </>
  );
};
export default ProductAttributes;
