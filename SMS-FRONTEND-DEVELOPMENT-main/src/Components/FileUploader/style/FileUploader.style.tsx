import styled from "styled-components";

export const FileUploaderContainer = styled.div`
  border: 1px dashed black;
  border-radius: 10px;
  padding: 10px;
`;
export const UploadedFiles = styled.div``;
export const AttachmentInputHolder = styled.div`
  margin-top: 5px;
`;

export const AttachmentLabel = styled.label``;
export const AttachmentUploadButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: #0e53c5;
  border-radius: 10px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  max-width: 100px;
  &:hover {
    cursor: pointer;
  }
`;
export const AttachmentUploadButtonImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const AddFileText = styled.div``;
export const AttachInput = styled.input`
  display: none;
`;
export const FileUploadDoneButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: #0e53c5;
  border-radius: 10px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  max-width: 100px;
  margin-left: 70%;
  &:hover {
    cursor: pointer;
  }
`;
export const UploadedFileRemoveButton = styled.div`
  &:hover {
    cursor: pointer;
    color: blue;
  }
`;
export const UploadedFileName = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 200px;
`;
export const FileNameAndFileRemoveButtonHolder = styled.div`
  background-color: #e5f7fc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  font-size: 14px;
`;
