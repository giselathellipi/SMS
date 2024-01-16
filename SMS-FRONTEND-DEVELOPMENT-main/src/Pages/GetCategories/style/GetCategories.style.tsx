import styled from "styled-components";

export const CategoriesTableHolder = styled.div`
  width: 100%;
  height: 700px;
`;
export const CategoryTableAndModalHolder = styled.div`
  width: 100%;
`;
export const CategoryTableContainer = styled.div`
  width: 100%;
  height: 700px;
  justify-content: center;
  align-items: center;
  margin: auto;
  overflow-x: auto;
  position: relative;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

export const CategoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeadOfCategory = styled.thead`
  background-color: #cfdeff;
  position: sticky;
  font-family: "Poppins";
  white-space: nowrap;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const CategoryTableRow = styled.tr`
  &:nth-child(even) {
  }
`;

export const TableHead = styled.th`
  border: 1px solid #3746673b;
  text-align: center;
  padding: 6px;
  font-family: "Poppins";
  font-size: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const Tablebody = styled.tbody``;
export const TableCellOfCategory = styled.td`
  border: 1px solid #3746673b;
  text-align: center;
  padding: 6px;
  font-family: "Poppins";
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const CategoryEditButton = styled.button`
  background-color: #3746673b;
  border-radius: 5px;
  color: Black;
  border: none;
  font-weight: 500;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  font-family: "Poppins";
  display: inline-block;
  font-size: 15px;
  margin: 4px 2px;
  cursor: pointer;
`;
export const Imagecategory = styled.img`
  width: 117px;
  height: 110px;
`;
export const AddNewCategoryButton = styled.div`
  height: fit-content;
  margin: 10px;
`;
export const AddCategoryNameContainerPlusIcon = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export const CategoryButtonName = styled.p`
  margin: 5px;
`;
export const InputsOfCategoriesPopup=styled.div``
export const CategoryInputHolder = styled.div`
  flex: 1;
  margin: 5px;
`;