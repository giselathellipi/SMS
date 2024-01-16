import styled from "styled-components";

export const LeadSourceContentHoder = styled.div`
  width: 100%;
  max-width: 650px;
  margin: auto;
  height: 80vh;
`;

export const InputsLeadSourceContainer = styled.div`
  display: flex;
`;

export const GenericLeadSourceInputHold = styled.div`
  flex: 1;
  margin: 5px;
`;

export const LeadSourceShipingAddressFormHolder = styled.div`
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
export const LeadSourceBillingAddressFormHolder = styled.div`
  width: 100%;
  max-width: 550px;
  margin: auto;
`;
