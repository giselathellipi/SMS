import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router";

//style
import {
  CategoryName,
  ItemHandler,
  PopularDiv,
  PopularItem,
} from "./style/Popular.style";

//components
import Item from "Components/Item/Item.component";
import SnackBarList from "Components/SnackbarList/SnackbarList.component";

//redux
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import {
  ProductProps,
  fetchProductsCategory,
} from "redux/Pages/ProductCategory/ProductCategorySlice";
import { addSnackbar } from "redux/actions/actions-snackbar";


const Popular: FC<{}> = () => {
  const navigate = useNavigate();
  const [productCategory, setProductCategory] = useState<ProductProps[]>([]);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsCategory())
      .then((result: any) => {
        if (fetchProductsCategory.fulfilled.match(result)) {
          setProductCategory(result.payload);
        } else {
          dispatch(
            addSnackbar({
              id: "info",
              type: "info",
              message: "Product details not found!",
            })
          );
        }
      })
      .catch((error: any) => {
        dispatch(
          addSnackbar({
            id: "error",
            type: "error",
            message: "Error fetching Product details!",
          })
        );
      });
  }, [dispatch]);

  console.log("productCategory", productCategory);

  const handleProductCategoryClick = (item: ProductProps) => {
    console.log(item.id);
    navigate(`/shopcategory/${item.id}`);
  };

  return (
    <>
      <PopularDiv>
        <PopularItem>
          {productCategory.map((item: any, index: any) => {
            return (
              <ItemHandler
                key={index}
                onClick={() => handleProductCategoryClick(item)}
              >
                <Item id={item.id} name={item.name} image={item.image} />
                <CategoryName>{item.name}</CategoryName>
              </ItemHandler>
            );
          })}
        </PopularItem>
        <SnackBarList />
      </PopularDiv>
    </>
  );
};

export default Popular;
