import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(50, 50, 50, 0.6);
  z-index: 10;
`;
export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px 3px 0px;
  position: fixed;
  background-color: #ffff;
  color: #ffffff;
  box-shadow: 0px 4px 20px rgba(25, 29, 58, 0.1);
  border-radius: 10px;
  width: 100%;
  max-width: 380px;
  /* height: 100%; */
  max-height: 500px;
  overflow-x: auto;
  position: relative;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  /* max-height: 824px; */
`;
export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #ffff;
  border-radius: 10px 10px 0px 0px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 23px;
  flex: none;
  order: 0;
  flex-grow: 0;
  text-align: center;
`;
export const ModalBody = styled.div`
  flex: 1;
  background-color: white;
`;

export const ModalFooter = styled.div`
  display: flex;
  width: 300px;
  align-items: center;
  justify-content: center;
  padding: 5px 0px 25px 0px;
`;
export const PopupCloseButton = styled.div`
  width: 100%;
  margin-left: 5px;
`;
