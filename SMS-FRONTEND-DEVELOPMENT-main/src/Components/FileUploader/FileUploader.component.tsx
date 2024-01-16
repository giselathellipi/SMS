import { FC, useState, ChangeEvent } from "react";

//mui-icons
import AttachFileIcon from "@mui/icons-material/AttachFile";

//style
import {
  AddFileText,
  AttachInput,
  AttachmentInputHolder,
  AttachmentLabel,
  AttachmentUploadButton,
  AttachmentUploadButtonImgDiv,
  FileNameAndFileRemoveButtonHolder,
  FileUploadDoneButton,
  FileUploaderContainer,
  UploadedFileName,
  UploadedFileRemoveButton,
  UploadedFiles,
} from "./style/FileUploader.style";

export interface File {
  name: string;
}
interface FileUploaderProps {
  setAttachments: React.Dispatch<React.SetStateAction<File[]>>;
  closeFileUploader: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileUploader: FC<FileUploaderProps> = (props) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDone = () => {
    props.setAttachments(files);
    props.closeFileUploader(false);
  };

  let displayFiles;
  const fileUpload = new DataTransfer();

  if (files.length > 0) {
    displayFiles = files.map((f, index) => {
      const handleSingleFileDelete = () => {
        setFiles(files.filter((a) => a !== f));
        const attachmentInput =
          document.querySelector<HTMLInputElement>("#attachment");
        if (attachmentInput) {
          attachmentInput.files = fileUpload.files;
        }
      };
      return (
        <FileNameAndFileRemoveButtonHolder key={index}>
          <UploadedFileName>{f.name}</UploadedFileName>
          <UploadedFileRemoveButton onClick={handleSingleFileDelete}>
            Remove
          </UploadedFileRemoveButton>
        </FileNameAndFileRemoveButtonHolder>
      );
    });
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      fileUpload.items.add(fileList[0]);
      setFiles((files) => [...files, { name: fileList[0].name }]);
    }
  };

  return (
    <FileUploaderContainer>
      <UploadedFiles>{displayFiles}</UploadedFiles>
      <AttachmentInputHolder>
        <AttachmentLabel htmlFor="attachment">
          <AttachmentUploadButton>
            <AttachmentUploadButtonImgDiv>
              <AttachFileIcon />
            </AttachmentUploadButtonImgDiv>
            <AddFileText>Add File</AddFileText>
          </AttachmentUploadButton>
        </AttachmentLabel>
        <AttachInput id="attachment" type="file" onChange={handleFileChange} />
      </AttachmentInputHolder>
      <FileUploadDoneButton onClick={onDone}>Done</FileUploadDoneButton>
    </FileUploaderContainer>
  );
};

export default FileUploader;
