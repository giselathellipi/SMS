import styled from "styled-components";

export const EditPhotoContainer = styled.div`
  position: relative;
  max-width: 205px;
  margin: 20px auto;
`;
export const PhotoEdit = styled.div`
  position: absolute;
  right: 12px;
  z-index: 1;
  top: 10px;
`;
export const InputHold = styled.input`
  display: none;
`;
export const PhotoPreview = styled.div`
  width: 192px;
  height: 192px;
  position: relative;
  border-radius: 100%;
  border: 6px solid #f8f8f8;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  & > div {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: c;
  }
`;
export const Preview = styled.div``;
