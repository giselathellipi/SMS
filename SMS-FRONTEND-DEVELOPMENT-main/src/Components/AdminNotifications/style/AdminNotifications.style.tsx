import styled from "styled-components";
import { Link } from "react-router-dom";

//mui-icons
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const AdminNotifyContainer = styled.div`
  width: 100%;
  height: 75%;
  max-width: 1000px;
`;
export const AdminNotificationsContentHolder = styled.div`
  width: 100%;
  height: 100%;
  padding: 1px 0;
  /* background: #e5e5e5; */
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const NotificationText = styled.p`
  font-family: "Poppins";
  font-size: 25px;
  font-weight: 600;
  margin: 5px 0 15px 0;
`;

interface CardProps {
  $isread?: string;
}
export const NotificationCard = styled.div<CardProps>`
  display: flex;
  flex-direction: row;
  padding: 20px 0;
`;
interface CardProps {
  $isread?: string;
}
export const DivCardContentHolder = styled.div<CardProps>`
  background-color: ${({ $isread }) =>
    $isread === "false" ? "#f0f0f0" : "white"};
`;
export const CancelIconHolder = styled(Link)`
  flex: 0.2;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
`;
export const CancelIconLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
export const CancelImage = styled.img`
  width: 20px;
  height: 20px;
  color: #808080c2;
`;
export const CancelIcon = styled(CancelPresentationIcon)``;
export const NotificationInfo = styled.div`
  flex: 1;
`;

interface Type {
  $notificationtype?: string;
}
export const NotificationType = styled.h2<Type>`
  background-color: ${({ $notificationtype }) =>
    $notificationtype === "Alert"
      ? "#fb8500"
      : $notificationtype === "Informational"
      ? "#4caf50"
      : "#ffffff"};
  color: #ffff;
  font-family: "Poppins";
  font-size: 13px;
  width: fit-content;
  padding: 2px 6px 2px;
  text-align: center;
  border-radius: 6px;
  font-weight: 400;
`;
export const NotificationMessage = styled.p`
  font-family: "Poppins";
  font-size: 15px;
  margin: 5px 0;
`;
export const UserInfoHolder = styled.div`
  display: flex;
`;
export const UserFirstName = styled.p`
  font-family: "Poppins";
  font-size: 15px;
  color: #023047;
  font-weight: 600;
`;
export const UserLastName = styled.p`
  padding-left: 5px;
  font-family: "Poppins";
  font-size: 15px;
  color: #023047;
  font-weight: 600;
`;

export const DateAndPriorityContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DateTimeHolder = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
  padding-right: 12px;
`;
export const TimeIcon = styled(AccessTimeIcon)`
  padding-right: 5px;
  margin-top: 2px;
`;
export const NotificationDateAndTime = styled.p`
  font-size: 15px;
  text-align: right;
  color: #808080c2;
`;

interface PriorityProps {
  $prioritylevel?: string;
}
export const PriorityLevel = styled.p<PriorityProps>`
  background-color: ${({ $prioritylevel }) =>
    $prioritylevel === "Alert"
      ? "#fb8500"
      : $prioritylevel === "Informational"
      ? "#4caf50"
      : $prioritylevel === "Urgent"
      ? "#d90429"
      : "#ffff"};
  color: #ffff;
  font-family: "Poppins";
  font-size: 13px;
  width: fit-content;
  padding: 2px 6px 2px;
  text-align: center;
  border-radius: 6px;
  font-weight: 400;
`;
export const HrAdmin = styled.hr`
  width: 100%;
  margin: auto;
  background-color: #808080c2;
`;
export const Linked = styled(Link)`
  text-decoration: none;
  color: black;
  flex: 1;
  margin-left: 20px;
`;
