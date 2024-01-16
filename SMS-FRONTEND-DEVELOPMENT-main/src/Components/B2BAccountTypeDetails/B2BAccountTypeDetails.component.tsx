import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//style
import {
  ButtonsHolder,
  DisplayProductsHolder,
  EditButtonContainer,
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
import { GenericB2BInputHold } from "Components/B2BForm/style/B2BForm.style";
import { AccountLabel } from "Components/OrderDetails/style/OrderDetails.style";
import { StyledSelect } from "App/style/App.style";
import {
  AccountB2BDetailsHeaderText,
  AddressText,
  InformationOfAccountB2BTable,
} from "./style/B2BAccountTypeDetails.style";

//mui icons
import DeleteIcon from "@mui/icons-material/Delete";

//redux
import {
  AccountTypeProps,
  addAccount,
  deleteAccount,
  fetchAccountDetailsById,
} from "redux/Pages/AccountType/AccountTypeSlice";
import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addSnackbar } from "redux/actions/actions-snackbar";

//components
import Popup from "Components/Popup/Popup.component";
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import SnackBarList from "Components/SnackbarList/SnackbarList.component";

const B2BAccountTypeDetails: FC<{}> = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [accountB2B, setAccountB2B] = useState<AccountTypeProps[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [selectedPriority, setSelectedPriority] = useState<string>("");

  console.log(selectedAccount);
  const dispatch: AppDispatch = useDispatch();

  //get userId from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);

  const { id } = useParams();
  const accountId = id ? parseInt(id) : 0;

  // Static options for Account Priority
  const accountPriorityOptions = ["Low", "Medium", "High"];
  // Function to handle changes in the dropdown
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriority(e.target.value);
  };

  //get account B2B api by id
  useEffect(() => {
    const fetchProduct = () => {
      if (accountId) {
        console.log(accountId);
        dispatch(fetchAccountDetailsById(accountId))
          .then((result: any) => {
            console.log(result);
            if (fetchAccountDetailsById.fulfilled.match(result)) {
              setAccountB2B(result.payload);
              if (result.payload.length > 0) {
                setSelectedPriority(result.payload[0].accountPriority);
              }
            }
          })
          .catch((error: any) => {
            dispatch(
              addSnackbar({
                id: "error",
                type: "error",
                message: "Error fetching  product details!",
              })
            );
          });
      }
    };

    fetchProduct();
  }, [dispatch, accountId]);

  const handleEdit = (account: any) => {
    setIsModalOpen(true);
    setSelectedAccount(account);
  };

  //update
  const handleUpdateAccountB2BFormClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const accountCredentials = {
        accountId: accountId,
        accountName: selectedAccount.accountName,
        email: selectedAccount.email,
        accountNumber: selectedAccount.accountNumber,
        industry: selectedAccount.industry,
        accountPriority: selectedPriority,
        phone: selectedAccount.phone,
        website: selectedAccount.website,
        employeesNumber: selectedAccount.employeesNumber,
        description: selectedAccount.description,
        billingAddress: {
          street: selectedAccount.billingAddress.street,
          city: selectedAccount.billingAddress.city,
          state: selectedAccount.billingAddress.state,
          postalCode: selectedAccount.billingAddress.postalCode,
          country: selectedAccount.billingAddress.country,
        },
        shippingAddress: {
          street: selectedAccount.shippingAddress.street,
          city: selectedAccount.shippingAddress.city,
          state: selectedAccount.shippingAddress.state,
          postalCode: selectedAccount.shippingAddress.postalCode,
          country: selectedAccount.shippingAddress.country,
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

      if (response.payload) {
        const updatedProductDetails = accountB2B.map((account) =>
          account.accountId === selectedAccount.accountId
            ? selectedAccount
            : account
        );
        setAccountB2B(updatedProductDetails);
        setSelectedPriority(selectedAccount.accountPriority);
        setIsModalOpen(false);
        dispatch(
          addSnackbar({
            id: "attributeSuccess",
            type: "success",
            message: "Account edited successfully!",
          })
        );
      }
    } catch (error) {
      dispatch(
        addSnackbar({
          id: "error",
          type: "error",
          message: "Error in editing account!",
        })
      );
    }
  };

  //delete account api call
  const handleDeleteProduct = async (accountId: number) => {
    try {
      const result = await dispatch(deleteAccount(accountId));
      if (deleteAccount.fulfilled.match(result)) {
        setAccountB2B((prevState) =>
          prevState.filter((account) => account.accountId !== accountId)
        );
        dispatch(
          addSnackbar({
            id: "attributeSuccess",
            type: "success",
            message: "Account deleted successfully!",
          })
        );

        setTimeout(() => {
          navigate("/accountB2BTable");
        }, 2000);
      } else {
        console.error("Failed to delete account");
      }
    } catch (error) {
      dispatch(
        addSnackbar({
          id: "error",
          type: "error",
          message: "Error deleting account!",
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
                    <AccountB2BDetailsHeaderText>
                      Account Name
                    </AccountB2BDetailsHeaderText>
                    <AccountB2BDetailsHeaderText>
                      Email
                    </AccountB2BDetailsHeaderText>
                    <AccountB2BDetailsHeaderText>
                      Account Number
                    </AccountB2BDetailsHeaderText>
                    <AccountB2BDetailsHeaderText>
                      Industry
                    </AccountB2BDetailsHeaderText>
                    <AccountB2BDetailsHeaderText>
                      Account Priority
                    </AccountB2BDetailsHeaderText>
                    <AccountB2BDetailsHeaderText>
                      Phone
                    </AccountB2BDetailsHeaderText>
                    <AccountB2BDetailsHeaderText>
                      Website
                    </AccountB2BDetailsHeaderText>
                    <AccountB2BDetailsHeaderText>
                      Employees Number
                    </AccountB2BDetailsHeaderText>
                    <AccountB2BDetailsHeaderText>
                      Description
                    </AccountB2BDetailsHeaderText>
                    <AddressText>Shipping Address</AddressText>
                    <AccountB2BDetailsHeaderText>
                      Street
                    </AccountB2BDetailsHeaderText>
                    <AccountB2BDetailsHeaderText>
                      City
                    </AccountB2BDetailsHeaderText>
                    <AccountB2BDetailsHeaderText>
                      State
                    </AccountB2BDetailsHeaderText>
                    <AccountB2BDetailsHeaderText>
                      Postal Code
                    </AccountB2BDetailsHeaderText>
                    <AccountB2BDetailsHeaderText>
                      Country
                    </AccountB2BDetailsHeaderText>
                    <AddressText>Billing Address</AddressText>
                    <AccountB2BDetailsHeaderText>
                      Street
                    </AccountB2BDetailsHeaderText>
                    <AccountB2BDetailsHeaderText>
                      City
                    </AccountB2BDetailsHeaderText>
                    <AccountB2BDetailsHeaderText>
                      State
                    </AccountB2BDetailsHeaderText>
                    <AccountB2BDetailsHeaderText>
                      Postal Code
                    </AccountB2BDetailsHeaderText>
                    <AccountB2BDetailsHeaderText>
                      Country
                    </AccountB2BDetailsHeaderText>
                  </ProdTextHolders>
                  {accountB2B.map((accountB2B: any, index: number) => (
                    <>
                      <ProdTextHolders key={index}>
                        <InformationOfAccountB2BTable>
                          {accountB2B.accountName}
                        </InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable>
                          {accountB2B.email}
                        </InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable>
                          {accountB2B.accountNumber}
                        </InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable>
                          {accountB2B.industry}
                        </InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable>
                          {accountB2B.accountPriority}
                        </InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable>
                          {accountB2B.phone}
                        </InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable>
                          {accountB2B.website}
                        </InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable>
                          {accountB2B.employeesNumber}
                        </InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable>
                          {accountB2B.description}
                        </InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable></InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable>
                          {accountB2B.shippingAddress.street}
                        </InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable>
                          {accountB2B.shippingAddress.city}
                        </InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable>
                          {accountB2B.shippingAddress.state}
                        </InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable>
                          {accountB2B.shippingAddress.postalCode}
                        </InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable>
                          {accountB2B.shippingAddress.country}
                        </InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable></InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable>
                          {accountB2B.billingAddress.street}
                        </InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable>
                          {accountB2B.billingAddress.city}
                        </InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable>
                          {accountB2B.billingAddress.state}
                        </InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable>
                          {accountB2B.billingAddress.postalCode}
                        </InformationOfAccountB2BTable>
                        <InformationOfAccountB2BTable>
                          {accountB2B.billingAddress.country}
                        </InformationOfAccountB2BTable>
                      </ProdTextHolders>
                      <ButtonsHolder>
                        <EditButtonContainer
                          onClick={() => handleEdit(accountB2B)}
                        >
                          Edit
                        </EditButtonContainer>
                        <DeleteIcon
                          style={{
                            color: "#1976d2",
                            textAlign: "center",
                            fontSize: "30px",
                            marginTop: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleDeleteProduct(accountB2B.accountId)
                          }
                        />
                      </ButtonsHolder>
                    </>
                  ))}
                </ProdDetailsHolder>
              </DisplayProductsHolder>
            </ProductList>
          </ProductDetailsComponent>
        </ProductDetailsContentHolder>
        <Popup
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedAccount(null);
          }}
          headerContent={
            <EditProductTableName>Edit Account</EditProductTableName>
          }
          bodyContent={
            <>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Account Name"
                    type="text"
                    value={selectedAccount?.accountName || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        accountName: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="email"
                    value={selectedAccount?.email || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        email: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Account Number "
                    value={selectedAccount?.accountNumber || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        accountNumber: parseFloat(e.target.value),
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="Industry "
                    value={selectedAccount?.industry || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        industry: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
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
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="Phone"
                    value={selectedAccount?.phone || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        phone: parseFloat(e.target.value),
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Website"
                    value={selectedAccount?.website || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        website: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="Employees Number "
                    value={selectedAccount?.employeesNumber || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        employeesNumber: parseFloat(e.target.value),
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Description "
                    value={selectedAccount?.description || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        description: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <AddressText>Shipping Address</AddressText>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Street"
                    value={selectedAccount?.shippingAddress.street || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        shippingAddress: {
                          ...selectedAccount.shippingAddress,
                          street: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="City "
                    value={selectedAccount?.shippingAddress.city || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        shippingAddress: {
                          ...selectedAccount.shippingAddress,
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
                    value={selectedAccount?.shippingAddress.state || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        shippingAddress: {
                          ...selectedAccount.shippingAddress,
                          state: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="Postal Code "
                    value={selectedAccount?.shippingAddress.postalCode || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        shippingAddress: {
                          ...selectedAccount.shippingAddress,
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
                    value={selectedAccount?.shippingAddress.country || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        shippingAddress: {
                          ...selectedAccount.shippingAddress,
                          country: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <AddressText>Billing Address</AddressText>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Street"
                    value={selectedAccount?.billingAddress.street || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        billingAddress: {
                          ...selectedAccount.billingAddress,
                          street: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="City "
                    value={selectedAccount?.billingAddress.city || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        billingAddress: {
                          ...selectedAccount.billingAddress,
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
                    value={selectedAccount?.billingAddress.state || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        billingAddress: {
                          ...selectedAccount.billingAddress,
                          state: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="Postal Code "
                    value={selectedAccount?.billingAddress.postalCode || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        billingAddress: {
                          ...selectedAccount.billingAddress,
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
                    value={selectedAccount?.billingAddress.country || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        billingAddress: {
                          ...selectedAccount.billingAddress,
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
            <GenericButton
              onClick={handleUpdateAccountB2BFormClick}
              name="Save"
            />
          }
        />
      </Productdetails>
      <SnackBarList />
    </>
  );
};

export default B2BAccountTypeDetails;
