import styled from "styled-components";

//mui-icons
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const OpeningPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background: linear-gradient(180deg, #fde1ff, #e1ffea22 60%);
`;

export const OpeningPageLeft = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding-left: 85px;
  line-height: 1.1;
`;
export const Heading = styled.h2`
  color: #090909;
  font-size: 26px;
  font-weight: 600;
`;
export const DIV = styled.div``;
export const HandIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const ParagNew = styled.p`
  color: #171717;
  font-size: 90px;
  font-weight: 700;
`;
export const ImageHolder = styled.img`
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 440px;
  border-radius: 60px;
  display: none;
`;
export const OpeningPageLatest = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 292px;
  height: 67px;
  border-radius: 75px;
  margin-top: 30px;
  background-color: #ff4141;
  color: white;
  font-size: 22px;
  font-weight: 500;
  outline: none;
  border: transparent;
  cursor: pointer;
`;
export const LatestCollection = styled.div``;
export const OpeningPageRight = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const ArrowIcon = styled(ArrowForwardIcon)``;
