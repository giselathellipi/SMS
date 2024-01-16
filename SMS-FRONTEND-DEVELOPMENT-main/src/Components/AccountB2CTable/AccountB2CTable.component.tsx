import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//style
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "Components/ProductsTable/style/ProductsTable.style";
import { TableBody } from "Components/OrdersTable/style/OrdersTable.style";
import {
  AccountB2CButtonName,
  AccountB2CTableContainer,
  AccountB2CTableHead,
  AddAccountB2CNameContainerPlusIcon,
  AddNewAccountB2CButton,
} from "./style/AccountB2CTable.style";
import { PopupName } from "Components/VendorDetails/style/VendorDetails.style";
import {
  AccountTypeName,
  AccountsTypeNAmeHolder,
} from "Components/AccountB2BTable/style/AccountB2BTable.style";

//mui icons
import ForwardIcon from "@mui/icons-material/Forward";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

//redux
import {
  AccountTypeProps,
  getAccountByType,
} from "redux/Pages/AccountType/AccountTypeSlice";
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import { addSnackbar } from "redux/actions/actions-snackbar";

//components
import Popup from "Components/Popup/Popup.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import SnackBarList from "Components/SnackbarList/SnackbarList.component";

const AccountB2CTable: FC<{}> = () => {
  const navigate = useNavigate();
  const [accountB2C, setAccountB2C] = useState<AccountTypeProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Function to open the popup
  const openPopup = () => {
    setIsModalOpen(true);
  };

  const dispatch: AppDispatch = useDispatch();

  //get account B2C api
  useEffect(() => {
    const handleAccountB2C = async () => {
      try {
        const accountTypeCredentials = {
          type: "B2C",
        };
        const response = await dispatch(
          getAccountByType({ accountTypeCredentials })
        );

        if (getAccountByType.fulfilled.match(response)) {
          setAccountB2C([response.payload]);
        }
      } catch (error) {
        dispatch(
          addSnackbar({
            id: "error",
            type: "error",
            message: "Error in getting account  B2C!",
          })
        );
        console.log("Error in handleAccountB2C Click:", error);
      }
    };
    handleAccountB2C();
  }, [dispatch]);

  const accountB2CButtonName = (
    <AddAccountB2CNameContainerPlusIcon>
      <AddCircleOutlineIcon />
      <AccountB2CButtonName>Add account</AccountB2CButtonName>
    </AddAccountB2CNameContainerPlusIcon>
  );

  const navigateToForm = (type: string) => {
    if (type === "B2B") {
      navigate("/B2BForm");
    } else if (type === "B2C") {
      navigate("/B2CForm");
    }
    setIsModalOpen(false);
  };

  const handleGoToOrderLinkClick = (accountB2C: AccountTypeProps) => {
    console.log(accountB2C);
    navigate(`/accountB2CDetails/${accountB2C.accountId}`);
  };
  return (
    <>
      <AccountB2CTableContainer>
        <AddNewAccountB2CButton>
          <GenericButton name={accountB2CButtonName} onClick={openPopup} />
        </AddNewAccountB2CButton>
        <AddNewAccountB2CButton>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <AccountB2CTableHead>FirstName</AccountB2CTableHead>
                  <AccountB2CTableHead>LastName</AccountB2CTableHead>
                  <AccountB2CTableHead>Email</AccountB2CTableHead>
                  <AccountB2CTableHead>Account Priority</AccountB2CTableHead>
                  <AccountB2CTableHead>Cel</AccountB2CTableHead>
                  <AccountB2CTableHead>Description</AccountB2CTableHead>
                  <AccountB2CTableHead>Actions</AccountB2CTableHead>
                </TableRow>
              </TableHead>
              <TableBody>
                {accountB2C.map((accountB2C: any, index: number) =>
                  accountB2C.map((accountItem: any, subIndex: number) => (
                    <TableRow key={`${index}-${subIndex}`}>
                      <TableCell>{accountItem.createdBy.firstName}</TableCell>
                      <TableCell>{accountItem.createdBy.lastName}</TableCell>
                      <TableCell>{accountItem.email}</TableCell>
                      <TableCell>{accountItem.accountPriority}</TableCell>
                      <TableCell>{accountItem.phone}</TableCell>
                      <TableCell>{accountItem.description}</TableCell>
                      <TableCell>
                        <ForwardIcon
                          color="primary"
                          fontSize="large"
                          onClick={() => handleGoToOrderLinkClick(accountItem)}
                          style={{ cursor: "pointer" }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </AddNewAccountB2CButton>
      </AccountB2CTableContainer>
      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        headerContent={<PopupName>Choose Account Type</PopupName>}
        bodyContent={
          <>
            <AccountsTypeNAmeHolder>
              <AccountTypeName onClick={() => navigateToForm("B2B")}>
                B2B
              </AccountTypeName>
              <AccountTypeName onClick={() => navigateToForm("B2C")}>
                B2C
              </AccountTypeName>
            </AccountsTypeNAmeHolder>
          </>
        }
        footerContent={<GenericButton name="Save" />}
      />
      <SnackBarList />
    </>
  );
};

export default AccountB2CTable;
