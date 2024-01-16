import styled from "styled-components";

export const ProductImageContentHolder = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const ImagesHolder = styled.div`
  width: 100%;
  max-width: 750px;
  box-shadow: 3px 3px 15px 5px rgb(0 0 0 / 15%);
  border-radius: 10px;
  background-color: #ffff;
  overflow: scroll;
  height: 220px;
  overflow-x: auto;
  position: relative;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
export const ImagesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;
export const ProductImagesTableHead = styled.thead`
  text-align: left;
`;
export const ImagesHead = styled.th`
  border-bottom: 1px solid #ccc;
  padding: 8px;
`;
export const ImageTableBody = styled.tbody`
  text-align: left;
`;
export const ImageTableRow = styled.tr``;
export const ImageTableData = styled.td`
  border-bottom: 1px solid #ccc;
  padding: 8px;
`;
export const ImageDeleteIconHolder = styled.div`
  font-size: 30px;
  text-align: left;
  cursor: pointer;
`;
export const UploadImageButton = styled.button`
   display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10px;
  background-color: #0e53c5;
  border: 1px solid #0e53c5;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  height: 45px;
  gap: 5px;
  position: relative;
  width: 22%;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0;
`;
