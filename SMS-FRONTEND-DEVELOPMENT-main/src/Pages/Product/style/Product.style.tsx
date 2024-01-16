import styled from "styled-components";
export const Holder = styled.div`
  display: flex;
  height: 100%;
  margin: auto;
  justify-content: center;
  align-items: center;
`;
export const ProductContainer = styled.div`
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  height: 360px;
`;
export const ImageContainer = styled.div`
  flex: 1;
  cursor: pointer;
  margin: 0 20px;
  padding: 0;
`;
export const Image = styled.img`
  width: 350px;
  height: 350px;
`;
export const ProductDetailsHolder = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 850px;
  height: 360px;
`;
export const DetailContainer = styled.div`
  flex: 1;
`;

export const ProductName = styled.h2`
  font-family: "Poppins";
`;
export const AvailabilityInStoreContainer = styled.div`
  display: flex;
`;
export const AvailabilityInStore = styled.p`
  font-family: "Poppins";
  font-weight: 600;
`;
export const StockQuantity = styled.p`
  margin-left: 7px;
`;
export const AddToCartHolder = styled.div`
  flex: 1;
`;
export const AddToCartButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins";
  gap: 15px;
  width: 241px;
  height: 55px;
  border-radius: 10px;
  margin-top: 40px;
  background-color: #ff4141;
  color: white;
  font-size: 20px;
  font-weight: 500;
  outline: none;
  border: transparent;
  cursor: pointer;
`;
export const AttributesHolder = styled.div`
  display: flex;
`;
export const AttributeText = styled.p`
  font-family: "Poppins";
  font-weight: 600;
`;
export const AttributeValue = styled.p`
  font-family: "Poppins";
  padding-left: 7px;
`;
export const PriceDiv = styled.div`
  display: flex;
`;
export const PriceText = styled.p`
  font-family: "Poppins";
  font-weight: 600;
`;
export const PriceParag = styled.p`
  font-family: "Poppins";
  margin-left: 7px;
`;
