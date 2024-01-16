import { FC, ReactNode } from "react";

//style
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PopupCloseButton,
} from "./style/Popup.style";

//components
import GenericButton from "Components/GenericButton/GenericButton.component";

type popupProps = {
  isOpen?: boolean;
  onClose?: any;
  headerContent?: ReactNode;
  bodyContent?: ReactNode;
  footerContent?: ReactNode;
};
const Popup: FC<popupProps> = ({
  isOpen,
  onClose,
  headerContent,
  bodyContent,
  footerContent,
}) => {
  if (!isOpen) return null;
  return (
    <ModalOverlay>
      <Modal>
        <ModalHeader>{headerContent}</ModalHeader>
        <ModalBody>{bodyContent}</ModalBody>
        <ModalFooter>
          {footerContent}
          <PopupCloseButton>
            <GenericButton onClick={onClose} name="Close" />
          </PopupCloseButton>
        </ModalFooter>
      </Modal>
    </ModalOverlay>
  );
};

export default Popup;
