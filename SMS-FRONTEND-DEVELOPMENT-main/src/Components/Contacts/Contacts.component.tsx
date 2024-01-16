import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//components
import {
  FormName,
  LabelDescriptionContainer,
  StyledSelect,
} from "App/style/App.style";
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import SnackBarList from "Components/SnackbarList/SnackbarList.component";

//redux
import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  ContactProps,
  addContact,
  getLeadSource,
} from "redux/Pages/Contact/ContactSlice";
import {
  AccountTypeProps,
  getAccountByType,
} from "redux/Pages/AccountType/AccountTypeSlice";
import { addSnackbar } from "redux/actions/actions-snackbar";

//style
import {
  ContactsFormContentHoder,
  GenericContactInputHold,
  InputsOfContactFormContainer,
} from "./style/Contacts.style";

const Contacts: FC<{}> = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [fax, setFax] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [accountB2B, setAccountB2B] = useState<AccountTypeProps[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const [selectedLeadSource, setSelectedLeadSource] = useState<number | null>(
    null
  );
  const [leadsource, setLeadSource] = useState<ContactProps[]>([]);
  console.log(leadsource);
  console.log(selectedAccount);

  const dispatch: AppDispatch = useDispatch();

  //get userRole from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);

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
        console.log("Error in handleAccountB2B:", error);
      }
    };
    handleAccountB2B();
  }, [dispatch]);

  //get all leads api call
  useEffect(() => {
    dispatch(getLeadSource())
      .then((result: any) => {
        if (getLeadSource.fulfilled.match(result)) {
          setLeadSource(result.payload);
        } else {
          dispatch(
            addSnackbar({
              id: "warning",
              type: "warning",
              message: "Lead Source details not found!",
            })
          );
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

  //post request
  const handleContactFormClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const selectedLead = leadsource.find(
        (lead: any) => lead.id === selectedLeadSource
      );
      console.log(selectedLeadSource);
      if (!selectedLead) {
        console.error("Selected lead source not found.");
        return;
      }

      const contactCredentials = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        fax: fax,
        email: email,
        birthdate: birthDate,
        account: {
          id: selectedAccount,
        },
        leadSource: {
          id: selectedLeadSource,
          name: selectedLead.name,
        },
        address: {
          street: street,
          city: city,
          state: state,
          postalCode: postalCode,
          country: country,
        },
        description: description,
        createdBy: {
          id: userId,
        },
        modifiedBy: {
          id: userId,
        },
      };
      const response = await dispatch(addContact({ contactCredentials }));

      if (addContact.fulfilled.match(response)) {
        dispatch(
          addSnackbar({
            id: "attributeSuccess",
            type: "success",
            message: "Contact added successfully!",
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
          message: "Error on adding new contact!",
        })
      );
    }
  };

  return (
    <>
      <ContactsFormContentHoder>
        <FormName>Contacts</FormName>
        <InputsOfContactFormContainer>
          <GenericContactInputHold>
            <GenericInput
              placeholder="FirstName"
              input_label="FirstName"
              required={true}
              type="text"
              value={firstName || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFirstName(e.target.value)
              }
            />
          </GenericContactInputHold>
          <GenericContactInputHold>
            <GenericInput
              placeholder="LastName"
              input_label="LastName"
              required={true}
              type="text"
              value={lastName || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLastName(e.target.value)
              }
            />
          </GenericContactInputHold>
        </InputsOfContactFormContainer>
        <InputsOfContactFormContainer>
          <GenericContactInputHold>
            <GenericInput
              placeholder="Phone"
              input_label="Phone"
              required={true}
              type="number"
              value={phone || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
            />
          </GenericContactInputHold>
          <GenericContactInputHold>
            <GenericInput
              placeholder="Fax"
              input_label="Fax"
              required={true}
              type="text"
              value={fax || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFax(e.target.value)
              }
            />
          </GenericContactInputHold>
        </InputsOfContactFormContainer>
        <InputsOfContactFormContainer>
          <GenericContactInputHold>
            <GenericInput
              placeholder="Email"
              input_label="Email"
              required={true}
              type="email"
              value={email || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </GenericContactInputHold>
          <GenericContactInputHold>
            <LabelDescriptionContainer>Account</LabelDescriptionContainer>
            <StyledSelect
              value={selectedAccount !== null ? selectedAccount.toString() : ""}
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
          </GenericContactInputHold>
        </InputsOfContactFormContainer>{" "}
        <InputsOfContactFormContainer>
          <GenericContactInputHold>
            <GenericInput
              placeholder="Birthdate"
              input_label="Birthdate"
              required={true}
              type="date"
              value={birthDate || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBirthDate(e.target.value)
              }
            />
          </GenericContactInputHold>
          <GenericContactInputHold>
            <LabelDescriptionContainer>
              Lead Source Name
            </LabelDescriptionContainer>
            <StyledSelect
              value={
                selectedLeadSource !== null ? selectedLeadSource.toString() : ""
              }
              onChange={(e: any) => {
                const selectedLeadSourceId = Number(e.target.value);
                setSelectedLeadSource(selectedLeadSourceId);
              }}
            >
              <option value="none">Select an Option</option>
              {leadsource
                .flat(1) // Flatten the array structure
                .map((lead: any, index: any) => (
                  <option key={index} value={lead.id}>
                    {lead.name}
                  </option>
                ))}
            </StyledSelect>
          </GenericContactInputHold>
        </InputsOfContactFormContainer>
        <InputsOfContactFormContainer>
          <GenericContactInputHold>
            <GenericInput
              placeholder="Description"
              input_label="Description"
              required={true}
              type="text"
              value={description || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
            />
          </GenericContactInputHold>
        </InputsOfContactFormContainer>
        <InputsOfContactFormContainer>
          <GenericContactInputHold>
            <GenericInput
              placeholder="Street"
              input_label="Street"
              required={true}
              type="text"
              value={street || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStreet(e.target.value)
              }
            />{" "}
          </GenericContactInputHold>
          <GenericContactInputHold>
            <GenericInput
              placeholder="City"
              input_label="City"
              required={true}
              type="text"
              value={city || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCity(e.target.value)
              }
            />
          </GenericContactInputHold>
        </InputsOfContactFormContainer>
        <InputsOfContactFormContainer>
          <GenericContactInputHold>
            <GenericInput
              placeholder="State"
              input_label="State"
              required={true}
              type="text"
              value={state || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setState(e.target.value)
              }
            />{" "}
          </GenericContactInputHold>
          <GenericContactInputHold>
            <GenericInput
              placeholder="Postal Code"
              input_label="Postal Code"
              required={true}
              type="text"
              value={postalCode || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPostalCode(e.target.value)
              }
            />
          </GenericContactInputHold>
        </InputsOfContactFormContainer>
        <InputsOfContactFormContainer>
          <GenericContactInputHold>
            <GenericInput
              placeholder="Country"
              input_label="Country"
              required={true}
              type="text"
              value={country || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCountry(e.target.value)
              }
            />{" "}
          </GenericContactInputHold>
        </InputsOfContactFormContainer>
        <GenericButton name="Create contact" onClick={handleContactFormClick} />
      </ContactsFormContentHoder>
      <SnackBarList />
    </>
  );
};
export default Contacts;
