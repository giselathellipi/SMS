import { FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

//style
import {
  ItemContainer,
  ItemContainerHolder,
  ShopCategoryProducts,
} from "./style/ShopCategory.style";

//components
import Item from "Components/Item/Item.component";

//redux
import {
  ShopCategoryProductProps,
  fetchShopProductCategory,
} from "redux/Pages/ShopCategory/ShopCategorySlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";

const ShopCategory: FC<{}> = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const categoryIdAsNumber = categoryId ? parseInt(categoryId, 10) : null;
  const [shopCategory, setShopCategory] = useState<ShopCategoryProductProps[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  const dispatch: AppDispatch = useDispatch();

  //get product category
  useEffect(() => {
    const fetchData = () => {
      if (categoryIdAsNumber !== null && !isNaN(categoryIdAsNumber)) {
        dispatch(fetchShopProductCategory(categoryIdAsNumber))
          .then((result: any) => {
            console.log("result", result);
            if (fetchShopProductCategory.fulfilled.match(result)) {
              setShopCategory(result.payload);
            } else if (fetchShopProductCategory.rejected.match(result)) {
              setError("Error fetching product names. Please try again later!");
            }
          })
          .catch((error: any) => {
            console.error("Error fetching product names:", error);
            setError("Error fetching product names. Please try again later!");
          });
      } else {
        setError("User ID not available.");
      }
    };

    fetchData();
  }, [dispatch, categoryIdAsNumber]);

  const handleProductClick = (item: ShopCategoryProductProps) => {
    console.log(item.id);
    navigate(`/product/${item.id}`);
  };

  return (
    <div>
      <ShopCategoryProducts>
        {shopCategory.map((item: any, index: any) => {
          return (
            <ItemContainerHolder key={index}>
              <ItemContainer onClick={() => handleProductClick(item)}>
                <Item
                  id={item.id}
                  image={item.primaryImage}
                  price={item.price}
                  description={item.name}
                />
              </ItemContainer>
            </ItemContainerHolder>
          );
        })}
      </ShopCategoryProducts>
    </div>
  );
};

export default ShopCategory;
