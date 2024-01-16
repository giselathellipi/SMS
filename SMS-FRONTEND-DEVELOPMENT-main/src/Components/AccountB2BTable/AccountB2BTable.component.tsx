import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//style
import {
  AccountButtonName,
  AccountTableContainer,
  AccountTypeName,
  AccountsTypeNAmeHolder,
  AddAccountNameContainerPlusIcon,
  AddNewAccountButton,
  PopupName,
  TableAccountHolder,
} from "./style/AccountB2BTable.style";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "Components/ProductsTable/style/ProductsTable.style";
import { TableBody } from "Components/OrdersTable/style/OrdersTable.style";

//components
import GenericButton from "Components/GenericButton/GenericButton.component";
import Popup from "Components/Popup/Popup.component";
import SnackBarList from "Components/SnackbarList/SnackbarList.component";

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

const AccountB2BTable: FC<{}> = () => {
  const [accountB2B, setAccountB2B] = useState<AccountTypeProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Function to open the popup
  const openPopup = () => {
    setIsModalOpen(true);
  };

  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

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
            message: "Error in getting account B2B!",
          })
        );
        console.log("Error in handleAccountB2BClick:", error);
      }
    };
    handleAccountB2B();
  }, [dispatch]);

  const accountButtonName = (
    <AddAccountNameContainerPlusIcon>
      <AddCircleOutlineIcon />
      <AccountButtonName>Add account</AccountButtonName>
    </AddAccountNameContainerPlusIcon>
  );

  const navigateToForm = (type: string) => {
    if (type === "B2B") {
      navigate("/B2BForm");
    } else if (type === "B2C") {
      navigate("/B2CForm");
    }
    setIsModalOpen(false);
  };

  const handleGoToOrderLinkClick = (accountB2B: AccountTypeProps) => {
    console.log(accountB2B);
    navigate(`/accountB2BDetails/${accountB2B.accountId}`);
  };
  return (
    <>
      <AccountTableContainer>
        <AddNewAccountButton>
          <GenericButton name={accountButtonName} onClick={openPopup} />
        </AddNewAccountButton>

        <TableAccountHolder>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <th>Account Name</th>
                  <th>Email</th>
                  <th>Account Number</th>
                  <th>Industry</th>
                  <th>Account Priority</th>
                  <th>Cel</th>
                  <th>Website</th>
                  <th>Employee Number</th>
                  <th>Description</th>
                  <th>Actions</th>
                </TableRow>
              </TableHead>
              <TableBody>
                {accountB2B.map((accountB2B: any, index: number) =>
                  accountB2B.map((accountItem: any, subIndex: number) => (
                    <TableRow key={`${index}-${subIndex}`}>
                      <TableCell>{accountItem.accountName}</TableCell>
                      <TableCell>{accountItem.email}</TableCell>
                      <TableCell>{accountItem.accountNumber}</TableCell>
                      <TableCell>{accountItem.industry}</TableCell>
                      <TableCell>{accountItem.accountPriority}</TableCell>
                      <TableCell>{accountItem.phone}</TableCell>
                      <TableCell>{accountItem.website}</TableCell>
                      <TableCell>{accountItem.employeesNumber}</TableCell>
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
        </TableAccountHolder>
      </AccountTableContainer>
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

export default AccountB2BTable;
