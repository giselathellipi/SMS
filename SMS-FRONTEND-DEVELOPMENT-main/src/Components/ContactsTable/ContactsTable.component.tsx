import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//mui icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ForwardIcon from "@mui/icons-material/Forward";

//style
import {
  AddNewProductContactsButton,
  ContactsAddProductNameContainerPlusIcon,
  ContactsButtonName,
  ContactsTH,
  ContactsTableContainer,
  ContactsTableHead,
  ContactsTableHolder,
  ContactsTableRow,
  ContactTable,
  ContactsTableBody,
  ContactsTableCell,
} from "./style/ContactsTable.style";

//redux
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import { ContactProps, fetchContacts } from "redux/Pages/Contact/ContactSlice";
import { addSnackbar } from "redux/actions/actions-snackbar";

//components
import GenericButton from "Components/GenericButton/GenericButton.component";
import SnackBarList from "Components/SnackbarList/SnackbarList.component";

const ContactsTable: FC<{}> = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<ContactProps[]>([]);
  console.log(contacts);

  const dispatch: AppDispatch = useDispatch();

  //get all vendors api call
  useEffect(() => {
    dispatch(fetchContacts())
      .then((result: any) => {
        if (fetchContacts.fulfilled.match(result)) {
          setContacts(result.payload);
        } else {
          console.error("Contact details not found.");
        }
      })
      .catch((error: any) => {
        dispatch(
          addSnackbar({
            id: "error",
            type: "error",
            message: "Error fetching contact details!",
          })
        );
      });
  }, [dispatch]);

  const contactButtonName = (
    <ContactsAddProductNameContainerPlusIcon>
      <AddCircleOutlineIcon />
      <ContactsButtonName>New Contact</ContactsButtonName>
    </ContactsAddProductNameContainerPlusIcon>
  );
  const handleGoToLinkClick = (contact: ContactProps) => {
    console.log(contact);
    navigate(`/contactDetails/${contact.id}`);
  };

  return (
    <>
      <ContactsTableHolder>
        <AddNewProductContactsButton>
          <GenericButton
            name={contactButtonName}
            onClick={() => navigate("/contacts")}
          />
        </AddNewProductContactsButton>
        <ContactsTableContainer>
          <ContactTable>
            <ContactsTableHead>
              <ContactsTableRow>
                <ContactsTH>FirstName</ContactsTH>
                <ContactsTH>LastName</ContactsTH>
                <ContactsTH>Phone Number</ContactsTH>
                <ContactsTH>Fax</ContactsTH>
                <ContactsTH>Email</ContactsTH>
                <ContactsTH>Account</ContactsTH>
                <ContactsTH>BirthDate</ContactsTH>
                <ContactsTH>Lead Source</ContactsTH>
                <ContactsTH>Description</ContactsTH>
                <ContactsTH>Street</ContactsTH>
                <ContactsTH>City</ContactsTH>
                <ContactsTH>State</ContactsTH>
                <ContactsTH>Postal Code</ContactsTH>
                <ContactsTH>Country</ContactsTH>
                <ContactsTH>Actions</ContactsTH>
              </ContactsTableRow>
            </ContactsTableHead>
            <ContactsTableBody>
              {contacts.map((contacts: any, index: any) => (
                <ContactsTableRow key={index}>
                  <ContactsTableCell>{contacts.firstName}</ContactsTableCell>
                  <ContactsTableCell>{contacts.lastName}</ContactsTableCell>
                  <ContactsTableCell>{contacts.phone}</ContactsTableCell>
                  <ContactsTableCell>{contacts.fax}</ContactsTableCell>
                  <ContactsTableCell>{contacts.email}</ContactsTableCell>
                  <ContactsTableCell>
                    {contacts.account.accountName}
                  </ContactsTableCell>
                  <ContactsTableCell>{contacts.birthdate}</ContactsTableCell>
                  <ContactsTableCell>
                    {contacts.leadSource.name}
                  </ContactsTableCell>
                  <ContactsTableCell>{contacts.description}</ContactsTableCell>
                  <ContactsTableCell>
                    {contacts.address.street}
                  </ContactsTableCell>
                  <ContactsTableCell>{contacts.address.city}</ContactsTableCell>
                  <ContactsTableCell>
                    {contacts.address.state}
                  </ContactsTableCell>
                  <ContactsTableCell>
                    {contacts.address.postalCode}
                  </ContactsTableCell>
                  <ContactsTableCell>
                    {contacts.address.country}
                  </ContactsTableCell>
                  <ContactsTableCell>
                    <ForwardIcon
                      color="primary"
                      fontSize="large"
                      onClick={() => handleGoToLinkClick(contacts)}
                      style={{ cursor: "pointer" }}
                    />
                  </ContactsTableCell>
                </ContactsTableRow>
              ))}
            </ContactsTableBody>
          </ContactTable>
        </ContactsTableContainer>
      </ContactsTableHolder>
      <SnackBarList />
    </>
  );
};

export default ContactsTable;
