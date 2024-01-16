import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//redux
import { useDispatch } from "react-redux";
import {
  ProductImage,
  fetchImageCategory,
} from "redux/Pages/ImageCategory/ImageCategorySlice";
import { AppDispatch } from "redux/store";
import {
  ProductDetailss,
  fetchProductDetails,
} from "redux/Pages/Product/ProductSlice";

//style
import {
  AddToCartButton,
  AddToCartHolder,
  AttributeText,
  AttributeValue,
  AttributesHolder,
  AvailabilityInStore,
  AvailabilityInStoreContainer,
  DetailContainer,
  Holder,
  Image,
  ImageContainer,
  PriceDiv,
  PriceParag,
  PriceText,
  ProductContainer,
  ProductDetailsHolder,
  ProductName,
  StockQuantity,
} from "./style/Product.style";

const Product: FC<{}> = () => {
  const [image, setImage] = useState<ProductImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductDetailss[]>([]);

  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();
  const productId = id ? parseInt(id) : 0;
  console.log(productId);
  useEffect(() => {
    const fetchImage = () => {
      if (productId) {
        console.log(productId);
        dispatch(fetchImageCategory(productId))
          .then((result: any) => {
            console.log(result);
            if (fetchImageCategory.fulfilled.match(result)) {
              setImage(result.payload);
            } else if (fetchImageCategory.rejected.match(result)) {
              setError("Error fetching images. Please try again later!");
            }
          })
          .catch((error: any) => {
            console.error("Error fetching images:", error);
            setError("Error fetching images. Please try again later!");
          });
      } else {
        setError("Product ID not available.");
      }
    };

    fetchImage();
  }, [dispatch, productId]);

  //get product api
  useEffect(() => {
    const fetchProduct = () => {
      if (productId) {
        console.log(productId);
        dispatch(fetchProductDetails(productId))
          .then((result: any) => {
            console.log(result);
            if (fetchProductDetails.fulfilled.match(result)) {
              setProduct(result.payload);
            } else if (fetchProductDetails.rejected.match(result)) {
              setError("Error fetching product details");
            }
          })
          .catch((error: any) => {
            console.error("Error fetching  product details:", error);
            setError(
              "Error fetching  product details. Please try again later!"
            );
          });
      } else {
        setError("Product ID not available.");
      }
    };

    fetchProduct();
  }, [dispatch, productId]);
  return (
    <Holder>
      <ProductContainer>
        {image.map((item: any, index: any) => {
          return (
            <ImageContainer key={index}>
              <Image
                id={item.id}
                src={`data:image/jpeg;base64,${item.image}`}
              />
            </ImageContainer>
          );
        })}
      </ProductContainer>
      <ProductDetailsHolder>
        {product.map((prod: any, i: any) => {
          return (
            <DetailContainer key={i}>
              <ProductName>{prod.name}</ProductName>
              <PriceParag>{prod.description}</PriceParag>

              <AvailabilityInStoreContainer>
                <AvailabilityInStore>
                  Availability in store:
                </AvailabilityInStore>
                <StockQuantity>{prod.stockQuantity}</StockQuantity>
              </AvailabilityInStoreContainer>
              {prod.attributes.map((attr: any, attrIndex: number) => (
                <AttributesHolder key={attrIndex}>
                  <AttributeText>{attr.attributeName}:</AttributeText>
                  <AttributeValue>{attr.attributeValue}</AttributeValue>
                </AttributesHolder>
              ))}
              <PriceDiv>
                <PriceText>Price:</PriceText>
                <PriceParag>{prod.price} $</PriceParag>
              </PriceDiv>
            </DetailContainer>
          );
        })}

        <AddToCartHolder>
          <AddToCartButton>Add to cart</AddToCartButton>
        </AddToCartHolder>
      </ProductDetailsHolder>
    </Holder>
  );
};

export default Product;
