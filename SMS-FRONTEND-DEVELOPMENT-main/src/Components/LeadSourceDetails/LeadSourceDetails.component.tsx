import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//style
import {
  InformationOfLeadDetailsTable,
  LeadSourceDetailsHeaderText,
} from "./style/LeadSourceDetails.style";
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

//mui icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

//redux
import {
  LeadRequestBody,
  addLead,
  deleteLead,
  fetchLeadById,
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

//components
import Popup from "Components/Popup/Popup.component";
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import SnackBarList from "Components/SnackbarList/SnackbarList.component";

const LeadSourceDetails: FC<{}> = () => {
  const navigate = useNavigate();
  const [leadSourceDetails, setLeadSourceDetails] = useState<LeadRequestBody[]>(
    []
  );
  const [selectedLeadDetail, setSelectedLeadDetail] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedLeadSource, setSelectedLeadSource] = useState<number | null>(
    null
  );
  const [leadSource, setLeadSource] = useState<LeadRequestBody[]>([]);
  const [selectedLeadStatus, setSelectedLeadStatus] = useState<number | null>(
    null
  );
  const [leadStatus, setLeadStatus] = useState<LeadRequestBody[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [getAllProducts, setGetAllProducts] = useState<ProductDetailss[]>([]);

  console.log("selectedLead", selectedLeadDetail);
  const dispatch: AppDispatch = useDispatch();

  //get userRole from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);
  const userFirstName = useSelector(
    (state: RootState) => state.login.user?.firstName
  );
  const userLastName = useSelector(
    (state: RootState) => state.login.user?.lastName
  );

  const { id } = useParams();
  const leadDetailsId = id ? parseInt(id) : 0;

  //get lead by id
  useEffect(() => {
    const fetchLead = () => {
      if (leadDetailsId) {
        console.log(leadDetailsId);
        dispatch(fetchLeadById(leadDetailsId))
          .then((result: any) => {
            if (fetchLeadById.fulfilled.match(result)) {
              const fetchedContact = result.payload[0];
              setLeadSourceDetails(result.payload);
              setSelectedLeadSource(fetchedContact.leadSource.id);
              setSelectedLeadStatus(fetchedContact.leadStatus.id);
              setSelectedProduct(fetchedContact.productInterest.id);
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

    fetchLead();
  }, [dispatch, leadDetailsId]);

  //delete lead
  const handleDeleteLead = async (leadDetailsId: number) => {
    try {
      const result = await dispatch(deleteLead(leadDetailsId));
      if (deleteLead.fulfilled.match(result)) {
        setLeadSourceDetails((prevState) =>
          prevState.filter((lead) => lead.id !== leadDetailsId)
        );
        dispatch(
          addSnackbar({
            id: "attributeSuccess",
            type: "success",
            message: "Lead Source deleted successfully!",
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
          message: "Error deleting lead source!",
        })
      );
    }
  };

  const handleEdit = (lead: any) => {
    setIsModalOpen(true);
    setSelectedLeadDetail(lead);
  };

  //get all lead source api call
  useEffect(() => {
    dispatch(fetchLeadSource())
      .then((result: any) => {
        if (fetchLeadSource.fulfilled.match(result)) {
          setLeadSource(result.payload);
        }
      })
      .catch((error: any) => {
        dispatch(
          addSnackbar({
            id: "error",
            type: "error",
            message: "Error fetching lead source details!",
          })
        );
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
        dispatch(
          addSnackbar({
            id: "error",
            type: "error",
            message: "Error fetching lead status details!",
          })
        );
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
        dispatch(
          addSnackbar({
            id: "error",
            type: "error",
            message: "Error fetching orders!",
          })
        );
      }
    };

    fetchOrderData();
  }, [dispatch]);

  //post request
  const handleUpdateLeadClick = async (
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

      const leadSouceCredentials = {
        id: leadDetailsId,
        firstName: selectedLeadDetail.firstName,
        lastName: selectedLeadDetail.lastName,
        company: selectedLeadDetail.company,
        leadSource: {
          id: selectedLeadSource,
          name: selectedLeadName,
        },
        annualRevenue: selectedLeadDetail.annualRevenue,
        phone: selectedLeadDetail.phone,
        email: selectedLeadDetail.email,
        website: selectedLeadDetail.website,
        description: selectedLeadDetail.description,
        leadStatus: {
          id: selectedLeadStatus,
          name: selectedStatusName,
        },
        numberOfEmployees: selectedLeadDetail.numberOfEmployees,
        address: {
          street: selectedLeadDetail.address.street,
          city: selectedLeadDetail.address.city,
          state: selectedLeadDetail.address.state,
          postalCode: selectedLeadDetail.address.postalCode,
          country: selectedLeadDetail.address.country,
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
      if (response.payload) {
        const updatedLeadDetails = leadSourceDetails.map((lead) =>
          lead.id === selectedLeadDetail.id ? selectedLeadDetail : lead
        );
        setLeadSourceDetails(updatedLeadDetails);
        dispatch(
          addSnackbar({
            id: "attributeSuccess",
            type: "success",
            message: "Lead source edited successfully!",
          })
        );
        setIsModalOpen(false);
      }
    } catch (error) {
      dispatch(
        addSnackbar({
          id: "error",
          type: "error",
          message: "Error in editing lead source!",
        })
      );
    }
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
                    <LeadSourceDetailsHeaderText>
                      Actions
                    </LeadSourceDetailsHeaderText>
                    <LeadSourceDetailsHeaderText>
                      FirstName
                    </LeadSourceDetailsHeaderText>
                    <LeadSourceDetailsHeaderText>
                      LastName
                    </LeadSourceDetailsHeaderText>
                    <LeadSourceDetailsHeaderText>
                      Company
                    </LeadSourceDetailsHeaderText>
                    <LeadSourceDetailsHeaderText>
                      Lead Name
                    </LeadSourceDetailsHeaderText>
                    <LeadSourceDetailsHeaderText>
                      Annual Revenue
                    </LeadSourceDetailsHeaderText>
                    <LeadSourceDetailsHeaderText>
                      Phone
                    </LeadSourceDetailsHeaderText>
                    <LeadSourceDetailsHeaderText>
                      Email
                    </LeadSourceDetailsHeaderText>
                    <LeadSourceDetailsHeaderText>
                      Website
                    </LeadSourceDetailsHeaderText>
                    <LeadSourceDetailsHeaderText>
                      Description
                    </LeadSourceDetailsHeaderText>
                    <LeadSourceDetailsHeaderText>
                      Lead Status
                    </LeadSourceDetailsHeaderText>
                    <LeadSourceDetailsHeaderText>
                      Number of employees
                    </LeadSourceDetailsHeaderText>
                    <LeadSourceDetailsHeaderText>
                      Street
                    </LeadSourceDetailsHeaderText>
                    <LeadSourceDetailsHeaderText>
                      City
                    </LeadSourceDetailsHeaderText>
                    <LeadSourceDetailsHeaderText>
                      State
                    </LeadSourceDetailsHeaderText>
                    <LeadSourceDetailsHeaderText>
                      Postal Code
                    </LeadSourceDetailsHeaderText>
                    <LeadSourceDetailsHeaderText>
                      Country
                    </LeadSourceDetailsHeaderText>
                    <LeadSourceDetailsHeaderText>
                      Product Name
                    </LeadSourceDetailsHeaderText>
                  </ProdTextHolders>
                  {leadSourceDetails.map((leadDetails: any, index: number) => (
                    <ProdTextHolders key={index}>
                      <InformationOfLeadDetailsTable>
                        <ButtonsHolder>
                          <EditIcon
                            onClick={() => handleEdit(leadDetails)}
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
                            onClick={() => handleDeleteLead(leadDetails.id)}
                          />
                        </ButtonsHolder>
                      </InformationOfLeadDetailsTable>
                      <InformationOfLeadDetailsTable>
                        {leadDetails.firstName}
                      </InformationOfLeadDetailsTable>
                      <InformationOfLeadDetailsTable>
                        {leadDetails.lastName}
                      </InformationOfLeadDetailsTable>
                      <InformationOfLeadDetailsTable>
                        {leadDetails.company}
                      </InformationOfLeadDetailsTable>
                      <InformationOfLeadDetailsTable>
                        {leadDetails.leadSource?.name}
                      </InformationOfLeadDetailsTable>
                      <InformationOfLeadDetailsTable>
                        {leadDetails.annualRevenue}
                      </InformationOfLeadDetailsTable>
                      <InformationOfLeadDetailsTable>
                        {leadDetails.phone}
                      </InformationOfLeadDetailsTable>
                      <InformationOfLeadDetailsTable>
                        {leadDetails.email}
                      </InformationOfLeadDetailsTable>
                      <InformationOfLeadDetailsTable>
                        {leadDetails.website}
                      </InformationOfLeadDetailsTable>
                      <InformationOfLeadDetailsTable>
                        {leadDetails.description}
                      </InformationOfLeadDetailsTable>
                      <InformationOfLeadDetailsTable>
                        {leadDetails.leadStatus.name}
                      </InformationOfLeadDetailsTable>
                      <InformationOfLeadDetailsTable>
                        {leadDetails.numberOfEmployees}
                      </InformationOfLeadDetailsTable>
                      <InformationOfLeadDetailsTable>
                        {leadDetails?.address?.street}
                      </InformationOfLeadDetailsTable>
                      <InformationOfLeadDetailsTable>
                        {leadDetails?.address?.city}
                      </InformationOfLeadDetailsTable>
                      <InformationOfLeadDetailsTable>
                        {leadDetails?.address?.state}
                      </InformationOfLeadDetailsTable>
                      <InformationOfLeadDetailsTable>
                        {leadDetails?.address?.postalCode}
                      </InformationOfLeadDetailsTable>
                      <InformationOfLeadDetailsTable>
                        {leadDetails?.address?.country}
                      </InformationOfLeadDetailsTable>
                      <InformationOfLeadDetailsTable>
                        {leadDetails?.productInterest?.productName}
                      </InformationOfLeadDetailsTable>
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
          setSelectedLeadDetail(null);
        }}
        headerContent={
          <EditProductTableName>Edit Lead Source</EditProductTableName>
        }
        bodyContent={
          <>
            <InputsOfProductTable>
              <ProductInputHold>
                <GenericInput
                  input_label="FirstName"
                  type="text"
                  value={selectedLeadDetail?.firstName || ""}
                  onChange={(e: any) => {
                    setSelectedLeadDetail({
                      ...selectedLeadDetail,
                      firstName: e.target.value,
                    });
                  }}
                />
              </ProductInputHold>
              <ProductInputHold>
                <GenericInput
                  input_label="LastName"
                  value={selectedLeadDetail?.lastName || ""}
                  onChange={(e: any) => {
                    setSelectedLeadDetail({
                      ...selectedLeadDetail,
                      lastName: e.target.value,
                    });
                  }}
                />
              </ProductInputHold>
            </InputsOfProductTable>

            <InputsOfProductTable>
              <ProductInputHold>
                <GenericInput
                  input_label="Company"
                  value={selectedLeadDetail?.company || ""}
                  onChange={(e: any) => {
                    setSelectedLeadDetail({
                      ...selectedLeadDetail,
                      company: e.target.value,
                    });
                  }}
                />
              </ProductInputHold>
              <ProductInputHold>
                <LabelDescriptionContainer>
                  Lead Source
                </LabelDescriptionContainer>
                <StyledSelect
                  value={
                    selectedLeadSource !== null
                      ? selectedLeadSource.toString()
                      : ""
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
              </ProductInputHold>
            </InputsOfProductTable>
            <InputsOfProductTable>
              <ProductInputHold>
                <GenericInput
                  input_label="Annual Revenue"
                  value={selectedLeadDetail?.annualRevenue || ""}
                  onChange={(e: any) => {
                    setSelectedLeadDetail({
                      ...selectedLeadDetail,
                      annualRevenue: e.target.value,
                    });
                  }}
                />
              </ProductInputHold>
              <ProductInputHold>
                <GenericInput
                  input_label="Phone"
                  value={selectedLeadDetail?.phone || ""}
                  onChange={(e: any) => {
                    setSelectedLeadDetail({
                      ...selectedLeadDetail,
                      phone: e.target.value,
                    });
                  }}
                />
              </ProductInputHold>
            </InputsOfProductTable>
            <InputsOfProductTable>
              {" "}
              <ProductInputHold>
                <GenericInput
                  input_label="Email"
                  type="email"
                  value={selectedLeadDetail?.email || ""}
                  onChange={(e: any) => {
                    setSelectedLeadDetail({
                      ...selectedLeadDetail,
                      email: e.target.value,
                    });
                  }}
                />
              </ProductInputHold>
              <ProductInputHold>
                <GenericInput
                  input_label="Website"
                  value={selectedLeadDetail?.website || ""}
                  onChange={(e: any) => {
                    setSelectedLeadDetail({
                      ...selectedLeadDetail,
                      website: e.target.value,
                    });
                  }}
                />
              </ProductInputHold>
            </InputsOfProductTable>
            <InputsOfProductTable>
              {" "}
              <ProductInputHold>
                <GenericInput
                  input_label="Description "
                  value={selectedLeadDetail?.description || ""}
                  onChange={(e: any) => {
                    setSelectedLeadDetail({
                      ...selectedLeadDetail,
                      description: e.target.value,
                    });
                  }}
                />
              </ProductInputHold>
              <ProductInputHold>
                <LabelDescriptionContainer>
                  Lead Status
                </LabelDescriptionContainer>
                <StyledSelect
                  value={
                    selectedLeadStatus !== null
                      ? selectedLeadStatus.toString()
                      : ""
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
              </ProductInputHold>
            </InputsOfProductTable>
            <InputsOfProductTable>
              <ProductInputHold>
                <GenericInput
                  input_label="Employee Number"
                  value={selectedLeadDetail?.numberOfEmployees || ""}
                  onChange={(e: any) => {
                    setSelectedLeadDetail({
                      ...selectedLeadDetail,
                      numberOfEmployees: e.target.value,
                    });
                  }}
                />
              </ProductInputHold>
              <ProductInputHold>
                {" "}
                <LabelDescriptionContainer>Product</LabelDescriptionContainer>
                <StyledSelect
                  value={
                    selectedProduct !== null ? selectedProduct.toString() : ""
                  }
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
              </ProductInputHold>
            </InputsOfProductTable>
            <InputsOfProductTable>
              <ProductInputHold>
                <GenericInput
                  input_label="Street"
                  value={selectedLeadDetail?.address?.street || ""}
                  onChange={(e: any) => {
                    setSelectedLeadDetail({
                      ...selectedLeadDetail,
                      address: {
                        ...selectedLeadDetail.address,
                        street: e.target.value,
                      },
                    });
                  }}
                />
              </ProductInputHold>
              <ProductInputHold>
                <GenericInput
                  input_label="City "
                  value={selectedLeadDetail?.address?.city || ""}
                  onChange={(e: any) => {
                    setSelectedLeadDetail({
                      ...selectedLeadDetail,
                      address: {
                        ...selectedLeadDetail.address,
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
                  value={selectedLeadDetail?.address?.state || ""}
                  onChange={(e: any) => {
                    setSelectedLeadDetail({
                      ...selectedLeadDetail,
                      address: {
                        ...selectedLeadDetail.address,
                        state: e.target.value,
                      },
                    });
                  }}
                />
              </ProductInputHold>
              <ProductInputHold>
                <GenericInput
                  input_label="Postal Code "
                  value={selectedLeadDetail?.address?.postalCode || ""}
                  onChange={(e: any) => {
                    setSelectedLeadDetail({
                      ...selectedLeadDetail,
                      address: {
                        ...selectedLeadDetail.address,
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
                  value={selectedLeadDetail?.address?.country || ""}
                  onChange={(e: any) => {
                    setSelectedLeadDetail({
                      ...selectedLeadDetail,
                      address: {
                        ...selectedLeadDetail.address,
                        country: e.target.value,
                      },
                    });
                  }}
                />
              </ProductInputHold>
            </InputsOfProductTable>
          </>
        }
        footerContent={
          <GenericButton name="Save" onClick={handleUpdateLeadClick} />
        }
      />
      <SnackBarList />
    </>
  );
};

export default LeadSourceDetails;
