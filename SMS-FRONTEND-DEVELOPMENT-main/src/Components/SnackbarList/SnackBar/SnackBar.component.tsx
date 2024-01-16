import { FC, useEffect } from "react";

//mui-icons
import CloseIcon from "@mui/icons-material/Close";

//style
import { CloseButton, MessageBox, SnackBarCard } from "./style/SnackBar.style";

export interface SnackBarProps {
  id?: number | string;
  message?: string;
  type?: string;
  onSnackClose?: (id: string | number) => void;
}

const SnackBar: FC<SnackBarProps> = ({ id, message, type, onSnackClose }) => {
  const snackCloseHandler = (id: number | string) => {
    if (onSnackClose === undefined) return;
    onSnackClose(id);
  };

  useEffect(() => {
    if (onSnackClose === undefined) return;
    const timerID = setTimeout(() => onSnackClose(id || ""), 6000); // Handle undefined by using a default value or some appropriate logic
    return () => clearTimeout(timerID);
  }, [id, onSnackClose]);

  return (
    <>
      <SnackBarCard type={type}>
        <MessageBox>{message}</MessageBox>
        <CloseButton onClick={() => snackCloseHandler(id || "")}>
          <CloseIcon />
        </CloseButton>
      </SnackBarCard>
    </>
  );
};

export default SnackBar;
