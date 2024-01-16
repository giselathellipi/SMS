import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

//style
import {
  AccountB2BFormOfAddressesContentHolder,
  B2BBillingAddressContainer,
  B2BBillingAddressFormHolder,
  B2BFormContentHoder,
  B2BShipingAddressFormHolder,
  B2BShippingAddressContainer,
  GenericB2BInputHold,
  InputsB2BFormContainer,
  ShippingAndBillingAddressHolder,
} from "./style/B2BForm.style";
import { FormName, StyledSelect } from "App/style/App.style";
import { AccountLabel } from "Components/OrderDetails/style/OrderDetails.style";

//components
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import SnackBarList from "Components/SnackbarList/SnackbarList.component";

//redux
import { addAccount } from "redux/Pages/AccountType/AccountTypeSlice";
import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addSnackbar } from "redux/actions/actions-snackbar";

const B2BForm: FC<{}> = () => {
  const navigate = useNavigate();
  const [accountName, setAccountName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [employeesNumber, setEmployeesNumber] = useState<string>("");
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
  const handleAccountB2BFormClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const accountCredentials = {
        accountName: accountName,
        email: email,
        accountNumber: accountNumber,
        industry: industry,
        accountPriority: selectedPriority,
        phone: phone,
        website: website,
        employeesNumber: 5,
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
        accountType: "B2B",
      };
      const response = await dispatch(addAccount({ accountCredentials }));

      if (addAccount.fulfilled.match(response)) {
        dispatch(
          addSnackbar({
            id: "attributeSuccess",
            type: "success",
            message: "Account B2B added successfully!",
          })
        );

        setTimeout(() => {
          navigate("/accountB2BTable");
        }, 2000);
      }
    } catch (error) {
      dispatch(
        addSnackbar({
          id: "error",
          type: "error",
          message: "Error in adding  Account  B2B!",
        })
      );
    }
  };

  return (
    <AccountB2BFormOfAddressesContentHolder>
      <ShippingAndBillingAddressHolder>
        <B2BShippingAddressContainer>
          <B2BShipingAddressFormHolder>
            <FormName>Shipping Address</FormName>
            <InputsB2BFormContainer>
              <GenericB2BInputHold>
                <GenericInput
                  placeholder="Street"
                  input_label="Street"
                  required={true}
                  type="text"
                  value={shippingAddressStreet || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setShippingAddressStreet(e.target.value)
                  }
                />{" "}
              </GenericB2BInputHold>
              <GenericB2BInputHold>
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
              </GenericB2BInputHold>
            </InputsB2BFormContainer>
            <InputsB2BFormContainer>
              <GenericB2BInputHold>
                <GenericInput
                  placeholder="State"
                  input_label="State"
                  required={true}
                  type="text"
                  value={shippingStateAddress || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setShippingStateAddress(e.target.value)
                  }
                />{" "}
              </GenericB2BInputHold>
              <GenericB2BInputHold>
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
              </GenericB2BInputHold>
            </InputsB2BFormContainer>
            <InputsB2BFormContainer>
              <GenericB2BInputHold>
                <GenericInput
                  placeholder="Country"
                  input_label="Country"
                  required={true}
                  type="text"
                  value={shippingCountry || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setShippingCountry(e.target.value)
                  }
                />{" "}
              </GenericB2BInputHold>
            </InputsB2BFormContainer>
          </B2BShipingAddressFormHolder>
        </B2BShippingAddressContainer>

        <B2BBillingAddressContainer>
          <B2BBillingAddressFormHolder>
            <FormName>Billing Address </FormName>
            <InputsB2BFormContainer>
              <GenericB2BInputHold>
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
              </GenericB2BInputHold>
              <GenericB2BInputHold>
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
              </GenericB2BInputHold>
            </InputsB2BFormContainer>
            <InputsB2BFormContainer>
              <GenericB2BInputHold>
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
              </GenericB2BInputHold>
              <GenericB2BInputHold>
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
              </GenericB2BInputHold>
            </InputsB2BFormContainer>
            <InputsB2BFormContainer>
              <GenericB2BInputHold>
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
              </GenericB2BInputHold>
            </InputsB2BFormContainer>
          </B2BBillingAddressFormHolder>
        </B2BBillingAddressContainer>
      </ShippingAndBillingAddressHolder>

      <B2BFormContentHoder>
        <FormName> B2B Account</FormName>
        <InputsB2BFormContainer>
          <GenericB2BInputHold>
            <GenericInput
              placeholder="Account Name"
              input_label="Account Name"
              required={true}
              type="text"
              value={accountName || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAccountName(e.target.value)
              }
            />
          </GenericB2BInputHold>
          <GenericB2BInputHold>
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
          </GenericB2BInputHold>
        </InputsB2BFormContainer>
        <InputsB2BFormContainer>
          <GenericB2BInputHold>
            <GenericInput
              placeholder="Account Number"
              input_label="Account Number"
              required={true}
              type="number"
              value={accountNumber || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAccountNumber(e.target.value)
              }
            />
          </GenericB2BInputHold>
          <GenericB2BInputHold>
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
          </GenericB2BInputHold>
        </InputsB2BFormContainer>
        <InputsB2BFormContainer>
          <GenericB2BInputHold>
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
          </GenericB2BInputHold>
          <GenericB2BInputHold>
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
          </GenericB2BInputHold>
        </InputsB2BFormContainer>
        <InputsB2BFormContainer>
          <GenericB2BInputHold>
            <GenericInput
              placeholder="Website"
              input_label="Website"
              required={true}
              type="text"
              value={website || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWebsite(e.target.value)
              }
            />
          </GenericB2BInputHold>
          <GenericB2BInputHold>
            <GenericInput
              placeholder="Employees Number"
              input_label="Employees Number"
              required={true}
              type="number"
              value={employeesNumber || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmployeesNumber(e.target.value)
              }
            />
          </GenericB2BInputHold>
        </InputsB2BFormContainer>
        <InputsB2BFormContainer>
          <GenericB2BInputHold>
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
          </GenericB2BInputHold>
        </InputsB2BFormContainer>
        <GenericButton
          name="Create account"
          onClick={handleAccountB2BFormClick}
        />
      </B2BFormContentHoder>
      <SnackBarList />
    </AccountB2BFormOfAddressesContentHolder>
  );
};
export default B2BForm;
