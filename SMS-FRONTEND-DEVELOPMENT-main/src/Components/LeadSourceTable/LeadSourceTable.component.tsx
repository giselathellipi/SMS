import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//style
import {
  AddNewLeadSourceButton,
  LeadSourceAddProductNameContainerPlusIcon,
  LeadSourceButtonName,
  LeadSourceTH,
  LeadSourceTableBody,
  LeadSourceTableCell,
  LeadSourceTableContainer,
  LeadSourceTableHead,
  LeadSourceTableHolder,
  LeadSourceTableRow,
  LeadsourceTable,
} from "./style/LeadSourceTable.style";

//components
import GenericButton from "Components/GenericButton/GenericButton.component";
import SnackBarList from "Components/SnackbarList/SnackbarList.component";

//mui icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ForwardIcon from "@mui/icons-material/Forward";

//redux
import {
  LeadRequestBody,
  fetchLeads,
} from "redux/Pages/LeadSource/LeadSourceSlice";
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import { addSnackbar } from "redux/actions/actions-snackbar";

const LeadSourceTable: FC<{}> = () => {
  const navigate = useNavigate();
  const [leadSource, setLeadSource] = useState<LeadRequestBody[]>([]);
  console.log("lead source", leadSource);

  const dispatch: AppDispatch = useDispatch();

  //get all leads api call
  useEffect(() => {
    dispatch(fetchLeads())
      .then((result: any) => {
        if (fetchLeads.fulfilled.match(result)) {
          setLeadSource(result.payload);
        } else {
          console.error("Lead details not found.");
        }
      })
      .catch((error: any) => {
        dispatch(
          addSnackbar({
            id: "error",
            type: "error",
            message: "Error fetching lead details!",
          })
        );
      });
  }, [dispatch]);

  const leadButtonName = (
    <LeadSourceAddProductNameContainerPlusIcon>
      <AddCircleOutlineIcon />
      <LeadSourceButtonName>New Lead Source</LeadSourceButtonName>
    </LeadSourceAddProductNameContainerPlusIcon>
  );

  const handleGoToLinkClick = (lead: LeadRequestBody) => {
    console.log(lead);
    navigate(`/leadSourceDetails/${lead.id}`);
  };

  return (
    <>
      <LeadSourceTableHolder>
        <AddNewLeadSourceButton>
          <GenericButton
            name={leadButtonName}
            onClick={() => navigate("/leadSource")}
          />
        </AddNewLeadSourceButton>
        <LeadSourceTableContainer>
          <LeadsourceTable>
            <LeadSourceTableHead>
              <LeadSourceTableRow>
                <LeadSourceTH>FirstName</LeadSourceTH>
                <LeadSourceTH>LastName</LeadSourceTH>
                <LeadSourceTH>Company</LeadSourceTH>
                <LeadSourceTH>Lead Name</LeadSourceTH>
                <LeadSourceTH>Annual Revenue</LeadSourceTH>
                <LeadSourceTH>Phone</LeadSourceTH>
                <LeadSourceTH>Email</LeadSourceTH>
                <LeadSourceTH>Website </LeadSourceTH>
                <LeadSourceTH>Description</LeadSourceTH>
                <LeadSourceTH>Lead Status</LeadSourceTH>
                <LeadSourceTH>Number of employees</LeadSourceTH>
                <LeadSourceTH>Street</LeadSourceTH>
                <LeadSourceTH>City</LeadSourceTH>
                <LeadSourceTH>State</LeadSourceTH>
                <LeadSourceTH>Postal Code</LeadSourceTH>
                <LeadSourceTH>Country</LeadSourceTH>
                <LeadSourceTH>Product Name</LeadSourceTH>
                <LeadSourceTH>Actions</LeadSourceTH>
              </LeadSourceTableRow>
            </LeadSourceTableHead>
            <LeadSourceTableBody>
              {leadSource.map((leadSource: any, index: any) => (
                <LeadSourceTableRow key={index}>
                  <LeadSourceTableCell>
                    {leadSource.firstName}
                  </LeadSourceTableCell>
                  <LeadSourceTableCell>
                    {leadSource.lastName}
                  </LeadSourceTableCell>
                  <LeadSourceTableCell>
                    {leadSource.company}
                  </LeadSourceTableCell>
                  <LeadSourceTableCell>
                    {leadSource.leadSource?.name}
                  </LeadSourceTableCell>
                  <LeadSourceTableCell>
                    {leadSource.annualRevenue}
                  </LeadSourceTableCell>
                  <LeadSourceTableCell>{leadSource.phone}</LeadSourceTableCell>
                  <LeadSourceTableCell>{leadSource.email}</LeadSourceTableCell>
                  <LeadSourceTableCell>
                    {leadSource.website}
                  </LeadSourceTableCell>
                  <LeadSourceTableCell>
                    {leadSource.description}
                  </LeadSourceTableCell>
                  <LeadSourceTableCell>
                    {leadSource.leadStatus.name}
                  </LeadSourceTableCell>
                  <LeadSourceTableCell>
                    {leadSource.numberOfEmployees}
                  </LeadSourceTableCell>
                  <LeadSourceTableCell>
                    {leadSource?.address?.street}
                  </LeadSourceTableCell>
                  <LeadSourceTableCell>
                    {leadSource?.address?.city}
                  </LeadSourceTableCell>
                  <LeadSourceTableCell>
                    {leadSource?.address?.state}
                  </LeadSourceTableCell>
                  <LeadSourceTableCell>
                    {leadSource.address?.postalCode}
                  </LeadSourceTableCell>
                  <LeadSourceTableCell>
                    {leadSource?.address?.country}
                  </LeadSourceTableCell>
                  <LeadSourceTableCell>
                    {leadSource?.productInterest?.productName}
                  </LeadSourceTableCell>

                  <LeadSourceTableCell>
                    <ForwardIcon
                      color="primary"
                      fontSize="large"
                      onClick={() => handleGoToLinkClick(leadSource)}
                      style={{ cursor: "pointer" }}
                    />
                  </LeadSourceTableCell>
                </LeadSourceTableRow>
              ))}
            </LeadSourceTableBody>
          </LeadsourceTable>
        </LeadSourceTableContainer>
      </LeadSourceTableHolder>
      <SnackBarList />
    </>
  );
};

export default LeadSourceTable;
