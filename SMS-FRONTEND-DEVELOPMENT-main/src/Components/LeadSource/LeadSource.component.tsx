import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//style
import {
  FormName,
  LabelDescriptionContainer,
  StyledSelect,
} from "App/style/App.style";
import {
  GenericLeadSourceInputHold,
  InputsLeadSourceContainer,
  LeadSourceShipingAddressFormHolder,
} from "./style/LeadSource.style";

//components
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import SnackBarList from "Components/SnackbarList/SnackbarList.component";

//redux
import {
  LeadRequestBody,
  addLead,
  fetchLeadSource,
  fetchLeadStatus,
} from "redux/Pages/LeadSource/LeadSourceSlice";
import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductDetailss,
  fetchAllProducts,
} from "redux/Pages/Product/ProductSlice";
import { addSnackbar } from "redux/actions/actions-snackbar";

const LeadSource: FC<{}> = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [leadSource, setLeadSource] = useState<LeadRequestBody[]>([]);
  const [annualRevenue, setAnnualRevenue] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [leadStatus, setLeadStatus] = useState<LeadRequestBody[]>([]);
  const [numberOfEmployees, setNumberOfEmployees] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [selectedLeadSource, setSelectedLeadSource] = useState<number | null>(
    null
  );
  const [selectedLeadStatus, setSelectedLeadStatus] = useState<number | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [getAllProducts, setGetAllProducts] = useState<ProductDetailss[]>([]);

  const dispatch: AppDispatch = useDispatch();

  //get userRole from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);
  const userFirstName = useSelector(
    (state: RootState) => state.login.user?.firstName
  );
  const userLastName = useSelector(
    (state: RootState) => state.login.user?.lastName
  );

  //get all lead source api call
  useEffect(() => {
    dispatch(fetchLeadSource())
      .then((result: any) => {
        if (fetchLeadSource.fulfilled.match(result)) {
          setLeadSource(result.payload);
        } else {
          console.error("Lead source details not found.");
        }
      })
      .catch((error: any) => {
        console.error("Error fetching lead source details:", error);
      });
  }, [dispatch]);

  //get all lead status api call
  useEffect(() => {
    dispatch(fetchLeadStatus())
      .then((result: any) => {
        if (fetchLeadStatus.fulfilled.match(result)) {
          setLeadStatus(result.payload);
        } else {
          console.error("Lead status details not found.");
        }
      })
      .catch((error: any) => {
        console.error("Error fetching lead status details:", error);
      });
  }, [dispatch]);

  //get product api
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const result = await dispatch(fetchAllProducts());
        if (fetchAllProducts.fulfilled.match(result)) {
          const orders = result.payload.flat();

          setGetAllProducts(orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrderData();
  }, [dispatch]);

  //post request
  const handleLeadSourceFormClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const selectedLead = leadSource.find(
        (lead: any) => lead.id === selectedLeadSource
      );

      const selectedLeadName = selectedLead ? selectedLead?.name : "";

      console.log("selectedLead", selectedLeadName);
      const selectedStatus = leadStatus.find(
        (status: any) => status.id === selectedLeadStatus
      );

      const selectedStatusName = selectedStatus ? selectedStatus?.name : "";

      console.log("lead|Statsu", selectedStatusName);
      if (!selectedLead || selectedLeadSource === null) {
        console.error("Selected lead source not found.");
        return;
      }

      const selectedProductId = getAllProducts.find(
        (product: any) => product.id === selectedProduct
      );
      console.log("selectedProductId", selectedProductId);

      const leadSouceCredentials = {
        firstName: firstName,
        lastName: lastName,
        company: company,
        leadSource: {
          id: selectedLeadSource,
          name: selectedLeadName,
        },
        annualRevenue: annualRevenue,
        phone: phone,
        email: email,
        website: website,
        description: description,
        leadStatus: {
          id: selectedLeadStatus,
          name: selectedStatusName,
        },
        numberOfEmployees: numberOfEmployees,
        address: {
          street: street,
          city: city,
          state: state,
          postalCode: postalCode,
          country: country,
        },
        productInterest: {
          id: selectedProduct,
        },
        createdBy: {
          id: userId,
          firstName: userFirstName,
          lastName: userLastName,
        },
        modifiedBy: {
          id: userId,
          firstName: userFirstName,
          lastName: userLastName,
        },
      };
      const response = await dispatch(addLead({ leadSouceCredentials }));

      if (addLead.fulfilled.match(response)) {
        dispatch(
          addSnackbar({
            id: "attributeSuccess",
            type: "success",
            message: "Lead added successfully!",
          })
        );

        setTimeout(() => {
          navigate("/leadSourceTable");
        }, 2000);
      }
    } catch (error) {
      dispatch(
        addSnackbar({
          id: "error",
          type: "error",
          message: "Error on adding new lead!",
        })
      );
    }
  };
  return (
    <>
      <LeadSourceShipingAddressFormHolder>
        <FormName>Lead Source</FormName>
        <InputsLeadSourceContainer>
          <GenericLeadSourceInputHold>
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
          </GenericLeadSourceInputHold>
          <GenericLeadSourceInputHold>
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
          </GenericLeadSourceInputHold>
        </InputsLeadSourceContainer>
        <InputsLeadSourceContainer>
          <GenericLeadSourceInputHold>
            <GenericInput
              placeholder="Company"
              input_label="Company"
              required={true}
              type="text"
              value={company || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCompany(e.target.value)
              }
            />
          </GenericLeadSourceInputHold>
          <GenericLeadSourceInputHold>
            <LabelDescriptionContainer>Lead Source</LabelDescriptionContainer>
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
              {leadSource.map((lead: any, index: any) => (
                <option key={index} value={lead.id}>
                  {lead.name}
                </option>
              ))}
            </StyledSelect>
          </GenericLeadSourceInputHold>
        </InputsLeadSourceContainer>
        <InputsLeadSourceContainer>
          <GenericLeadSourceInputHold>
            <GenericInput
              placeholder="Annual revenue"
              input_label="Annual revenue"
              required={true}
              type="text"
              value={annualRevenue || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAnnualRevenue(e.target.value)
              }
            />
          </GenericLeadSourceInputHold>
          <GenericLeadSourceInputHold>
            <GenericInput
              placeholder="Phone"
              input_label="Phone"
              required={true}
              type="text"
              value={phone || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
            />
          </GenericLeadSourceInputHold>
        </InputsLeadSourceContainer>
        <InputsLeadSourceContainer>
          <GenericLeadSourceInputHold>
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
          </GenericLeadSourceInputHold>
          <GenericLeadSourceInputHold>
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
          </GenericLeadSourceInputHold>
        </InputsLeadSourceContainer>

        <InputsLeadSourceContainer>
          <GenericLeadSourceInputHold>
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
          </GenericLeadSourceInputHold>
          <GenericLeadSourceInputHold>
            <LabelDescriptionContainer>Lead Status</LabelDescriptionContainer>
            <StyledSelect
              value={
                selectedLeadStatus !== null ? selectedLeadStatus.toString() : ""
              }
              onChange={(e: any) => {
                const selectedLeadStatusId = Number(e.target.value);
                setSelectedLeadStatus(selectedLeadStatusId);
              }}
            >
              <option value="none">Select an Option</option>
              {leadStatus.map((leadStatus: any, index: any) => (
                <option key={index} value={leadStatus.id}>
                  {leadStatus.name}
                </option>
              ))}
            </StyledSelect>
          </GenericLeadSourceInputHold>
        </InputsLeadSourceContainer>
        <InputsLeadSourceContainer>
          <GenericLeadSourceInputHold>
            <GenericInput
              placeholder="Number of employees"
              input_label="Number of employees"
              required={true}
              type="number"
              value={numberOfEmployees || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNumberOfEmployees(e.target.value)
              }
            />
          </GenericLeadSourceInputHold>
          <GenericLeadSourceInputHold>
            <LabelDescriptionContainer>Product</LabelDescriptionContainer>
            <StyledSelect
              value={selectedProduct !== null ? selectedProduct.toString() : ""}
              onChange={(e: any) => {
                const selectedProductId = Number(e.target.value);
                setSelectedProduct(selectedProductId);
              }}
            >
              <option value="none">Select an Option</option>
              {getAllProducts.map((product: any, index: any) => (
                <option key={index} value={product.id}>
                  {product.name}
                </option>
              ))}
            </StyledSelect>
          </GenericLeadSourceInputHold>
        </InputsLeadSourceContainer>
        <InputsLeadSourceContainer>
          <GenericLeadSourceInputHold>
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
          </GenericLeadSourceInputHold>
          <GenericLeadSourceInputHold>
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
          </GenericLeadSourceInputHold>
        </InputsLeadSourceContainer>
        <InputsLeadSourceContainer>
          <GenericLeadSourceInputHold>
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
          </GenericLeadSourceInputHold>
          <GenericLeadSourceInputHold>
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
          </GenericLeadSourceInputHold>
        </InputsLeadSourceContainer>
        <InputsLeadSourceContainer>
          <GenericLeadSourceInputHold>
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
          </GenericLeadSourceInputHold>
        </InputsLeadSourceContainer>
        <GenericButton
          name="Create lead source"
          onClick={handleLeadSourceFormClick}
        />
      </LeadSourceShipingAddressFormHolder>
      <SnackBarList />
    </>
  );
};

export default LeadSource;
