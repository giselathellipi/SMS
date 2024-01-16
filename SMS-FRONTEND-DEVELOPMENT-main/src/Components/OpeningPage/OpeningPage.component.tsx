import { FC } from "react";
import { useNavigate } from "react-router-dom";

//style
import {
  ArrowIcon,
  DIV,
  ImageHolder,
  LatestCollection,
  OpeningPageContainer,
  OpeningPageLatest,
  OpeningPageLeft,
  OpeningPageRight,
  ParagNew,
} from "./style/OpeningPage.style";

const OpeningPage: FC<{}> = () => {
  
  const navigate = useNavigate();
  const OnlineShopping = require("./assets/OnlineShopping.jpg") as string;

  return (
    <>
      <OpeningPageContainer>
        <OpeningPageLeft>
          <DIV>
            <ParagNew>STORE</ParagNew>
            <ParagNew>MANAGEMENT</ParagNew>
            <ParagNew>SYSTEM</ParagNew>
          </DIV>
          <OpeningPageLatest onClick={() => navigate("/home")}>
            <LatestCollection>Our Products</LatestCollection>
            <ArrowIcon />
          </OpeningPageLatest>
        </OpeningPageLeft>
        <OpeningPageRight>
          <ImageHolder src={OnlineShopping} alt="online-shop" />
        </OpeningPageRight>
      </OpeningPageContainer>
    </>
  );
};

export default OpeningPage;
