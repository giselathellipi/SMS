import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//style
import {
  AddNewProductButton,
  AddProductNameContainerPlusIcon,
  ButtonName,
  DropdownOfProductCategory,
  ProductImage,
  ProductsTableHolder,
  SelectOption,
  TH,
  Table,
  TableAndDatepickerHolder,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tbody,
} from "./style/ProductsTable.style";
import { StyledSelect } from "App/style/App.style";

//mui icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ForwardIcon from "@mui/icons-material/Forward";

//redux
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import {
  ProductProps,
  fetchProductsCategory,
} from "redux/Pages/ProductCategory/ProductCategorySlice";
import {
  ShopCategoryProductProps,
  fetchShopProductCategory,
} from "redux/Pages/ShopCategory/ShopCategorySlice";
import { addSnackbar } from "redux/actions/actions-snackbar";

//components
import GenericButton from "Components/GenericButton/GenericButton.component";
import SnackBarList from "Components/SnackbarList/SnackbarList.component";

const ProductsTable: FC<{}> = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [productCategory, setProductCategory] = useState<ProductProps[]>([]);
  const [shopCategory, setShopCategory] = useState<ShopCategoryProductProps[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const dispatch: AppDispatch = useDispatch();

  console.log("shop category", shopCategory);

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
        console.error("Error fetching product categories:", error);
        dispatch(
          addSnackbar({
            id: "error",
            type: "error",
            message: "Error fetching product categories.",
          })
        );
      });
  }, [dispatch]);
  console.log("productCategory", productCategory);

  //get product api
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCategory !== null) {
          const result = await dispatch(
            fetchShopProductCategory(selectedCategory)
          );
          if (fetchShopProductCategory.fulfilled.match(result)) {
            setShopCategory(result.payload);
          } else {
            setError("Error fetching products. Please try again later!");
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Please try again later!");
      }
    };

    fetchData();
  }, [dispatch, selectedCategory]);

  const handleGoToLinkClick = (product: ShopCategoryProductProps) => {
    console.log(product);
    navigate(`/productDetails/${product.id}`);
  };

  const buttonName = (
    <AddProductNameContainerPlusIcon>
      <AddCircleOutlineIcon />
      <ButtonName>Add product</ButtonName>
    </AddProductNameContainerPlusIcon>
  );

  return (
    <>
      <ProductsTableHolder>
        <AddNewProductButton>
          <GenericButton
            name={buttonName}
            onClick={() => navigate("/productForm")}
          />
        </AddNewProductButton>
        <TableAndDatepickerHolder>
          <DropdownOfProductCategory>
            <StyledSelect
              value={
                selectedCategory !== null ? selectedCategory.toString() : ""
              }
              onChange={(e: any) => setSelectedCategory(Number(e.target.value))}
            >
              <SelectOption defaultValue="none">Select an Option</SelectOption>
              {productCategory.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </StyledSelect>
          </DropdownOfProductCategory>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TH>Product Image</TH>
                  <TH>Name</TH>
                  <TH>Barcode</TH>
                  <TH>Stock Quantity</TH>
                  <TH>THresHold</TH>
                  <TH>Product Category</TH>
                  <TH>Price</TH>
                  <TH>Attribute Name</TH>
                  <TH>Attribute Value</TH>
                  <TH>Product Details</TH>
                </TableRow>
              </TableHead>
              <Tbody>
                {shopCategory.map((rental: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>
                      {rental.primaryImage && (
                        <ProductImage
                          src={`data:image/jpeg;base64,${rental.primaryImage}`}
                        />
                      )}
                    </TableCell>
                    <TableCell>{rental.name}</TableCell>
                    <TableCell>{rental.barcode}</TableCell>
                    <TableCell> {rental.stockQuantity} </TableCell>
                    <TableCell> {rental.threshold} </TableCell>
                    <TableCell> {rental.productCategory.name} </TableCell>
                    <TableCell> ${rental.price} </TableCell>
                    <TableCell>
                      {rental.attributes.map((attr: any, attrIndex: any) => (
                        <div key={attrIndex}>
                          <p>{attr.attributeName}</p>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {rental.attributes.map((attr: any, attrIndex: any) => (
                        <div key={attrIndex}>
                          <p>{attr.attributeValue}</p>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      <ForwardIcon
                        color="primary"
                        fontSize="large"
                        onClick={() => handleGoToLinkClick(rental)}
                        style={{ cursor: "pointer" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </TableAndDatepickerHolder>
      </ProductsTableHolder>
      <SnackBarList />
    </>
  );
};

export default ProductsTable;
