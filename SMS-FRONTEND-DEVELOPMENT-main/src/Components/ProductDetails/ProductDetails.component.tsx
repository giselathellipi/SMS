import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//style
import {
  ButtonsHolder,
  CategoryLabel,
  DisplayProductsHolder,
  EditButtonContainer,
  EditProductTableName,
  InformationOfProduct,
  ProdDetailsHeaderText,
  ProdDetailsHolder,
  ProdTextHolders,
  ProductDetailsComponent,
  ProductDetailsContainer,
  ProductDetailsContentHolder,
  ProductList,
  Productdetails,
} from "./style/ProductDetails.style";
import {
  DropdownOfProductCategory,
  InputsOfProductTable,
  ProductInputHold,
  SelectOption,
} from "Components/ProductsTable/style/ProductsTable.style";
import { StyledSelect } from "App/style/App.style";

//redux
import {
  ProductDetailss,
  fetchProductDetails,
} from "redux/Pages/Product/ProductSlice";
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import { productForm } from "redux/Containers/ProductForm/ProductFormSlice";
import {
  ShopCategoryProductProps,
  deleteProduct,
} from "redux/Pages/ShopCategory/ShopCategorySlice";
import {
  ProductProps,
  fetchProductsCategory,
} from "redux/Pages/ProductCategory/ProductCategorySlice";

//components
import ProductImages from "Components/ProductImages/ProductImages.component";
import ProductAttributes from "Components/ProductAttributes/ProductAttributes.component";
import Popup from "Components/Popup/Popup.component";
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import SnackBarList from "Components/SnackbarList/SnackbarList.component";

//mui icons
import DeleteIcon from "@mui/icons-material/Delete";
import { addSnackbar } from "redux/actions/actions-snackbar";

