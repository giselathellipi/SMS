import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//style
import {
  DisplayVendorsHolder,
  EditButton,
  EditButtonHolder,
  EditText,
  EditVendorDetailsButtonNameContainer,
  IconEdit,
  VendorDetailsList,
  InformationOfVendor,
  HorizontalLine,
  TextHolders,
  VendorDetailsContainer,
  DetailsHolder,
  DetailsHeaderText,
  PopupInputsContainer,
  InputOfPopupHolder,
  PopupName,
  VendorDetailsComponent,
} from "./style/VendorDetails.style";

//redux
import {
  Vendor,
  fetchVendorsById,
  vendorForm,
} from "redux/Containers/VendorForm/VendorFormSlice";
import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addSnackbar } from "redux/actions/actions-snackbar";

//components
import Popup from "Components/Popup/Popup.component";
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import SnackBarList from "Components/SnackbarList/SnackbarList.component";

const VendorDetails: FC<{}> = () => {
  const [vendorsId, setVendorsId] = useState<Vendor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [paymentTerms, setPaymentTerms] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  console.log(contactName);
  const dispatch: AppDispatch = useDispatch();

  const { id } = useParams();
  const vendorId = id ? parseInt(id) : 0;

  //get userId from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);

  //get vendor by id
  useEffect(() => {
    if (vendorId) {
      dispatch(fetchVendorsById({ vendorId }))
        .then((result: any) => {
          if (fetchVendorsById.fulfilled.match(result)) {
            console.log(result.payload);
            setVendorsId(result.payload);
          } else {
            console.error("Apartment details not found.");
          }
        })
        .catch((error: any) => {
          dispatch(
            addSnackbar({
              id: "error",
              type: "error",
              message: "Error fetching apartment details!",
            })
          );
        });
    }
  }, [dispatch, vendorId]);

  //edit button click
  const handleEdit = (vendor: any) => {
    console.log(vendor);
    setIsModalOpen(true);
    setSelectedItem(vendor);
  };

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const updatedItem = {
        id: vendorId,
        companyName: companyName || selectedItem[0]?.companyName,
        email: email || selectedItem[0]?.email,
        phoneNumber: phoneNumber || selectedItem[0]?.phoneNumber,
        contactPersonName: contactName || selectedItem[0]?.contactPersonName,
        notes: notes || selectedItem[0]?.notes,
        paymentTerms: paymentTerms || selectedItem[0]?.paymentTerms,
        bankName: bankName || selectedItem[0]?.bankName,
        modifiedBy: {
          id: userId,
        },
      };

      await dispatch(vendorForm({ vendorCredentials: updatedItem }));

      const updatedVendorsId = vendorsId.map((vendor: any) => {
        if (vendor.id === selectedItem[0]?.id) {
          return updatedItem;
        }
        return vendor;
      });

      setVendorsId(updatedVendorsId);
      localStorage.setItem("vendorsData", JSON.stringify(updatedVendorsId));

      setCompanyName("");
      setEmail("");
      setContactName("");
      setNotes("");
      setPaymentTerms("");
      setPhoneNumber("");
      setBankName("");
      setIsModalOpen(false);
    } catch (error) {
      dispatch(
        addSnackbar({
          id: "error",
          type: "error",
          message: "Vendor edit failed!",
        })
      );
    }
  };

  const handleCompanyNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompanyName(event.target.value);

    if (selectedItem && selectedItem.length > 0) {
      const updatedItem = {
        ...selectedItem[0],
        companyName: event.target.value,
      };
      setSelectedItem([updatedItem]);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);

    if (selectedItem && selectedItem.length > 0) {
      const updatedItem = { ...selectedItem[0], email: event.target.value };
      setSelectedItem([updatedItem]);
    }
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);

    if (selectedItem && selectedItem.length > 0) {
      const updatedItem = {
        ...selectedItem[0],
        phoneNumber: event.target.value,
      };
      setSelectedItem([updatedItem]);
    }
  };

  const handlePersonNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContactName(event.target.value);

    if (selectedItem && selectedItem.length > 0) {
      const updatedItem = {
        ...selectedItem[0],
        contactPersonName: event.target.value,
      };
      setSelectedItem([updatedItem]);
    }
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(event.target.value);

    if (selectedItem && selectedItem.length > 0) {
      const updatedItem = {
        ...selectedItem[0],
        notes: event.target.value,
      };
      setSelectedItem([updatedItem]);
    }
  };

  const handlePaymentTermsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentTerms(event.target.value);

    if (selectedItem && selectedItem.length > 0) {
      const updatedItem = {
        ...selectedItem[0],
        paymentTerms: event.target.value,
      };
      setSelectedItem([updatedItem]);
    }
  };

  const handleBankNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBankName(event.target.value);

    if (selectedItem && selectedItem.length > 0) {
      const updatedItem = {
        ...selectedItem[0],
        bankName: event.target.value,
      };
      setSelectedItem([updatedItem]);
    }
  };
  return (
    <VendorDetailsComponent>
      {vendorsId && (
        <VendorDetailsList>
          <EditButtonHolder>
            <EditButton>
              <EditVendorDetailsButtonNameContainer
                onClick={() => handleEdit(vendorsId)}
              >
                <IconEdit />
                <EditText>Edit </EditText>
              </EditVendorDetailsButtonNameContainer>
            </EditButton>
          </EditButtonHolder>
          <DisplayVendorsHolder>
            <VendorDetailsContainer>
              <DetailsHolder>
                <TextHolders>
                  <DetailsHeaderText>Company Name</DetailsHeaderText>
                  <HorizontalLine />
                  <DetailsHeaderText>Email</DetailsHeaderText>
                  <HorizontalLine />
                  <DetailsHeaderText>Phone Number</DetailsHeaderText>
                  <HorizontalLine />
                  <DetailsHeaderText>Contact Name</DetailsHeaderText>
                  <HorizontalLine />
                  <DetailsHeaderText>Notes</DetailsHeaderText>
                  <HorizontalLine />
                  <DetailsHeaderText>Payment Terms</DetailsHeaderText>
                  <HorizontalLine />
                  <DetailsHeaderText>Bank Name</DetailsHeaderText>
                </TextHolders>

                {vendorsId.map((vendor: any, index: any) => (
                  <TextHolders key={index}>
                    <InformationOfVendor>
                      {vendor.companyName}
                    </InformationOfVendor>
                    <HorizontalLine />
                    <InformationOfVendor>{vendor.email}</InformationOfVendor>
                    <HorizontalLine />
                    <InformationOfVendor>
                      {vendor.phoneNumber}
                    </InformationOfVendor>
                    <HorizontalLine />
                    <InformationOfVendor>
                      {vendor.contactPersonName}
                    </InformationOfVendor>
                    <HorizontalLine />
                    <InformationOfVendor>{vendor.notes}</InformationOfVendor>
                    <HorizontalLine />
                    <InformationOfVendor>
                      {vendor.paymentTerms}
                    </InformationOfVendor>
                    <HorizontalLine />
                    <InformationOfVendor>{vendor.bankName}</InformationOfVendor>
                  </TextHolders>
                ))}
              </DetailsHolder>
            </VendorDetailsContainer>
          </DisplayVendorsHolder>
        </VendorDetailsList>
      )}
      {selectedItem && selectedItem.length > 0 && (
        <Popup
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          headerContent={<PopupName>Edit Vendor</PopupName>}
          bodyContent={
            <>
              {selectedItem && (
                <>
                  <PopupInputsContainer>
                    <InputOfPopupHolder>
                      <GenericInput
                        input_label="Company Name"
                        type="text"
                        value={selectedItem[0]?.companyName || ""}
                        onChange={handleCompanyNameChange}
                      />
                    </InputOfPopupHolder>
                    <InputOfPopupHolder>
                      <GenericInput
                        input_label="Email"
                        value={selectedItem[0]?.email || ""}
                        onChange={handleEmailChange}
                      />
                    </InputOfPopupHolder>
                  </PopupInputsContainer>
                  <PopupInputsContainer>
                    <InputOfPopupHolder>
                      <GenericInput
                        input_label="Phone Number"
                        value={selectedItem[0]?.phoneNumber || ""}
                        onChange={handlePhoneNumberChange}
                      />
                    </InputOfPopupHolder>
                    <InputOfPopupHolder>
                      <GenericInput
                        input_label="Contact Name"
                        value={selectedItem[0]?.contactPersonName || ""}
                        onChange={handlePersonNameChange}
                      />
                    </InputOfPopupHolder>
                  </PopupInputsContainer>
                  <PopupInputsContainer>
                    <InputOfPopupHolder>
                      <GenericInput
                        input_label="Notes"
                        type="text"
                        value={selectedItem[0]?.notes || ""}
                        onChange={handleNotesChange}
                      />
                    </InputOfPopupHolder>
                    <InputOfPopupHolder>
                      <GenericInput
                        input_label="Payment Terms"
                        type="text"
                        value={selectedItem[0]?.paymentTerms || ""}
                        onChange={handlePaymentTermsChange}
                      />
                    </InputOfPopupHolder>
                  </PopupInputsContainer>
                </>
              )}
              <PopupInputsContainer>
                <InputOfPopupHolder>
                  <GenericInput
                    input_label="Bank Name"
                    value={selectedItem[0]?.bankName || ""}
                    onChange={handleBankNameChange}
                  />
                </InputOfPopupHolder>
              </PopupInputsContainer>
            </>
          }
          footerContent={<GenericButton onClick={handleSave} name="Save" />}
        />
      )}
      <SnackBarList />
    </VendorDetailsComponent>
  );
};

export default VendorDetails;
