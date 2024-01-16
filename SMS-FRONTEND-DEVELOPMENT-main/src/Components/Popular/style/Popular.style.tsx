import styled from "styled-components";

export const PopularDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: auto;
  height: calc(100vh - 281px);
  width: 100%;
  overflow-y: auto;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const PopularText = styled.h1`
  color: #171717;
  font-size: 45px;
  font-weight: 400;
  font-family: "Poppins";
`;
export const Hr = styled.hr`
  width: 200px;
  height: 6px;
  border-radius: 10px;
  background-color: #171717;
`;
export const PopularItem = styled.div`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  gap: 30px;
  justify-content: center;
`;
export const ItemHandler = styled.div`
  flex: 0 0 calc(25% - 20px); 
  margin-bottom: 30px;
  @media (max-width: 1100px) {
    flex: 0 0 calc(33.33% - 20px);
  }
  @media (max-width: 800px) {
    flex: 0 0 calc(50% - 20px); 
  }
  @media (max-width: 600px) {
    flex: 0 0 calc(100% - 20px); /* One item per row for mobile */
  }
`;
export const CategoryName = styled.p`
  font-size: 17px;
  font-family: "Poppins";
  font-weight: 600;
`;
