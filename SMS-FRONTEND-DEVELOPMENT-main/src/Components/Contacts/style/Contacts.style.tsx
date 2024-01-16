import styled from "styled-components";

export const ContactsFormContentHoder = styled.div`
  width: 100%;
  max-width: 650px;
  margin: auto;
  height: 80vh;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const InputsOfContactFormContainer = styled.div`
  display: flex;
`;

export const GenericContactInputHold = styled.div`
  flex: 1;
  margin: 5px;
`;

export const ContactsAddressFormHolder = styled.div`
  width: 100%;
  max-width: 550px;
  margin: auto;
`;
