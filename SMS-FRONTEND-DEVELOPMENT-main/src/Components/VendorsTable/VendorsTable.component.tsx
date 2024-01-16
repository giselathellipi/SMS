import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//mui icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ForwardIcon from "@mui/icons-material/Forward";

//style
import {
  AddNewVendorButton,
  VedorTableBody,
  VendorAddProductNameContainerPlusIcon,
  VendorButtonName,
  VendorIconLink,
  VendorTH,
  VendorTable,
  VendorTableCell,
  VendorTableContainer,
  VendorTableHead,
  VendorTableHolder,
  VendorTableRow,
} from "./style/VendorsTable.style";

//redux
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import {
  Vendor,
  deleteVendor,
  fetchVendors,
} from "redux/Containers/VendorForm/VendorFormSlice";
import { addSnackbar } from "redux/actions/actions-snackbar";

//components
import GenericButton from "Components/GenericButton/GenericButton.component";
import SnackBarList from "Components/SnackbarList/SnackbarList.component";

const VendorsTable: FC<{}> = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  console.log(vendors);

  const dispatch: AppDispatch = useDispatch();

  //get all vendors api call
  useEffect(() => {
    dispatch(fetchVendors())
      .then((result: any) => {
        if (fetchVendors.fulfilled.match(result)) {
          setVendors(result.payload);
        } else {
          dispatch(
            addSnackbar({
              id: "error",
              type: "error",
              message: "Vendor details not found!",
            })
          );
        }
      })
      .catch((error: any) => {
        dispatch(
          addSnackbar({
            id: "error",
            type: "error",
            message: "Error fetching vendor details!",
          })
        );
      });
  }, [dispatch]);

  //delete vendor
  const handleDeleteVendor = async (vendorId: number) => {
    try {
      const result = await dispatch(deleteVendor(vendorId));
      if (deleteVendor.fulfilled.match(result)) {
        dispatch(
          addSnackbar({
            id: "attributeSuccess",
            type: "success",
            message: "Vendor deleted successfully!",
          })
        );
        setVendors((prevState) =>
          prevState.filter((order) => order.id !== vendorId)
        );
      }
    } catch (error) {
      dispatch(
        addSnackbar({
          id: "error",
          type: "error",
          message: "Error deleting vendor!",
        })
      );
    }
  };
  const vendorButtonName = (
    <VendorAddProductNameContainerPlusIcon>
      <AddCircleOutlineIcon />
      <VendorButtonName>New Vendor</VendorButtonName>
    </VendorAddProductNameContainerPlusIcon>
  );
  const handleGoToLinkClick = (vendor: Vendor) => {
    console.log(vendor);
    navigate(`/vendorDetails/${vendor.id}`);
  };

  return (
    <VendorTableHolder>
      <AddNewVendorButton>
        <GenericButton
          name={vendorButtonName}
          onClick={() => navigate("/vendor")}
        />
      </AddNewVendorButton>
      <VendorTableContainer>
        <VendorTable>
          <VendorTableHead>
            <VendorTableRow>
              <VendorTH>Company Name</VendorTH>
              <VendorTH>Email</VendorTH>
              <VendorTH>Phone Number</VendorTH>
              <VendorTH>Contact Name</VendorTH>
              <VendorTH>Notes</VendorTH>
              <VendorTH>Payment Terms</VendorTH>
              <VendorTH>Bank Name</VendorTH>
              <VendorTH>Actions</VendorTH>
            </VendorTableRow>
          </VendorTableHead>
          <VedorTableBody>
            {vendors.map((vendor: any, index: any) => (
              <VendorTableRow key={index}>
                <VendorTableCell>{vendor.companyName}</VendorTableCell>
                <VendorTableCell>{vendor.email}</VendorTableCell>
                <VendorTableCell>{vendor.phoneNumber}</VendorTableCell>
                <VendorTableCell>{vendor.contactPersonName}</VendorTableCell>
                <VendorTableCell>{vendor.notes}</VendorTableCell>
                <VendorTableCell>{vendor.paymentTerms}</VendorTableCell>
                <VendorTableCell>{vendor.bankName}</VendorTableCell>
                <VendorTableCell>
                  <VendorIconLink
                    to=""
                    onClick={() => handleDeleteVendor(vendor.id)}
                  >
                    <DeleteIcon color="primary" style={{ fontSize: "30px" }} />
                  </VendorIconLink>
                  <ForwardIcon
                    color="primary"
                    fontSize="large"
                    onClick={() => handleGoToLinkClick(vendor)}
                    style={{ cursor: "pointer" }}
                  />
                </VendorTableCell>
              </VendorTableRow>
            ))}
          </VedorTableBody>
        </VendorTable>
      </VendorTableContainer>
      <SnackBarList />
    </VendorTableHolder>
  );
};

export default VendorsTable;
