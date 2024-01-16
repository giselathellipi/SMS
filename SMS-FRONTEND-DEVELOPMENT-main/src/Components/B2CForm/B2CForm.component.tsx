import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

//style
import {
  B2CBillingAddressFormHolder,
  B2CFormContentHoder,
  B2CShipingAddressFormHolder,
  GenericB2CInputHold,
  InputsB2CFormContainer,
} from "./style/B2CForm.style";
import { FormName, StyledSelect } from "App/style/App.style";
import { AccountLabel } from "Components/OrderDetails/style/OrderDetails.style";

//components
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";

//redux
import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addAccount } from "redux/Pages/AccountType/AccountTypeSlice";
import { addSnackbar } from "redux/actions/actions-snackbar";

const B2CForm: FC<{}> = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [shippingAddressStreet, setShippingAddressStreet] =
    useState<string>("");
  const [shippingCityAddress, setShippingCityAddress] = useState<string>("");
  const [shippingStateAddress, setShippingStateAddress] = useState<string>("");
  const [shippingPostalCode, setShippingPostalCode] = useState<string>("");
  const [shippingCountry, setShippingCountry] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");

  // Static options for Account Priority
  const accountPriorityOptions = ["Low", "Medium", "High"];

  // Function to handle changes in the dropdown
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriority(e.target.value);
  };

  const dispatch: AppDispatch = useDispatch();

  //get userRole from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);

  //post request
  const handleAccountB2CFormClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const accountCredentials = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        industry: industry,
        accountPriority: selectedPriority,
        phone: phone,
        description: description,
        billingAddress: {
          street: street,
          city: city,
          state: state,
          postalCode: postalCode,
          country: country,
        },
        shippingAddress: {
          street: shippingAddressStreet,
          city: shippingCityAddress,
          state: shippingStateAddress,
          postalCode: shippingPostalCode,
          country: shippingCountry,
        },
        createdBy: {
          id: userId,
        },
        modifiedBy: {
          id: userId,
        },
        accountType: "B2C",
      };
      const response = await dispatch(addAccount({ accountCredentials }));

      if (addAccount.fulfilled.match(response)) {
        dispatch(
          addSnackbar({
            id: "attributeSuccess",
            type: "success",
            message: "Account B2C added successfully!",
          })
        );

        setTimeout(() => {
          navigate("/tabaccountB2CTablele");
        }, 2000);
      }
    } catch (error) {
      dispatch(
        addSnackbar({
          id: "error",
          type: "error",
          message: "Error on adding B2B account!",
        })
      );
    }
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "80vh" }}>
      <B2CFormContentHoder>
        <FormName> B2C Account</FormName>
        <InputsB2CFormContainer>
          <GenericB2CInputHold>
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
          </GenericB2CInputHold>
          <GenericB2CInputHold>
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
          </GenericB2CInputHold>
        </InputsB2CFormContainer>
        <InputsB2CFormContainer>
          <GenericB2CInputHold>
            <GenericInput
              placeholder="Email"
              input_label="Email"
              required={true}
              type="text"
              value={email || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </GenericB2CInputHold>
          <GenericB2CInputHold>
            <AccountLabel>Account</AccountLabel>
            <StyledSelect
              value={selectedPriority}
              onChange={handlePriorityChange}
            >
              <option defaultValue="none">Select an Option</option>
              {accountPriorityOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </StyledSelect>
          </GenericB2CInputHold>
        </InputsB2CFormContainer>
        <InputsB2CFormContainer>
          <GenericB2CInputHold>
            <GenericInput
              placeholder="Industry"
              input_label="Industry"
              required={true}
              type="text"
              value={industry || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setIndustry(e.target.value)
              }
            />
          </GenericB2CInputHold>
          <GenericB2CInputHold>
            <GenericInput
              placeholder="Phone Number"
              input_label="Phone Number"
              required={true}
              type="number"
              value={phone || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
            />
          </GenericB2CInputHold>
        </InputsB2CFormContainer>
        <InputsB2CFormContainer>
          <GenericB2CInputHold>
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
          </GenericB2CInputHold>
        </InputsB2CFormContainer>
        <GenericButton
          name="Create account"
          onClick={handleAccountB2CFormClick}
        />
      </B2CFormContentHoder>

      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ flex: "1" }}>
          <B2CShipingAddressFormHolder>
            <FormName>Shipping Address</FormName>
            <InputsB2CFormContainer>
              <GenericB2CInputHold>
                <GenericInput
                  placeholder="Street"
                  input_label="Street"
                  required={true}
                  type="text"
                  value={shippingAddressStreet || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setShippingAddressStreet(e.target.value)
                  }
                />
              </GenericB2CInputHold>
              <GenericB2CInputHold>
                <GenericInput
                  placeholder="City"
                  input_label="City"
                  required={true}
                  type="text"
                  value={shippingCityAddress || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setShippingCityAddress(e.target.value)
                  }
                />
              </GenericB2CInputHold>
            </InputsB2CFormContainer>
            <InputsB2CFormContainer>
              <GenericB2CInputHold>
                <GenericInput
                  placeholder="State"
                  input_label="State"
                  required={true}
                  type="text"
                  value={shippingStateAddress || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setShippingStateAddress(e.target.value)
                  }
                />
              </GenericB2CInputHold>
              <GenericB2CInputHold>
                <GenericInput
                  placeholder="Postal Code"
                  input_label="Postal Code"
                  required={true}
                  type="text"
                  value={shippingPostalCode || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setShippingPostalCode(e.target.value)
                  }
                />
              </GenericB2CInputHold>
            </InputsB2CFormContainer>
            <InputsB2CFormContainer>
              <GenericB2CInputHold>
                <GenericInput
                  placeholder="Country"
                  input_label="Country"
                  required={true}
                  type="text"
                  value={shippingCountry || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setShippingCountry(e.target.value)
                  }
                />
              </GenericB2CInputHold>
            </InputsB2CFormContainer>
          </B2CShipingAddressFormHolder>
        </div>

        <div style={{ flex: "1" }}>
          <B2CBillingAddressFormHolder>
            <FormName>Billing Address </FormName>
            <InputsB2CFormContainer>
              <GenericB2CInputHold>
                <GenericInput
                  placeholder="Street"
                  input_label="Street"
                  required={true}
                  type="text"
                  value={street || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStreet(e.target.value)
                  }
                />
              </GenericB2CInputHold>
              <GenericB2CInputHold>
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
              </GenericB2CInputHold>
            </InputsB2CFormContainer>
            <InputsB2CFormContainer>
              <GenericB2CInputHold>
                <GenericInput
                  placeholder="State"
                  input_label="State"
                  required={true}
                  type="text"
                  value={state || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setState(e.target.value)
                  }
                />
              </GenericB2CInputHold>
              <GenericB2CInputHold>
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
              </GenericB2CInputHold>
            </InputsB2CFormContainer>
            <InputsB2CFormContainer>
              <GenericB2CInputHold>
                <GenericInput
                  placeholder="Country"
                  input_label="Country"
                  required={true}
                  type="text"
                  value={country || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCountry(e.target.value)
                  }
                />
              </GenericB2CInputHold>
            </InputsB2CFormContainer>
          </B2CBillingAddressFormHolder>
        </div>
      </div>
    </div>
  );
};

export default B2CForm;
