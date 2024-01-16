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
  ProductDetailsContainer,
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
  AccountB2CDetailsHeaderText,
  B2CAddressText,
  InformationOfAccountB2CTable,
} from "./style/B2CAccountTypeDetails.style";

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

const B2CAccountTypeDetails: FC<{}> = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [accountB2C, setAccountB2C] = useState<AccountTypeProps[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [selectedPriority, setSelectedPriority] = useState<string>("");

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
              setAccountB2C(result.payload);
              // Set selectedPriority based on fetched data
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
                message: "Error fetching product details!",
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
        firstName: selectedAccount.firstName,
        lastName: selectedAccount.lastName,
        email: selectedAccount.email,
        accountPriority: selectedPriority,
        phone: selectedAccount.phone,
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
        accountType: "B2C",
      };
      const response = await dispatch(addAccount({ accountCredentials }));

      if (response.payload) {
        const updatedProductDetails = accountB2C.map((account) =>
          account.accountId === selectedAccount.accountId
            ? selectedAccount
            : account
        );
        setAccountB2C(updatedProductDetails);
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
        setAccountB2C((prevState) =>
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
          navigate("/accountB2CTable");
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
                <ProductDetailsContainer>
                  <ProdDetailsHolder>
                    <ProdTextHolders>
                      <AccountB2CDetailsHeaderText>
                        FirstName
                      </AccountB2CDetailsHeaderText>
                      <AccountB2CDetailsHeaderText>
                        LastName
                      </AccountB2CDetailsHeaderText>
                      <AccountB2CDetailsHeaderText>
                        Account Priority
                      </AccountB2CDetailsHeaderText>
                      <AccountB2CDetailsHeaderText>
                        Phone
                      </AccountB2CDetailsHeaderText>
                      <AccountB2CDetailsHeaderText>
                        Email
                      </AccountB2CDetailsHeaderText>
                      <AccountB2CDetailsHeaderText>
                        Description
                      </AccountB2CDetailsHeaderText>
                      <B2CAddressText>Shipping Address</B2CAddressText>
                      <AccountB2CDetailsHeaderText>
                        Street
                      </AccountB2CDetailsHeaderText>
                      <AccountB2CDetailsHeaderText>
                        City
                      </AccountB2CDetailsHeaderText>
                      <AccountB2CDetailsHeaderText>
                        State
                      </AccountB2CDetailsHeaderText>
                      <AccountB2CDetailsHeaderText>
                        Postal Code
                      </AccountB2CDetailsHeaderText>
                      <AccountB2CDetailsHeaderText>
                        Country
                      </AccountB2CDetailsHeaderText>
                      <B2CAddressText>Billing Address</B2CAddressText>
                      <AccountB2CDetailsHeaderText>
                        Street
                      </AccountB2CDetailsHeaderText>
                      <AccountB2CDetailsHeaderText>
                        City
                      </AccountB2CDetailsHeaderText>
                      <AccountB2CDetailsHeaderText>
                        State
                      </AccountB2CDetailsHeaderText>
                      <AccountB2CDetailsHeaderText>
                        Postal Code
                      </AccountB2CDetailsHeaderText>
                      <AccountB2CDetailsHeaderText>
                        Country
                      </AccountB2CDetailsHeaderText>
                    </ProdTextHolders>
                    {accountB2C.map((accountB2C: any, index: number) => (
                      <>
                        <ProdTextHolders key={index}>
                          <InformationOfAccountB2CTable>
                            {accountB2C.firstName}
                          </InformationOfAccountB2CTable>
                          <InformationOfAccountB2CTable>
                            {accountB2C.lastName}
                          </InformationOfAccountB2CTable>

                          <InformationOfAccountB2CTable>
                            {accountB2C.accountPriority}
                          </InformationOfAccountB2CTable>
                          <InformationOfAccountB2CTable>
                            {accountB2C.phone}
                          </InformationOfAccountB2CTable>
                          <InformationOfAccountB2CTable>
                            {accountB2C.email}
                          </InformationOfAccountB2CTable>
                          <InformationOfAccountB2CTable>
                            {accountB2C.description}
                          </InformationOfAccountB2CTable>
                          <InformationOfAccountB2CTable>
                            {accountB2C.shippingAddress.street}
                          </InformationOfAccountB2CTable>
                          <InformationOfAccountB2CTable>
                            {accountB2C.shippingAddress.city}
                          </InformationOfAccountB2CTable>
                          <InformationOfAccountB2CTable>
                            {accountB2C.shippingAddress.state}
                          </InformationOfAccountB2CTable>
                          <InformationOfAccountB2CTable>
                            {accountB2C.shippingAddress.postalCode}
                          </InformationOfAccountB2CTable>
                          <InformationOfAccountB2CTable>
                            {accountB2C.shippingAddress.country}
                          </InformationOfAccountB2CTable>
                          <InformationOfAccountB2CTable>
                            {accountB2C.billingAddress.street}
                          </InformationOfAccountB2CTable>
                          <InformationOfAccountB2CTable>
                            {accountB2C.billingAddress.city}
                          </InformationOfAccountB2CTable>
                          <InformationOfAccountB2CTable>
                            {accountB2C.billingAddress.state}
                          </InformationOfAccountB2CTable>
                          <InformationOfAccountB2CTable>
                            {accountB2C.billingAddress.postalCode}
                          </InformationOfAccountB2CTable>
                          <InformationOfAccountB2CTable>
                            {accountB2C.billingAddress.country}
                          </InformationOfAccountB2CTable>
                        </ProdTextHolders>
                        <ButtonsHolder>
                          <EditButtonContainer
                            onClick={() => handleEdit(accountB2C)}
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
                              handleDeleteProduct(accountB2C.accountId)
                            }
                          />
                        </ButtonsHolder>
                      </>
                    ))}
                  </ProdDetailsHolder>
                </ProductDetailsContainer>
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
              <div>
                <InputsOfProductTable>
                  <ProductInputHold>
                    <GenericInput
                      input_label="FirstName"
                      type="text"
                      value={selectedAccount?.firstName || ""}
                      onChange={(e: any) => {
                        setSelectedAccount({
                          ...selectedAccount,
                          firstName: e.target.value,
                        });
                      }}
                    />
                  </ProductInputHold>
                  <ProductInputHold>
                    <GenericInput
                      input_label="LastName"
                      value={selectedAccount?.lastName || ""}
                      onChange={(e: any) => {
                        setSelectedAccount({
                          ...selectedAccount,
                          lastName: e.target.value,
                        });
                      }}
                    />
                  </ProductInputHold>
                </InputsOfProductTable>

                <InputsOfProductTable>
                  <ProductInputHold>
                    <GenericB2BInputHold>
                      <AccountLabel>Account Priority</AccountLabel>
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
                      input_label="Email"
                      value={selectedAccount?.email || ""}
                      onChange={(e: any) => {
                        setSelectedAccount({
                          ...selectedAccount,
                          email: e.target.value,
                        });
                      }}
                    />
                  </ProductInputHold>
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
                <B2CAddressText>Shipping Address</B2CAddressText>
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
                <B2CAddressText>Billing Address</B2CAddressText>
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
              </div>
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

export default B2CAccountTypeDetails;