const ProductDetails: FC<{}> = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [productDetails, setProductDetails] = useState<ProductDetailss[]>([]);
  const [shopCategory, setShopCategory] = useState<ShopCategoryProductProps[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [productCategory, setProductCategory] = useState<ProductProps[]>([]);

  const { id } = useParams();
  const productId = id ? parseInt(id) : 0;

  const dispatch: AppDispatch = useDispatch();

  //get products by id
  useEffect(() => {
    const fetchProduct = () => {
      if (productId) {
        console.log(productId);
        dispatch(fetchProductDetails(productId))
          .then((result: any) => {
            console.log(result);
            if (fetchProductDetails.fulfilled.match(result)) {
              setProductDetails(result.payload);
            }
          })
          .catch((error: any) => {
            dispatch(
              addSnackbar({
                id: "error",
                type: "error",
                message: "Error fetching  product details!",
              })
            );
          });
      }
    };

    fetchProduct();
  }, [dispatch, productId]);

  //get category
  useEffect(() => {
    dispatch(fetchProductsCategory())
      .then((result: any) => {
        if (fetchProductsCategory.fulfilled.match(result)) {
          const categories = result.payload;
          setProductCategory(categories);
          if (categories.length > 0) {
            // Set the selected category to the first category ID
            setSelectedCategory(categories[0].id);
          }
        } else {
          console.error("Product categories not found.");
        }
      })
      .catch((error: any) => {
        dispatch(
          addSnackbar({
            id: "error",
            type: "error",
            message: "Error fetching product categories!",
          })
        );
      });
  }, [dispatch]);

  //edit button click
  const handleEdit = (product: any) => {
    console.log("producct", product);
    setIsModalOpen(true);
    setSelectedItem(product);
  };

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedItem) {
      console.error("No selected item");
      return;
    }

    const formData = new FormData();
    formData.append("name", selectedItem.name || "");
    formData.append("barcode", selectedItem.barcode || "");
    formData.append("stockQuantity", String(selectedItem.stockQuantity) || "");
    formData.append("price", String(selectedItem.price) || "");
    formData.append("threshold", String(selectedItem.threshold) || "");
    formData.append("productCategory.id", String(selectedCategory) || "");

    formData.append("description", selectedItem.description || "");
    formData.append("id", String(selectedItem.id) || "");

    try {
      const response = await dispatch(
        productForm({ userCredentials: formData })
      );

      if (response.payload) {
        const updatedProductDetails = productDetails.map((product) =>
          product.id === selectedItem.id ? selectedItem : product
        );
        console.log(selectedItem);
        setProductDetails(updatedProductDetails);
        dispatch(
          addSnackbar({
            id: "attributeSuccess",
            type: "success",
            message: "Product edited successfully!",
          })
        );
        setIsModalOpen(false);
      }
    } catch (error) {
      dispatch(
        addSnackbar({
          id: "error",
          type: "error",
          message: "Error in editing the product!",
        })
      );
    }
  };

  //delete product api call
  const handleDeleteProduct = async (productId: number) => {
    try {
      const result = await dispatch(deleteProduct(productId));
      if (deleteProduct.fulfilled.match(result)) {
        setShopCategory((prevState) =>
          prevState.filter((product) => product.id !== productId)
        );
        dispatch(
          addSnackbar({
            id: "attributeSuccess",
            type: "success",
            message: "Product deleted successfully!",
          })
        );

        setTimeout(() => {
          navigate("/table");
        }, 2000);
      }
    } catch (error) {
      dispatch(
        addSnackbar({
          id: "error",
          type: "error",
          message: "Error deleting product!",
        })
      );
    }
  };
  return (
    <Productdetails>
      <ProductDetailsContentHolder>
        <ProductDetailsComponent>
          <ProductList>
            <DisplayProductsHolder>
              <ProductDetailsContainer>
                <ProdDetailsHolder>
                  <ProdTextHolders>
                    <ProdDetailsHeaderText>Product Name</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>Barcode</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>
                      Stock Quantity
                    </ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>ThresHold</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>
                      Product Category
                    </ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>Price</ProdDetailsHeaderText>
                  </ProdTextHolders>
                  {productDetails.map((product: any, index: any) => (
                    <>
                      <ProdTextHolders key={index}>
                        <InformationOfProduct>
                          {product.name}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {product.barcode}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {product.stockQuantity}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {product.threshold}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {product.productCategory.name}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {product.price}
                        </InformationOfProduct>
                      </ProdTextHolders>
                      <ButtonsHolder>
                        <EditButtonContainer
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </EditButtonContainer>
                        <DeleteIcon
                          style={{
                            color: "#1976d2",
                            textAlign: "center",
                            fontSize: "30px",
                            marginTop: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDeleteProduct(product.id)}
                        />
                      </ButtonsHolder>
                    </>
                  ))}
                </ProdDetailsHolder>
              </ProductDetailsContainer>
            </DisplayProductsHolder>
          </ProductList>
        </ProductDetailsComponent>
        <ProductAttributes />
        <ProductImages />
      </ProductDetailsContentHolder>
      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        headerContent={
          <EditProductTableName>Edit Product</EditProductTableName>
        }
        bodyContent={
          <>
            <InputsOfProductTable>
              <ProductInputHold>
                <GenericInput
                  input_label="Name"
                  type="text"
                  value={selectedItem?.name || ""}
                  onChange={(e: any) => {
                    setSelectedItem({
                      ...selectedItem,
                      name: e.target.value,
                    });
                  }}
                />
              </ProductInputHold>
              <ProductInputHold>
                <GenericInput
                  input_label="Barcode"
                  value={selectedItem?.barcode || ""}
                  onChange={(e: any) => {
                    setSelectedItem({
                      ...selectedItem,
                      barcode: parseFloat(e.target.value),
                    });
                  }}
                />
              </ProductInputHold>
            </InputsOfProductTable>
            <InputsOfProductTable>
              <ProductInputHold>
                <GenericInput
                  input_label="Stock Quantity "
                  value={selectedItem?.stockQuantity || ""}
                  onChange={(e: any) => {
                    setSelectedItem({
                      ...selectedItem,
                      stockQuantity: parseFloat(e.target.value),
                    });
                  }}
                />
              </ProductInputHold>
              <ProductInputHold>
                <GenericInput
                  input_label="ThresHold "
                  value={selectedItem?.threshold || ""}
                  onChange={(e: any) => {
                    setSelectedItem({
                      ...selectedItem,
                      threshold: parseFloat(e.target.value),
                    });
                  }}
                />
              </ProductInputHold>
            </InputsOfProductTable>
            <InputsOfProductTable>
              <ProductInputHold>
                <CategoryLabel>Category</CategoryLabel>
                <DropdownOfProductCategory>
                  <StyledSelect
                    value={
                      selectedCategory !== null
                        ? selectedCategory.toString()
                        : ""
                    }
                    onChange={(e: any) =>
                      setSelectedCategory(Number(e.target.value))
                    }
                    marginTop="0px"
                  >
                    <SelectOption defaultValue="none">
                      Select an Option
                    </SelectOption>
                    {productCategory.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </StyledSelect>
                </DropdownOfProductCategory>
              </ProductInputHold>
              <ProductInputHold>
                <GenericInput
                  input_label="Price"
                  type="number"
                  value={selectedItem?.price || ""}
                  onChange={(e: any) => {
                    setSelectedItem({
                      ...selectedItem,
                      price: parseFloat(e.target.value),
                    });
                  }}
                />
              </ProductInputHold>
            </InputsOfProductTable>
          </>
        }
        footerContent={
          <GenericButton onClick={handleSaveProduct} name="Save" />
        }
      />
      <SnackBarList />
    </Productdetails>
  );
};

export default ProductDetails;
