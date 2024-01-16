import { useNavigate, useParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";

//style
import {
  ButtonsHolder,
  DisplayProductsHolder,
  EditProductTableName,
  ProdDetailsHolder,
  ProdTextHolders,
  ProductDetailsComponent,
  ProductDetailsContentHolder,
  ProductList,
  Productdetails,
} from "Components/ProductDetails/style/ProductDetails.style";
import {
  InputsOfProductTable,
  ProductInputHold,
} from "Components/ProductsTable/style/ProductsTable.style";
import { LabelDescriptionContainer, StyledSelect } from "App/style/App.style";
import {
  ContactDetailsHeaderText,
  InformationOfContactsTable,
} from "./style/ContactDetails.style";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  ContactProps,
  addContact,
  deleteContact,
  fetchContactById,
  getLeadSource,
} from "redux/Pages/Contact/ContactSlice";
import { AppDispatch, RootState } from "redux/store";
import {
  AccountTypeProps,
  getAccountByType,
} from "redux/Pages/AccountType/AccountTypeSlice";

//mui icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

//components
import Popup from "Components/Popup/Popup.component";
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import { addSnackbar } from "redux/actions/actions-snackbar";
import SnackBarList from "Components/SnackbarList/SnackbarList.component";

const ContactDetails: FC<{}> = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<ContactProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [accountB2B, setAccountB2B] = useState<AccountTypeProps[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const [selectedLeadSource, setSelectedLeadSource] = useState<any>("");
  const [leadsource, setLeadSource] = useState<ContactProps[]>([]);

  const dispatch: AppDispatch = useDispatch();

  //get userRole from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);

  const { id } = useParams();
  const contactId = id ? parseInt(id) : 0;

  //get contacts by id
  useEffect(() => {
    const fetchContact = () => {
      if (contactId) {
        console.log(contactId);
        dispatch(fetchContactById(contactId))
          .then((result: any) => {
            if (fetchContactById.fulfilled.match(result)) {
              const fetchedContact = result.payload[0];
              setContacts(result.payload);
              setSelectedAccount(fetchedContact.account.id);
              setSelectedLeadSource(fetchedContact.leadSource.id);
              console.log(
                "fetchedContact.leadSource.id",
                fetchedContact.leadSource.id
              );
            }
          })
          .catch((error: any) => {
            dispatch(
              addSnackbar({
                id: "error",
                type: "error",
                message: "Error fetching  contact details!",
              })
            );
          });
      }
    };

    fetchContact();
  }, [dispatch, contactId]);

  const handleEdit = (contact: any) => {
    setIsModalOpen(true);
    setSelectedContact(contact);
  };

  //get all leads api call
  useEffect(() => {
    dispatch(getLeadSource())
      .then((result: any) => {
        if (getLeadSource.fulfilled.match(result)) {
          setLeadSource(result.payload);
        }
      })
      .catch((error: any) => {
        dispatch(
          addSnackbar({
            id: "error",
            type: "error",
            message: "Error fetching Lead Source details!",
          })
        );
      });
  }, [dispatch]);

  //delete contact
  const handleDeleteContacts = async (contactId: number) => {
    try {
      const result = await dispatch(deleteContact(contactId));
      if (deleteContact.fulfilled.match(result)) {
        setContacts((prevState) =>
          prevState.filter((contact) => contact.id !== contactId)
        );
        dispatch(
          addSnackbar({
            id: "attributeSuccess",
            type: "success",
            message: "Contact deleted successfully!",
          })
        );

        setTimeout(() => {
          navigate("/contactsTable");
        }, 2000);
      }
    } catch (error) {
      dispatch(
        addSnackbar({
          id: "error",
          type: "error",
          message: "Error deleting contact!",
        })
      );
    }
  };

  //get account B2B api
  useEffect(() => {
    const handleAccountB2B = async () => {
      try {
        const accountTypeCredentials = {
          type: "B2B",
        };
        const response = await dispatch(
          getAccountByType({ accountTypeCredentials })
        );

        if (getAccountByType.fulfilled.match(response)) {
          setAccountB2B([response.payload]);
        }
      } catch (error) {
        dispatch(
          addSnackbar({
            id: "error",
            type: "error",
            message: "Error on getting account B2B details!",
          })
        );
      }
    };
    handleAccountB2B();
  }, [dispatch]);

  //post request
  const handleUpdateContactClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const contactCredentials = {
        id: contactId,
        firstName: selectedContact.firstName,
        lastName: selectedContact.lastName,
        phone: selectedContact.phone,
        fax: selectedContact.fax,
        email: selectedContact.email,
        birthdate: selectedContact.birthdate,
        account: {
          id: selectedAccount,
        },
        leadSource: {
          id: selectedLeadSource,
        },
        address: {
          street: selectedContact.address.street,
          city: selectedContact.address.city,
          state: selectedContact.address.state,
          postalCode: selectedContact.address.postalCode,
          country: selectedContact.address.country,
        },
        description: selectedContact.description,
        createdBy: {
          id: userId,
        },
        modifiedBy: {
          id: userId,
        },
      };
      const response = await dispatch(addContact({ contactCredentials }));

      if (addContact.fulfilled.match(response)) {
        const updatedContact = {
          ...selectedContact,
        };

        const updatedContacts = contacts.map((contact) =>
          contact.id === contactId ? updatedContact : contact
        );

        setContacts(updatedContacts);
        dispatch(
          addSnackbar({
            id: "attributeSuccess",
            type: "success",
            message: "Contact edited successfully!",
          })
        );
        setIsModalOpen(false);
      }
    } catch (error) {
      dispatch(
        addSnackbar({
          id: "error",
          type: "error",
          message: "Error in editing the contact!",
        })
      );
    }
  };

  const handleLeadSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLeadSource(e.target.value);
  };
  return (
    <>
      <Productdetails>
        <ProductDetailsContentHolder>
          <ProductDetailsComponent>
            <ProductList>
              <DisplayProductsHolder>
                <ProdDetailsHolder>
                  <ProdTextHolders>
                    <ContactDetailsHeaderText>Actions</ContactDetailsHeaderText>
                    <ContactDetailsHeaderText>
                      FirstName
                    </ContactDetailsHeaderText>
                    <ContactDetailsHeaderText>
                      LastName
                    </ContactDetailsHeaderText>
                    <ContactDetailsHeaderText>Phone</ContactDetailsHeaderText>
                    <ContactDetailsHeaderText>Fax</ContactDetailsHeaderText>
                    <ContactDetailsHeaderText>Email</ContactDetailsHeaderText>
                    <ContactDetailsHeaderText>Account</ContactDetailsHeaderText>
                    <ContactDetailsHeaderText>
                      Birthdate
                    </ContactDetailsHeaderText>
                    <ContactDetailsHeaderText>
                      Lead Source
                    </ContactDetailsHeaderText>
                    <ContactDetailsHeaderText>
                      Description
                    </ContactDetailsHeaderText>
                    <ContactDetailsHeaderText>Street</ContactDetailsHeaderText>
                    <ContactDetailsHeaderText>City</ContactDetailsHeaderText>
                    <ContactDetailsHeaderText>State</ContactDetailsHeaderText>
                    <ContactDetailsHeaderText>
                      Postal Code
                    </ContactDetailsHeaderText>
                    <ContactDetailsHeaderText>Country</ContactDetailsHeaderText>
                  </ProdTextHolders>
                  {contacts.map((contacts: any, index: number) => (
                    <ProdTextHolders key={index}>
                      <InformationOfContactsTable>
                        <ButtonsHolder>
                          <EditIcon
                            onClick={() => handleEdit(contacts)}
                            style={{
                              color: "#1976d2",
                              fontSize: "25px",
                              cursor: "pointer",
                            }}
                          >
                            Edit
                          </EditIcon>
                          <DeleteIcon
                            style={{
                              color: "#1976d2",
                              fontSize: "25px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleDeleteContacts(contacts.id)}
                          />
                        </ButtonsHolder>
                      </InformationOfContactsTable>
                      <InformationOfContactsTable>
                        {contacts.firstName}
                      </InformationOfContactsTable>
                      <InformationOfContactsTable>
                        {contacts.lastName}
                      </InformationOfContactsTable>
                      <InformationOfContactsTable>
                        {contacts.phone}
                      </InformationOfContactsTable>
                      <InformationOfContactsTable>
                        {contacts.fax}
                      </InformationOfContactsTable>
                      <InformationOfContactsTable>
                        {contacts.email}
                      </InformationOfContactsTable>
                      <InformationOfContactsTable>
                        {contacts.account.accountName}
                      </InformationOfContactsTable>
                      <InformationOfContactsTable>
                        {contacts.birthdate}
                      </InformationOfContactsTable>
                      <InformationOfContactsTable>
                        {contacts.leadSource.name}
                      </InformationOfContactsTable>
                      <InformationOfContactsTable>
                        {contacts.description}
                      </InformationOfContactsTable>
                      <InformationOfContactsTable>
                        {contacts.address.street}
                      </InformationOfContactsTable>
                      <InformationOfContactsTable>
                        {contacts.address.city}
                      </InformationOfContactsTable>
                      <InformationOfContactsTable>
                        {contacts.address.state}
                      </InformationOfContactsTable>
                      <InformationOfContactsTable>
                        {contacts.address.postalCode}
                      </InformationOfContactsTable>
                      <InformationOfContactsTable>
                        {contacts.address.country}
                      </InformationOfContactsTable>
                    </ProdTextHolders>
                  ))}
                </ProdDetailsHolder>
              </DisplayProductsHolder>
            </ProductList>
          </ProductDetailsComponent>
        </ProductDetailsContentHolder>
      </Productdetails>
      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedContact(null);
        }}
        headerContent={
          <EditProductTableName>Edit Contact</EditProductTableName>
        }
        bodyContent={
          <>
            <div>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="FirstName"
                    type="text"
                    value={selectedContact?.firstName || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        firstName: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="LastName"
                    value={selectedContact?.lastName || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        lastName: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>

              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Phone"
                    value={selectedContact?.phone || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        phone: parseFloat(e.target.value),
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="Fax"
                    value={selectedContact?.fax || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        fax: parseFloat(e.target.value),
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Email"
                    value={selectedContact?.email || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        email: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  {" "}
                  <LabelDescriptionContainer>Account</LabelDescriptionContainer>
                  <StyledSelect
                    value={
                      selectedAccount !== undefined && selectedAccount !== null
                        ? selectedAccount.toString()
                        : ""
                    }
                    onChange={(e: any) => {
                      const selectedAccountId = Number(e.target.value);
                      setSelectedAccount(selectedAccountId);
                    }}
                  >
                    <option value="none">Select an Option</option>
                    {accountB2B
                      .flat(1)
                      .filter((account: any) => account.accountType === "B2B")
                      .map((account: any, index: any) => (
                        <option key={index} value={account.accountId}>
                          {account.accountName}
                        </option>
                      ))}
                  </StyledSelect>
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                {" "}
                <ProductInputHold>
                  <GenericInput
                    input_label="Birthdate"
                    type="date"
                    value={selectedContact?.birthdate || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        birthdate: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <LabelDescriptionContainer>
                    Lead Source Name
                  </LabelDescriptionContainer>
                  <StyledSelect
                    value={selectedLeadSource}
                    onChange={handleLeadSourceChange}
                  >
                    <option value="none">Select an Option</option>
                    {leadsource.map((lead: any, index: any) => (
                      <option key={index} value={lead.id}>
                        {lead.name}
                      </option>
                    ))}
                  </StyledSelect>
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                {" "}
                <ProductInputHold>
                  <GenericInput
                    input_label="Description "
                    value={selectedContact?.description || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        description: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Street"
                    value={selectedContact?.address.street || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        address: {
                          ...selectedContact.address,
                          street: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="City "
                    value={selectedContact?.address.city || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        address: {
                          ...selectedContact.address,
                          city: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="State"
                    value={selectedContact?.address.state || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        address: {
                          ...selectedContact.address,
                          state: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="Postal Code "
                    value={selectedContact?.address.postalCode || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        address: {
                          ...selectedContact.address,
                          postalCode: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Country"
                    value={selectedContact?.address.country || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        address: {
                          ...selectedContact.address,
                          country: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
            </div>
          </>
        }
        footerContent={
          <GenericButton onClick={handleUpdateContactClick} name="Save" />
        }
      />
      <SnackBarList />
    </>
  );
};

export default ContactDetails;
